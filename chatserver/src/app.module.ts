import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketModule } from './SocketModule/socket.module';
import { UserModule } from './UserModule/user.module';

@Module({
  imports: [UserModule, SocketModule],
})
export class AppModule {}
