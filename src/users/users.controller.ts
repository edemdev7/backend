import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'User successfully created',
        data: user,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Error creating user',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      const users = await this.usersService.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Users successfully retrieved',
        data: users,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error retrieving users',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.usersService.findOne(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'User successfully retrieved',
        data: user,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: `User with ID ${id} not found`,
          error: error.message,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const user = await this.usersService.update(id, updateUserDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'User successfully updated',
        data: user,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: `User with ID ${id} not found or not updated`,
          error: error.message,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      const user = await this.usersService.delete(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'User successfully deleted',
        data: user,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: `User with ID ${id} not found or not deleted`,
          error: error.message,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
