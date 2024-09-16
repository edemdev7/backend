export declare class WeatherService {
    private openWeatherApiKey;
    private ipinfoToken;
    getCityFromIP(ip: string): Promise<string>;
    getWeatherDetails(city: string): Promise<{
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
    getWeatherByIP(ip: string): Promise<{
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
