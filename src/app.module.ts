import { Module } from '@nestjs/common';
import { WalletModule } from './wallet/wallet.module';
import { SoapModule } from './soap/soap.module';

@Module({
  imports: [SoapModule, WalletModule],
})
export class AppModule {}
