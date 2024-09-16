import { WeatherService } from './weather.service';
import { Request } from 'express';
export declare class WeatherController {
    private readonly weatherService;
    constructor(weatherService: WeatherService);
    getWeather(request: Request): Promise<{
        city: string;
        country: string;
        temperature: number;
        feelsLike: number;
        tempMin: number;
        tempMax: number;
        humidity: number;
        pressure: number;
        description: string;
        icon: string;
        windSpeed: number;
        windDeg: number;
        clouds: number;
    }>;
}
