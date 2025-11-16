import { Injectable } from '@nestjs/common';
import { SoapService } from '../soap/soap.service';
import {
  RegistroClienteDto,
  RecargaBilleteraDto,
  ConsultarSaldoDto,
  PagarDto,
  ConfirmarPagoDto,
  SoapResponseDto,
} from '../common/dto';

@Injectable()
export class WalletService {
  constructor(private readonly soapService: SoapService) {}

  async registroCliente(params: RegistroClienteDto): Promise<SoapResponseDto> {
    return this.soapService.call('registroCliente', params);
  }

  async recargarBilletera(
    params: RecargaBilleteraDto,
  ): Promise<SoapResponseDto> {
    return this.soapService.call('recargarBilletera', params);
  }

  async consultarSaldo(params: ConsultarSaldoDto): Promise<SoapResponseDto> {
    return this.soapService.call('consultarSaldo', params);
  }

  async pagar(params: PagarDto): Promise<SoapResponseDto> {
    return this.soapService.call('pagar', params);
  }

  async confirmarPago(params: ConfirmarPagoDto): Promise<SoapResponseDto> {
    return this.soapService.call('confirmarPago', params);
  }
}
