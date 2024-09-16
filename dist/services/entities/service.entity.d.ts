import { Document } from 'mongoose';
export type ServiceDocument = Service & Document;
export declare class Service {
    name: string;
    description: string;
}
export declare const ServiceSchema: import("mongoose").Schema<Service, import("mongoose").Model<Service, any, any, any, Document<unknown, any, Service> & Service & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Service, Document<unknown, {}, import("mongoose").FlatRecord<Service>> & import("mongoose").FlatRecord<Service> & {
    _id: import("mongoose").Types.ObjectId;
}>;
