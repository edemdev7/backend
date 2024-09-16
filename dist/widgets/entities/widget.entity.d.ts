import { Document, Types } from 'mongoose';
export declare class Widget extends Document {
    name: string;
    description: string;
    service: Types.ObjectId;
}
export declare const WidgetSchema: import("mongoose").Schema<Widget, import("mongoose").Model<Widget, any, any, any, Document<unknown, any, Widget> & Widget & Required<{
    _id: unknown;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Widget, Document<unknown, {}, import("mongoose").FlatRecord<Widget>> & import("mongoose").FlatRecord<Widget> & Required<{
    _id: unknown;
}>>;
