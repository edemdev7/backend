"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherService = void 0;
const common_1 = require("@nestjs/common");
const node_fetch_1 = require("node-fetch");
let WeatherService = class WeatherService {
    constructor() {
        this.openWeatherApiKey = '520898038bd21d333eac7c35cc73b616';
        this.ipinfoToken = '62779d7b32c261';
    }
    async getCityFromIP(ip) {
        const ipInfoUrl = `https://ipinfo.io/${ip}?token=${this.ipinfoToken}`;
        const response = await (0, node_fetch_1.default)(ipInfoUrl);
        if (!response.ok) {
            throw new Error(`Error fetching city from IP: ${response.statusText}`);
        }
        const data = (await response.json());
        return data.city;
    }
    async getWeatherDetails(city) {
        const fetch = await Promise.resolve().then(() => require('node-fetch')).then((mod) => mod.default);
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.openWeatherApiKey}&units=metric`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching weather data: ${response.statusText}`);
        }
        const data = (await response.json());
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
    async getWeatherByIP(ip) {
        const city = await this.getCityFromIP(ip);
        return this.getWeatherDetails(city);
    }
};
exports.WeatherService = WeatherService;
exports.WeatherService = WeatherService = __decorate([
    (0, common_1.Injectable)()
], WeatherService);
//# sourceMappingURL=weather.service.js.map