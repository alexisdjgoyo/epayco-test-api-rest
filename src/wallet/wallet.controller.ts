import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { WalletService } from './wallet.service';
import { SoapResponseDto } from '../common/dto';
import {
  RegistroClienteDto,
  RecargaBilleteraDto,
  ConsultarSaldoDto,
  PagarDto,
  ConfirmarPagoDto,
} from '../common/dto';

@ApiTags('wallet')
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('registro-cliente')
  @ApiOperation({
    summary: 'Registrar nuevo cliente',
    description: 'Crea un nuevo cliente en el sistema con su billetera virtual',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Cliente registrado exitosamente',
    type: SoapResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error en los datos enviados',
  })
  @ApiBody({ type: RegistroClienteDto })
  async registroCliente(
    @Body() body: RegistroClienteDto,
  ): Promise<SoapResponseDto> {
    return this.walletService.registroCliente(body);
  }

  @Post('recargar-billetera')
  @ApiOperation({
    summary: 'Recargar billetera',
    description: 'Agrega saldo a la billetera del cliente',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Recarga exitosa',
    type: SoapResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error en los datos enviados',
  })
  @ApiBody({ type: RecargaBilleteraDto })
  async recargarBilletera(
    @Body() body: RecargaBilleteraDto,
  ): Promise<SoapResponseDto> {
    return this.walletService.recargarBilletera(body);
  }

  @Post('consultar-saldo')
  @ApiOperation({
    summary: 'Consultar saldo',
    description: 'Obtiene el saldo actual de la billetera del cliente',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Consulta exitosa',
    type: SoapResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error en los datos enviados',
  })
  @ApiBody({ type: ConsultarSaldoDto })
  async consultarSaldo(
    @Body() body: ConsultarSaldoDto,
  ): Promise<SoapResponseDto> {
    return this.walletService.consultarSaldo(body);
  }

  @Post('pagar')
  @ApiOperation({
    summary: 'Iniciar pago',
    description:
      'Inicia un proceso de pago y envía token de confirmación al email',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Token enviado exitosamente',
    type: SoapResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error en los datos enviados',
  })
  @ApiBody({ type: PagarDto })
  async pagar(@Body() body: PagarDto): Promise<SoapResponseDto> {
    return this.walletService.pagar(body);
  }

  @Post('confirmar-pago')
  @ApiOperation({
    summary: 'Confirmar pago',
    description: 'Confirma un pago usando el token recibido por email',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Pago confirmado exitosamente',
    type: SoapResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error en los datos enviados',
  })
  @ApiBody({ type: ConfirmarPagoDto })
  async confirmarPago(
    @Body() body: ConfirmarPagoDto,
  ): Promise<SoapResponseDto> {
    return this.walletService.confirmarPago(body);
  }
}
