import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { Service } from 'src/services/entities/service.entity';
import { Widget } from 'src/widgets/entities/widget.entity';

@Schema()
export class UserServiceWidget extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Service' })
  service: Types.ObjectId;

  @Prop([{ type: Types.ObjectId, ref: 'Widget' }])  // Liste de widgets
  widgets: Types.ObjectId[];
}

export const UserServiceWidgetSchema = SchemaFactory.createForClass(UserServiceWidget);
