import { Test, TestingModule } from '@nestjs/testing';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';

// Mock del WalletService
const mockWalletService = {
  registroCliente: jest.fn(),
  recargarBilletera: jest.fn(),
  consultarSaldo: jest.fn(),
  pagar: jest.fn(),
  confirmarPago: jest.fn(),
};

describe('WalletController', () => {
  let walletController: WalletController;
  let walletService: WalletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletController],
      providers: [{ provide: WalletService, useValue: mockWalletService }],
    }).compile();

    walletController = module.get<WalletController>(WalletController);
    walletService = module.get<WalletService>(WalletService);

    jest.clearAllMocks();
  });

  describe('POST /wallet/registro-cliente', () => {
    it('debería llamar al servicio con los parámetros correctos', async () => {
      // Arrange
      const body = {
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

      mockWalletService.registroCliente.mockResolvedValue(expectedResponse);

      // Act
      const result = await walletController.registroCliente(body);

      // Assert
      expect(walletService.registroCliente).toHaveBeenCalledWith(body);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('POST /wallet/consultar-saldo', () => {
    it('debería retornar el saldo del cliente', async () => {
      // Arrange
      const body = {
        document: '12345678',
        phone_number: '3001234567',
      };

      const expectedResponse = {
        success: true,
        cod_error: '00',
        message_error: 'Consulta exitosa',
        data: { saldo: 50000 },
      };

      mockWalletService.consultarSaldo.mockResolvedValue(expectedResponse);

      // Act
      const result = await walletController.consultarSaldo(body);

      // Assert
      expect(walletService.consultarSaldo).toHaveBeenCalledWith(body);
      expect(result.data.saldo).toBe(50000);
    });
  });
});
