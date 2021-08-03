import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
 
  constructor(private readonly userService: UserService) {}

  @Post('user-data')
  getUserData(@Body('username') username:string){
      return this.userService.getUser(username)
  }

  @Get()
  getall(){
    return this.userService.getAll()
  }
  
}
