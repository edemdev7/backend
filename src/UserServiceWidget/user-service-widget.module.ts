import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserServiceWidgetService } from './user-service-widget.service';
import { UserServiceWidgetController } from './user-service-widget.controller';
import { UserServiceWidget, UserServiceWidgetSchema } from './entities/user-service-widget.entity';
import { WidgetModule } from 'src/widgets/widget.module';
import { Widget, WidgetSchema } from 'src/widgets/entities/widget.entity';
import { Service, ServiceSchema } from 'src/services/entities/service.entity';


@Module({
  imports: [
    MongooseModule.forFeature([
        { name: UserServiceWidget.name, schema: UserServiceWidgetSchema },
        { name: Widget.name, schema: WidgetSchema },
        { name: Service.name, schema: ServiceSchema },

    ]),
    WidgetModule,
  ],
  controllers: [UserServiceWidgetController],
  providers: [UserServiceWidgetService],
})
export class UserServiceWidgetModule {}
