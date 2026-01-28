import axios from 'axios';
import { mockDB } from '../mockdata/api-data';

// ============================================
// 타입 정의
// ============================================

export interface CurrentWeather {
    city: string;
    country: string;
    temp: number;
    feelsLike: number;
    humidity: number;
    description: string;
    icon: string;
    windSpeed: number;
}

export interface ForecastDay {
    date: string;
    tempMin: number;
    tempMax: number;
    description: string;
    icon: string;
}

export interface ForecastData {
    city: string;
    country: string;
    list: ForecastDay[];
}

// ============================================
// 단위 변환 유틸리티
// ============================================

export const kelvinToCelsius = (kelvin: number): number => {
    return Math.round(kelvin - 273.15);
};

export const celsiusToFahrenheit = (celsius: number): number => {
    return Math.round((celsius * 9) / 5 + 32);
};

// ============================================
// 환경 변수
// ============================================

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// ============================================
// Weather Service
// ============================================

export const weatherService = {
    /**
     * Current Weather: 현재 날씨 데이터 가져오기
     */
    async getCurrentWeather(city: string): Promise<CurrentWeather> {
        console.log(`[FE-2] 🌤️ Current Weather 요청: ${city}`);

        // Mock 모드
        if (USE_MOCK) {
            console.log('[FE-2] 📦 Mock 데이터 사용 중...');
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const searchKey = city.toLowerCase();
                    const mockData = mockDB[searchKey];

                    if (!mockData) {
                        // Mock DB에 없는 도시인 경우 404 에러 시뮬레이션
                        reject({ response: { status: 404 } });
                        return;
                    }

                    const data: CurrentWeather = {
                        city: mockData.current.city,
                        country: mockData.current.country,
                        temp: mockData.current.temperature.current,
                        feelsLike: mockData.current.temperature.feels_like,
                        humidity: mockData.current.temperature.humidity,
                        description: mockData.current.condition.description,
                        icon: mockData.current.condition.icon,
                        windSpeed: mockData.current.wind.speed
                    };
                    console.log(`[FE-2] ✅ Mock Data Load (${city}):`, data);
                    resolve(data);
                }, 800); // 로딩 느낌을 위한 0.8초 지연
            });
        }

        // 실제 API 호출
        try {
            const response = await axios.get(`${BASE_URL}/weather`, {
                params: {
                    q: city,
                    appid: API_KEY,
                    units: 'metric'
                }
            });

            const data: CurrentWeather = {
                city: response.data.name,
                country: response.data.sys.country,
                temp: Math.round(response.data.main.temp),
                feelsLike: Math.round(response.data.main.feels_like),
                humidity: response.data.main.humidity,
                description: response.data.weather[0].description,
                icon: response.data.weather[0].icon,
                windSpeed: response.data.wind.speed
            };
            console.log(`[FE-2] 🌤️ Real API Response (${city}):`, data);

            return data;
        } catch (error) {
            console.error('[FE-2] ❌ API 에러:', error);
            throw error;
        }
    },

    /**
     * 5-Day Forecast: 5일 예보 데이터 가져오기
     */
    async getForecast(city: string): Promise<ForecastData> {
        // Mock 모드
        if (USE_MOCK) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const searchKey = city.toLowerCase();
                    const mockData = mockDB[searchKey];

                    if (!mockData) {
                        reject({ response: { status: 404 } });
                        return;
                    }

                    const data: ForecastData = {
                        city: mockData.current.city,
                        country: mockData.current.country,
                        list: mockData.forecast.map((item: any) => ({
                            date: item.date,
                            tempMin: item.temp.min,
                            tempMax: item.temp.max,
                            description: item.weather.description,
                            icon: item.weather.icon
                        }))
                    };
                    resolve(data);
                }, 800);
            });
        }

        // 실제 API 호출
        try {
            const response = await axios.get(`${BASE_URL}/forecast`, {
                params: {
                    q: city,
                    appid: API_KEY,
                    units: 'metric'
                }
            });

            const dailyData = response.data.list.filter((_: unknown, index: number) => index % 8 === 0);

            const data: ForecastData = {
                city: response.data.city.name,
                country: response.data.city.country,
                list: dailyData.map((item: any) => ({
                    date: item.dt_txt.split(' ')[0],
                    tempMin: Math.round(item.main.temp_min),
                    tempMax: Math.round(item.main.temp_max),
                    description: item.weather[0].description,
                    icon: item.weather[0].icon
                }))
            };
            console.log(`[FE-2] 📅 Real Forecast Response (${city}):`, data);

            return data;
        } catch (error) {
            throw error;
        }
    }
};
