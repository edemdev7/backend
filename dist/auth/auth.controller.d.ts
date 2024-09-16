import { AuthService } from './auth.service';
import { signUpDto } from './dto/signup.dto';
import { loginDto } from './dto/login.dto';
import { Response, Request } from 'express';
import { TokenBlacklistService } from './token-blacklist.service';
export declare class AuthController {
    private authService;
    private tokenBlacklistService;
    constructor(authService: AuthService, tokenBlacklistService: TokenBlacklistService);
    signUp(signUpDto: signUpDto, res: Response): Promise<void>;
    login(loginDto: loginDto, res: Response): Promise<{
        status: string;
        message: string;
        data?: any;
    }>;
    verify(query: any): Promise<{
        status: string;
        message: string;
        data?: any;
    }>;
    googleAuth(req: any): Promise<void>;
    googleAuthRedirect(req: any): Promise<any>;
    forget_password(query: any): Promise<{
        status: string;
        message: string;
        data: {
            email: string;
            username: string;
            confirmCode: string;
        };
    }>;
    reset_password(query: any): Promise<{
        status: string;
        message: string;
        data: {
            email: any;
            password: string;
        };
    }>;
    logout(request: Request, response: Response): Promise<void | Response<any, Record<string, any>>>;
}
