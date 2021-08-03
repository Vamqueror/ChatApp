import { Module } from '@nestjs/common';
import { ChatGateway } from 'src/chat.gateway';
import { ChatModule } from 'src/ChatModule/chat.module';

@Module({
  imports: [ChatModule],
  providers: [ChatGateway],
})
export class SocketModule {}
