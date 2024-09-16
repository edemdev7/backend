import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Widget } from './entities/widget.entity';
import { CreateWidgetDto } from './dto/create-widget.dto';
import { UpdateWidgetDto } from './dto/update-widget.dto';

@Injectable()
export class WidgetService {
  constructor(@InjectModel(Widget.name) private widgetModel: Model<Widget>) {}

  async create(createWidgetDto: CreateWidgetDto): Promise<Widget> {
    const newWidget = new this.widgetModel(createWidgetDto);
    return newWidget.save();
  }

  async findAll(): Promise<Widget[]> {
    return this.widgetModel.find().populate('service').exec();
  }

  async findOne(id: string): Promise<Widget> {
    const widget = await this.widgetModel.findById(id).populate('service').exec();
    if (!widget) {
      throw new NotFoundException(`Widget with ID ${id} not found`);
    }
    return widget;
  }

  async update(id: string, updateWidgetDto: UpdateWidgetDto): Promise<Widget> {
    const updatedWidget = await this.widgetModel
      .findByIdAndUpdate(id, updateWidgetDto, { new: true })
      .exec();

    if (!updatedWidget) {
      throw new NotFoundException(`Widget with ID ${id} not found`);
    }

    return updatedWidget;
  }

  async remove(id: string): Promise<void> {
    const result = await this.widgetModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Widget with ID ${id} not found`);
    }
  }
}
