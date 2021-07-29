import { Body, Controller, Get, Post } from '@nestjs/common';
import ChatManager from './chatManager'

@Controller('user')
export class UserController {

  @Post('user-data')
  getUserData(@Body() username:string){
      return ChatManager.getUser(username)
  }

  @Get()
  getall(){
    return ChatManager
  }
  
}
