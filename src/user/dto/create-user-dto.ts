
import { IsOptional, IsString } from 'class-validator';

export class createUserDto {
    @IsOptional()
  @IsString()
    username: string
    email: string
    password: string
}