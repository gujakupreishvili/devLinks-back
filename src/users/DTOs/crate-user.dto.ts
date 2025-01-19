import { Transform } from "class-transformer"
import { IsEmail, IsNotEmpty } from "class-validator"

export class CreateUserDto{
 
  @IsNotEmpty()
  @IsEmail()
  @Transform(({value}) =>value.toLowerCase())
  email:string
  @IsNotEmpty()
  password:string
}