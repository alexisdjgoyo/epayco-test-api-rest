import { ApiProperty } from '@nestjs/swagger';

export class ConfirmarPagoDto {
  @ApiProperty({
    description: 'ID de sesión generado en la operación de pago',
    example: 'pay_67890abc12345',
  })
  session_id: string;

  @ApiProperty({
    description: 'Token de 6 dígitos enviado al email',
    example: '123456',
  })
  token: string;
}
