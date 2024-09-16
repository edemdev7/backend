import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ServiceDocument = Service & Document;

@Schema()
export class Service {
  
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
