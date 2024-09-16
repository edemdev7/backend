import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';
import { GoogleStrategy } from './google.strategy';
import { TokenBlacklistService } from './token-blacklist.service';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>{
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRATION'),
          }
        }
      }
    }),
    MongooseModule.forFeature([{name:'User', schema: UserSchema}])
  ],
  controllers: [AuthController],
  providers: [AuthService, MailService, GoogleStrategy, TokenBlacklistService]
})
export class AuthModule {}
