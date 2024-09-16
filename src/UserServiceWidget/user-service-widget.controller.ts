import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { UserServiceWidgetService } from './user-service-widget.service';
import { CreateUserServiceWidgetDto } from './dto/create-user-service-widget.dto';
import { UpdateUserServiceWidgetDto } from './dto/update-user-service-widget.dto';

@Controller('user-service-widgets')
export class UserServiceWidgetController {
  constructor(private readonly userServiceWidgetService: UserServiceWidgetService) {}

  // Endpoint pour créer une nouvelle association
  @Post()
  async create(
    @Param('userId') userId: string,
    @Body() createUserServiceWidgetDto: CreateUserServiceWidgetDto,
  ) {
    console.log('Données reçues :', createUserServiceWidgetDto);
    // Assigner l'ID utilisateur ici
    const dataToSave = {
      ...createUserServiceWidgetDto,
      user: userId,
    };
  
    return this.userServiceWidgetService.create(dataToSave);
  }
  

  // Endpoint pour récupérer toutes les préférences d'un utilisateur
  // @Get()
  // findByUserId(@Param('userId') userId: string) {
  //   return this.userServiceWidgetService.findByUserId(userId);
  // }

  // Endpoint pour supprimer l'association d'un utilisateur avec un service
  @Delete(':serviceId')
  remove(@Param('userId') userId: string, @Param('serviceId') serviceId: string) {
    return this.userServiceWidgetService.remove(userId, serviceId);
  }

  @Get()
  findAll() {
    return this.userServiceWidgetService.findAll();
  }

}
