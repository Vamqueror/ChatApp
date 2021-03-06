import { Module } from '@nestjs/common';
import { ChatGateway } from 'src/SocketModule/chat.gateway';
import { ChatModule } from 'src/ChatModule/chat.module';

@Module({
  imports: [ChatModule],
  providers: [ChatGateway],
})
export class SocketModule {}
