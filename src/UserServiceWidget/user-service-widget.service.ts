import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserServiceWidget } from './entities/user-service-widget.entity';
import { CreateUserServiceWidgetDto } from './dto/create-user-service-widget.dto';
import { Widget } from 'src/widgets/entities/widget.entity';

@Injectable()
export class UserServiceWidgetService {
  constructor(
    @InjectModel(UserServiceWidget.name) private userServiceWidgetModel: Model<UserServiceWidget>,
    @InjectModel(Widget.name) private readonly widgetModel: Model<Widget> 
  ) {}

  // Créer une nouvelle association utilisateur -> service -> widgets
  async create(createUserServiceWidgetDto: CreateUserServiceWidgetDto) {
    const createdRecord = new this.userServiceWidgetModel(createUserServiceWidgetDto);
    return createdRecord.save();
  }

  // Récupérer toutes les préférences
  async findAll() {
    return this.userServiceWidgetModel
      .find()
      .populate({
        path: 'user',
        select: 'username email' // Sélectionnez les champs pertinents de l'utilisateur
      })
      .populate({
        path: 'service',
        select: 'name description' 
      })
      .populate({
        path: 'widgets',
        select: 'name description'
      })
      .exec();
  }

  // Récupérer les préférences d'un utilisateur par son ID
  async findByUserId(userId: string) {
    return this.userServiceWidgetModel
      .find({ user: userId })
      .populate({
        path: 'service',
        select: 'name description' 
      })
      .populate({
        path: 'widgets',
        select: 'name description'
      })
      .exec();
  }
  // Supprimer une association utilisateur -> service -> widgets
  async remove(userId: string, serviceId: string) {
    return this.userServiceWidgetModel.deleteOne({ user: userId, service: serviceId }).exec();
  }
}
