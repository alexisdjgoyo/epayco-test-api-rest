import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { SoapResponseDto } from '../common/dto';
import { SoapData } from '../common/interfaces/soap-data.interface';

@Injectable()
export class SoapService {
  private readonly logger = new Logger(SoapService.name);
  private readonly soapUrl = 'http://webserver:80/api/soap';

  constructor(private readonly httpService: HttpService) {}

  private buildSoapEnvelope(
    operation: string,
    params: Record<string, any>,
  ): string {
    const paramsXml = Object.entries(params)
      .map(([key, value]) => `<${key}>${value}</${key}>`)
      .join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <${operation}>
      ${paramsXml}
    </${operation}>
  </soap:Body>
</soap:Envelope>`;
  }

  private parseSoapResponse(xml: string): SoapResponseDto {
    try {
      const extractValue = (tag: string): string => {
        const regex = new RegExp(`<${tag}>([^<]*)</${tag}>`);
        const match = xml.match(regex);
        return match ? match[1] : '';
      };

      let data: SoapData = null;
      const dataMatch = xml.match(/<data>([^<]*)<\/data>/);
      if (dataMatch && dataMatch[1]) {
        try {
          const decoded = dataMatch[1]
            .replace(/&quot;/g, '"')
            .replace(/&amp;/g, '&');
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const parsedData = JSON.parse(decoded);
          data = parsedData as SoapData;
        } catch (e) {
          console.log(e);
          data = dataMatch[1];
        }
      }

      return {
        success: extractValue('success') === 'true',
        cod_error: extractValue('cod_error') || '99',
        message_error: extractValue('message_error') || 'Error desconocido',
        data: data,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        cod_error: '97',
        message_error: 'Error parseando respuesta SOAP',
        data: null,
      };
    }
  }

  async call(
    operation: string,
    params: Record<string, any>,
  ): Promise<SoapResponseDto> {
    try {
      const envelope = this.buildSoapEnvelope(operation, params);

      this.logger.log(`Calling SOAP: ${operation} with params:`, params);

      const response = await firstValueFrom(
        this.httpService.post(this.soapUrl, envelope, {
          headers: {
            'Content-Type': 'text/xml',
          },
        }),
      );

      if (
        response.data &&
        typeof response.data === 'string' &&
        response.data.includes('<?xml')
      ) {
        return this.parseSoapResponse(response.data);
      }

      return response.data as SoapResponseDto;
    } catch (error: any) {
      console.log(error);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      this.logger.error(`SOAP call failed for ${operation}: ${error.message}`);

      return {
        success: false,
        cod_error: '98',
        message_error: 'Error de conexión con el servicio SOAP',
        data: null,
      };
    }
  }
}
