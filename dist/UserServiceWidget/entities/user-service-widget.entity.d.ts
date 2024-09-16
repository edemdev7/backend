import { Document, Types } from 'mongoose';
export declare class UserServiceWidget extends Document {
    user: Types.ObjectId;
    service: Types.ObjectId;
    widgets: Types.ObjectId[];
}
export declare const UserServiceWidgetSchema: import("mongoose").Schema<UserServiceWidget, import("mongoose").Model<UserServiceWidget, any, any, any, Document<unknown, any, UserServiceWidget> & UserServiceWidget & Required<{
    _id: unknown;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserServiceWidget, Document<unknown, {}, import("mongoose").FlatRecord<UserServiceWidget>> & import("mongoose").FlatRecord<UserServiceWidget> & Required<{
    _id: unknown;
}>>;
