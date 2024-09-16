import { Model } from 'mongoose';
import { UserServiceWidget } from './entities/user-service-widget.entity';
import { CreateUserServiceWidgetDto } from './dto/create-user-service-widget.dto';
import { Widget } from 'src/widgets/entities/widget.entity';
export declare class UserServiceWidgetService {
    private userServiceWidgetModel;
    private readonly widgetModel;
    constructor(userServiceWidgetModel: Model<UserServiceWidget>, widgetModel: Model<Widget>);
    create(createUserServiceWidgetDto: CreateUserServiceWidgetDto): Promise<import("mongoose").Document<unknown, {}, UserServiceWidget> & UserServiceWidget & Required<{
        _id: unknown;
    }>>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, UserServiceWidget> & UserServiceWidget & Required<{
        _id: unknown;
    }>)[]>;
    findByUserId(userId: string): Promise<(import("mongoose").Document<unknown, {}, UserServiceWidget> & UserServiceWidget & Required<{
        _id: unknown;
    }>)[]>;
    remove(userId: string, serviceId: string): Promise<import("mongodb").DeleteResult>;
}
