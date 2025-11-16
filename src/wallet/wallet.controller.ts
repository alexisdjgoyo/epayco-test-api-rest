import { Controller, Post, Body } from '@nestjs/common';
import { WalletService } from './wallet.service';
import {
  RegistroClienteDto,
  RecargaBilleteraDto,
  ConsultarSaldoDto,
  PagarDto,
  ConfirmarPagoDto,
  SoapResponseDto,
} from '../common/dto';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('registro-cliente')
  async registroCliente(
    @Body() body: RegistroClienteDto,
  ): Promise<SoapResponseDto> {
    return this.walletService.registroCliente(body);
  }

  @Post('recargar-billetera')
  async recargarBilletera(
    @Body() body: RecargaBilleteraDto,
  ): Promise<SoapResponseDto> {
    return this.walletService.recargarBilletera(body);
  }

  @Post('consultar-saldo')
  async consultarSaldo(
    @Body() body: ConsultarSaldoDto,
  ): Promise<SoapResponseDto> {
    return this.walletService.consultarSaldo(body);
  }

  @Post('pagar')
  async pagar(@Body() body: PagarDto): Promise<SoapResponseDto> {
    return this.walletService.pagar(body);
  }

  @Post('confirmar-pago')
  async confirmarPago(
    @Body() body: ConfirmarPagoDto,
  ): Promise<SoapResponseDto> {
    return this.walletService.confirmarPago(body);
  }
}
