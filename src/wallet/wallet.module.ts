import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { SoapModule } from '../soap/soap.module';

@Module({
  imports: [SoapModule],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
