import { Test, TestingModule } from '@nestjs/testing';
import { WalletService } from './wallet.service';
import { SoapService } from '../soap/soap.service';

// Mock del SoapService
const mockSoapService = {
  call: jest.fn(),
};

describe('WalletService', () => {
  let walletService: WalletService;
  let soapService: SoapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WalletService,
        { provide: SoapService, useValue: mockSoapService },
      ],
    }).compile();

    walletService = module.get<WalletService>(WalletService);
    soapService = module.get<SoapService>(SoapService);

    // Limpiar mocks antes de cada test
    jest.clearAllMocks();
  });

  describe('registroCliente', () => {
    it('debería registrar un cliente exitosamente', async () => {
      // Arrange
      const params = {
        document: '12345678',
        names: 'Juan Perez',
        email: 'juan@test.com',
        phone_number: '3001234567',
      };

      const expectedResponse = {
        success: true,
        cod_error: '00',
        message_error: 'Cliente registrado exitosamente',
        data: { cliente_id: 1 },
      };

      mockSoapService.call.mockResolvedValue(expectedResponse);

      // Act
      const result = await walletService.registroCliente(params);

      // Assert
      expect(soapService.call).toHaveBeenCalledWith('registroCliente', params);
      expect(result).toEqual(expectedResponse);
    });

    it('debería manejar error del servicio SOAP', async () => {
      // Arrange
      const params = {
        document: '12345678',
        names: 'Juan Perez',
        email: 'juan@test.com',
        phone_number: '3001234567',
      };

      const errorResponse = {
        success: false,
        cod_error: '98',
        message_error: 'Error de conexión con el servicio SOAP',
        data: null,
      };

      mockSoapService.call.mockResolvedValue(errorResponse);

      // Act
      const result = await walletService.registroCliente(params);

      // Assert
      expect(soapService.call).toHaveBeenCalledWith('registroCliente', params);
      expect(result.success).toBe(false);
      expect(result.cod_error).toBe('98');
    });
  });

  describe('recargarBilletera', () => {
    it('debería recargar la billetera exitosamente', async () => {
      // Arrange
      const params = {
        document: '12345678',
        phone_number: '3001234567',
        amount: 50000,
      };

      const expectedResponse = {
        success: true,
        cod_error: '00',
        message_error: 'Recarga exitosa',
        data: { nuevo_saldo: 150000 },
      };

      mockSoapService.call.mockResolvedValue(expectedResponse);

      // Act
      const result = await walletService.recargarBilletera(params);

      // Assert
      expect(soapService.call).toHaveBeenCalledWith(
        'recargarBilletera',
        params,
      );
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('consultarSaldo', () => {
    it('debería consultar el saldo exitosamente', async () => {
      // Arrange
      const params = {
        document: '12345678',
        phone_number: '3001234567',
      };

      const expectedResponse = {
        success: true,
        cod_error: '00',
        message_error: 'Consulta exitosa',
        data: { saldo: 100000 },
      };

      mockSoapService.call.mockResolvedValue(expectedResponse);

      // Act
      const result = await walletService.consultarSaldo(params);

      // Assert
      expect(soapService.call).toHaveBeenCalledWith('consultarSaldo', params);
      expect(result.data.saldo).toBe(100000);
    });
  });
});
