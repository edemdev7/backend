"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const youtube_service_1 = require("./youtube/youtube.service");
const youtube_controller_1 = require("./youtube/youtube.controller");
const youtube_module_1 = require("./youtube/youtube.module");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const reddit_module_1 = require("./reddit/reddit.module");
const weather_module_1 = require("./weather/weather.module");
const mailer_1 = require("@nestjs-modules/mailer");
const service_module_1 = require("./services/service.module");
const widget_module_1 = require("./widgets/widget.module");
const user_service_widget_module_1 = require("./UserServiceWidget/user-service-widget.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    uri: `mongodb+srv://${configService.get('DB_USER')}:${encodeURIComponent(configService.get('DB_PASSWORD'))}@${configService.get('DB_HOST')}/${configService.get('DB_NAME')}?retryWrites=true&w=majority`,
                }),
            }),
            youtube_module_1.YoutubeModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            reddit_module_1.RedditModule,
            weather_module_1.WeatherModule,
            service_module_1.ServiceModule,
            widget_module_1.WidgetModule,
            user_service_widget_module_1.UserServiceWidgetModule,
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: process.env.EMAIL_HOST,
                    auth: {
                        user: process.env.EMAIL_USERNAME,
                        pass: process.env.EMAIL_PASSWORD
                    }
                }
            }),
            config_1.ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true })
        ],
        controllers: [app_controller_1.AppController, youtube_controller_1.YoutubeController],
        providers: [app_service_1.AppService, youtube_service_1.YoutubeService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map