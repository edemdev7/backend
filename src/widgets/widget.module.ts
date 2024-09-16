import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WidgetService } from './widget.service';
import { WidgetController } from './widget.controller';
import { Widget, WidgetSchema } from './entities/widget.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Widget.name, schema: WidgetSchema }])],
  controllers: [WidgetController],
  providers: [WidgetService],
  exports: [MongooseModule],
})
export class WidgetModule {}
