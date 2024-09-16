import { UserServiceWidgetService } from './user-service-widget.service';
import { CreateUserServiceWidgetDto } from './dto/create-user-service-widget.dto';
export declare class UserServiceWidgetController {
    private readonly userServiceWidgetService;
    constructor(userServiceWidgetService: UserServiceWidgetService);
    create(userId: string, createUserServiceWidgetDto: CreateUserServiceWidgetDto): Promise<import("mongoose").Document<unknown, {}, import("./entities/user-service-widget.entity").UserServiceWidget> & import("./entities/user-service-widget.entity").UserServiceWidget & Required<{
        _id: unknown;
    }>>;
    remove(userId: string, serviceId: string): Promise<import("mongodb").DeleteResult>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./entities/user-service-widget.entity").UserServiceWidget> & import("./entities/user-service-widget.entity").UserServiceWidget & Required<{
        _id: unknown;
    }>)[]>;
}
