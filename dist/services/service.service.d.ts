import { Model } from 'mongoose';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service, ServiceDocument } from './entities/service.entity';
export declare class ServiceService {
    private serviceModel;
    constructor(serviceModel: Model<ServiceDocument>);
    create(createServiceDto: CreateServiceDto): Promise<Service>;
    findAll(): Promise<Service[]>;
    findOne(id: string): Promise<Service>;
    update(id: string, updateServiceDto: UpdateServiceDto): Promise<Service>;
    remove(id: string): Promise<void>;
}
