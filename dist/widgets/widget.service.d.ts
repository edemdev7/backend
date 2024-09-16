import { Model } from 'mongoose';
import { Widget } from './entities/widget.entity';
import { CreateWidgetDto } from './dto/create-widget.dto';
import { UpdateWidgetDto } from './dto/update-widget.dto';
export declare class WidgetService {
    private widgetModel;
    constructor(widgetModel: Model<Widget>);
    create(createWidgetDto: CreateWidgetDto): Promise<Widget>;
    findAll(): Promise<Widget[]>;
    findOne(id: string): Promise<Widget>;
    update(id: string, updateWidgetDto: UpdateWidgetDto): Promise<Widget>;
    remove(id: string): Promise<void>;
}
