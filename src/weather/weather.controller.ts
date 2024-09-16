import { Controller, Get, Req } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { Request } from 'express';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async getWeather(@Req() request: Request) {
    const ip ='154.66.134.64';
    // const ip = request.ip || '154.66.134.64';
    // console.log(ip)
    return this.weatherService.getWeatherByIP(ip);
  }
}