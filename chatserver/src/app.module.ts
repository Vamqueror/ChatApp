import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat.gateway';
import { UserController } from './user.controller';

@Module({
  imports: [],
  controllers: [AppController,UserController],
  providers: [AppService,ChatGateway],
})
export class AppModule {}
