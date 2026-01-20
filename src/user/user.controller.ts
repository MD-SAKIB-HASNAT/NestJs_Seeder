import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/database/entity/user.enity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { createUserDto } from './dto/create-user-dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
        
    @Post('create')
    async createUser(
     @Body() body: createUserDto,
    ): Promise<any> {
        return({
            message: 'User created successfully',
            data: await this.userService.createUser(body),
        })
    }
}
