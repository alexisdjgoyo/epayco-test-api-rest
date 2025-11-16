import { ApiProperty } from '@nestjs/swagger';

export class SoapResponseDto {
  @ApiProperty({
    description: 'Indica si la operación fue exitosa',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Código de error (00 = éxito)',
    example: '00',
    enum: ['00', '01', '02', '03', '04', '05', '06', '07', '97', '98', '99'],
  })
  cod_error: string;

  @ApiProperty({
    description: 'Mensaje descriptivo del error',
    example: 'Operación exitosa',
  })
  message_error: string;

  @ApiProperty({
    description: 'Datos adicionales de la respuesta',
    example: { cliente_id: 1 },
    required: false,
  })
  data: any;
}
