import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { YoutubeService } from './youtube/youtube.service';
import { YoutubeController } from './youtube/youtube.controller';
import { YoutubeModule } from './youtube/youtube.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RedditModule } from './reddit/reddit.module';
import { WeatherModule } from './weather/weather.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ServiceModule } from './services/service.module';
import { WidgetModule } from './widgets/widget.module';
import { UserServiceWidgetModule } from './UserServiceWidget/user-service-widget.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb+srv://${configService.get<string>('DB_USER')}:${encodeURIComponent(configService.get<string>('DB_PASSWORD'))}@${configService.get<string>('DB_HOST')}/${configService.get<string>('DB_NAME')}?retryWrites=true&w=majority`,
      }),
    }),
    YoutubeModule,
    UsersModule,
    AuthModule,
    RedditModule,
    WeatherModule,
    ServiceModule,
    WidgetModule,
    UserServiceWidgetModule,
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD
        }
      }
    }),
    ConfigModule.forRoot({envFilePath: '.env', isGlobal: true})
  ],
  controllers: [AppController, YoutubeController],
  providers: [AppService, YoutubeService],
})
export class AppModule {}
