import { SoapData } from '../interfaces/soap-data.interface';

export class SoapResponseDto {
  success: boolean;
  cod_error: string;
  message_error: string;
  data: SoapData;
}
