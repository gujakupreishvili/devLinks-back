import { SignInDto } from './DTOs/sign-in.dto';
import { CreateUserDto } from './../users/DTOs/crate-user.dto';
import { UsersService } from './../users/users.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ){}
  
  async signUp(CreatUserDto: CreateUserDto) {
    const { email,  password } = CreatUserDto;
    const user = await this.usersService.findOne({ email });
    if (user) throw new BadRequestException('User already exists');
    const hashedPass = await bcrypt.hash(password, 10);
    await this.usersService.create({ email,  password: hashedPass });
    return { succes: true, message: 'User registerd succesfully' };
  }
  async signIn(SignInDto: SignInDto) {
    const { email, password, rememberMe } = SignInDto;
    const user = await this.usersService.findByEmail({ email });
    if (!user) throw new BadRequestException('Invalid email or password');
    const isPasswordEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordEqual)
      throw new BadRequestException('Invalid email or password');
    const payload = {
      sub: user._id
    };
    const expire = rememberMe ? "7d" : "1h"
    return {
      accessToken:  await this.jwtService.signAsync(payload,{expiresIn:expire})
    };
  }

  getCurrentUser(req){
    return this.usersService.getById(req.userId)
  }

}
