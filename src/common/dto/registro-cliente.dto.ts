import { ApiProperty } from '@nestjs/swagger';
export class RegistroClienteDto {
  @ApiProperty({
    description: 'Número de documento del cliente',
    example: '12345678',
  })
  document: string;

  @ApiProperty({
    description: 'Nombres completos del cliente',
    example: 'Juan Carlos Pérez',
  })
  names: string;

  @ApiProperty({
    description: 'Email del cliente',
    example: 'juan@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Número de celular del cliente',
    example: '3001234567',
  })
  phone_number: string;
}
