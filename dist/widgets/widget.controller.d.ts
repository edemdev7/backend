import { WidgetService } from './widget.service';
import { CreateWidgetDto } from './dto/create-widget.dto';
import { UpdateWidgetDto } from './dto/update-widget.dto';
export declare class WidgetController {
    private readonly widgetService;
    constructor(widgetService: WidgetService);
    create(createWidgetDto: CreateWidgetDto): Promise<import("./entities/widget.entity").Widget>;
    findAll(): Promise<import("./entities/widget.entity").Widget[]>;
    findOne(id: string): Promise<import("./entities/widget.entity").Widget>;
    update(id: string, updateWidgetDto: UpdateWidgetDto): Promise<import("./entities/widget.entity").Widget>;
    remove(id: string): Promise<void>;
}
