import {
    Body,
    Controller,
    Post,
    Get,
    Query,
    Req,
    UseGuards,
    Res,
    HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDto } from './dto/signup.dto';
import { loginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';
import { TokenBlacklistService } from './token-blacklist.service';


@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private tokenBlacklistService: TokenBlacklistService,
    ) { }

    @Post('/signup')
    async signUp(
        @Body() signUpDto: signUpDto,
        @Res() res: Response,
    ): Promise<void> {
        return this.authService.signUp(signUpDto, res);
    }

    @Post('/login')
    async login(
        @Body() loginDto: loginDto,
        @Res() res: Response
    ): Promise<{ status: string; message: string; data?: any }> {
        return this.authService.login(loginDto, res);
    }

    @Get('/verify')
    async verify(
        @Query() query: any,
    ): Promise<{ status: string; message: string; data?: any }> {
        let result = query;
        let user_id = result.ui; //(UI for User ID || Sur l'interface, il faudrait que l'input qui récupère cette infos ai pour name ui)
        let verificationCode = result.vc; //(VC for Verification Email || Sur l'interface, il faudrait que l'input qui récupère cette infos ai pour name vc)

        return this.authService.verify_account(user_id, verificationCode);
    }

    @Get('/google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {
        return;
    }

    @Get('/google/redirect')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req) {
        return this.authService.validateUserByGoogle(req.user);
    }

    @Get('/forget-password')
    async forget_password(@Query() query: any) {
        return this.authService.forget_password(query.email);
    }

    @Get('/forget-password/set-password')
    async reset_password(@Query() query: any) {
        return this.authService.reset_new_password(
            query.confirmationCode,
            query.email,
            query.newPassword,
        );
    }

    @Post('/logout')
    async logout(@Req() request: Request, @Res() response: Response) {
        const accessToken = request.cookies?.['access_token'];
        if (accessToken) {
            await this.tokenBlacklistService.blacklistToken(accessToken);
            response.clearCookie('access_token');
            return response.redirect('/')
        } else {
            return response.status(HttpStatus.BAD_REQUEST)
                .json({ message: 'No access token found' })
        }
    }
}
