import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { signUpDto } from './dto/signup.dto';
import { loginDto } from './dto/login.dto';
import { MailService } from './mail.service';
import { Response } from 'express';
export declare class AuthService {
    private userModel;
    private jwtService;
    private mailService;
    constructor(userModel: Model<User>, jwtService: JwtService, mailService: MailService);
    signUp(signUpDto: signUpDto, res: Response): Promise<void>;
    login(loginDto: loginDto, res: Response): Promise<any>;
    verify_account(id: string, verificationCode: string): Promise<{
        status: string;
        message: string;
        data?: any;
    }>;
    private generateVerificationCode;
    validateUserByGoogle(user: any): Promise<any>;
    forget_password(email: string): Promise<{
        status: string;
        message: string;
        data: {
            email: string;
            username: string;
            confirmCode: string;
        };
    }>;
    reset_new_password(confirmationCode: any, email: any, newPassword: any): Promise<{
        status: string;
        message: string;
        data: {
            email: any;
            password: string;
        };
    }>;
}
