import { ApiProperty } from '@nestjs/swagger';
export class PagarDto {
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

  @ApiProperty({
    description: 'Valor a recargar',
    example: 50000,
    minimum: 1,
  })
  amount: number;
}
