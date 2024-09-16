import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

interface IpInfoResponse {
  city: string;
}

interface OpenWeatherResponse {
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  name: string;
  sys: {
    country: string;
  };
}

@Injectable()
export class WeatherService {
  private openWeatherApiKey = '520898038bd21d333eac7c35cc73b616';
  private ipinfoToken = '62779d7b32c261'; 

  async getCityFromIP(ip: string): Promise<string> {
    const ipInfoUrl = `https://ipinfo.io/${ip}?token=${this.ipinfoToken}`;
    const response = await fetch(ipInfoUrl);
    if (!response.ok) {
      throw new Error(`Error fetching city from IP: ${response.statusText}`);
    }

    const data = (await response.json()) as IpInfoResponse;
    return data.city;
  }

  async getWeatherDetails(city: string): Promise<{
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
  }> {
    const fetch = await import('node-fetch').then((mod) => mod.default);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.openWeatherApiKey}&units=metric`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching weather data: ${response.statusText}`);
    }

    const data = (await response.json()) as OpenWeatherResponse;

    return {
      city: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      tempMin: data.main.temp_min,
      tempMax: data.main.temp_max,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      windSpeed: data.wind.speed,
      windDeg: data.wind.deg,
      clouds: data.clouds.all,
    };
  }

  async getWeatherByIP(ip: string) {
    const city = await this.getCityFromIP(ip);
    return this.getWeatherDetails(city);
  }
}
