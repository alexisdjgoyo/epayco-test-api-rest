import { ApiProperty } from '@nestjs/swagger';

export class ConsultarSaldoDto {
  @ApiProperty({
    description: 'Número de documento del cliente',
    example: '12345678',
  })
  document: string;

  @ApiProperty({
    description: 'Número de celular del cliente',
    example: '3001234567',
  })
  phone_number: string;
}
