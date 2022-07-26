import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { AuthInterceptor } from './auth.interceptor';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AuthController {
    constructor(
        private authService: AuthService,
        private jwtService: JwtService
    ) { }

    @Post('register')
    async register(@Body() body: RegisterDto) {
        if (body.password !== body.password_confirm) {
            throw new BadRequestException('Password Do Not Match')
        }
        body.password = await bcrypt.hash(body.password, 12)
        return this.authService.create(body);
    }

    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
        @Res({ passthrough: true }) response: Response
    ) {
        const user = await this.authService.findOneByObj({ email });
        if (!user) {
            throw new BadRequestException('Email does not exist')
        }
        if (!await bcrypt.compare(password, user.password)) {
            throw new BadRequestException('invalid Credentials')
        }
        const jwt = await this.jwtService.signAsync({ id: user.id })
        response.cookie('jwt', jwt, { httpOnly: true })
        return user;
    }

    @UseInterceptors(ClassSerializerInterceptor, AuthInterceptor)
    @Get('user')
    async user(@Req() request: Request) {
        const cookie = request.cookies['jwt'];
        const data = await this.jwtService.verifyAsync(cookie)

        return this.authService.findOneByObj({ id: data['id'] })

    }

    @UseInterceptors(ClassSerializerInterceptor, AuthInterceptor)
    @Post('logout')
    async logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('jwt')
        return {
            message: 'Success'
        }
    }

}
