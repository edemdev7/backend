import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Service } from 'src/services/entities/service.entity';

@Schema()
export class Widget extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Types.ObjectId, ref: Service.name, required: true })
  service: Types.ObjectId; // Référence à l'id du service
}

export const WidgetSchema = SchemaFactory.createForClass(Widget);
