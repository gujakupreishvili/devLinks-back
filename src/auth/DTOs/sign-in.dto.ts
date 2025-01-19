import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";

export class SignInDto{
  @IsNotEmpty()
  @IsEmail()
  @Transform(({value})=> value.toLowerCase())
  email:string
  @IsNotEmpty()
  password:string
  rememberMe
}