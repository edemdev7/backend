import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private readonly mailService;
    constructor(mailService: MailerService);
    sendMail(verificationCode: string, username: string, from: string, to: string): void;
    sendResetCode(verificationCode: any, from: any, to: any, username: any): void;
}
