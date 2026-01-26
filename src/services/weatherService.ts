import axios from 'axios';
import { mockCurrentWeather, mockForecast } from '../mockdata/api-data';

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

/**
 * 켈빈(Kelvin) → 섭씨(Celsius) 변환
 */
export const kelvinToCelsius = (kelvin: number): number => {
    return Math.round(kelvin - 273.15);
};

/**
 * 섭씨(Celsius) → 화씨(Fahrenheit) 변환
 */
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
            return new Promise((resolve) => {
                setTimeout(() => {
                    const data: CurrentWeather = {
                        city: mockCurrentWeather.city,
                        country: mockCurrentWeather.country,
                        temp: mockCurrentWeather.temperature.current,
                        feelsLike: mockCurrentWeather.temperature.feels_like,
                        humidity: mockCurrentWeather.temperature.humidity,
                        description: mockCurrentWeather.condition.description,
                        icon: mockCurrentWeather.condition.icon,
                        windSpeed: mockCurrentWeather.wind.speed
                    };
                    console.log('[FE-2] ✅ Current Weather 로드 완료:', data);
                    resolve(data);
                }, 500);
            });
        }

        // 실제 API 호출
        try {
            const response = await axios.get(`${BASE_URL}/weather`, {
                params: {
                    q: city,
                    appid: API_KEY,
                    units: 'metric' // 섭씨로 받기
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

            console.log('[FE-2] ✅ Current Weather 로드 완료:', data);
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
        console.log(`[FE-2] 📅 5-Day Forecast 요청: ${city}`);

        // Mock 모드
        if (USE_MOCK) {
            console.log('[FE-2] 📦 Mock 데이터 사용 중...');
            return new Promise((resolve) => {
                setTimeout(() => {
                    const data: ForecastData = {
                        city: mockForecast.city,
                        country: mockForecast.country,
                        list: mockForecast.list.map((item) => ({
                            date: item.date,
                            tempMin: item.temp.min,
                            tempMax: item.temp.max,
                            description: item.weather.description,
                            icon: item.weather.icon
                        }))
                    };
                    console.log('[FE-2] ✅ 5-Day Forecast 로드 완료:', data);
                    resolve(data);
                }, 500);
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

            // 5일치 데이터만 추출 (하루에 하나씩)
            const dailyData = response.data.list.filter((_: unknown, index: number) => index % 8 === 0);

            const data: ForecastData = {
                city: response.data.city.name,
                country: response.data.city.country,
                list: dailyData.map((item: { dt_txt: string; main: { temp_min: number; temp_max: number }; weather: { description: string; icon: string }[] }) => ({
                    date: item.dt_txt.split(' ')[0],
                    tempMin: Math.round(item.main.temp_min),
                    tempMax: Math.round(item.main.temp_max),
                    description: item.weather[0].description,
                    icon: item.weather[0].icon
                }))
            };

            console.log('[FE-2] ✅ 5-Day Forecast 로드 완료:', data);
            return data;
        } catch (error) {
            console.error('[FE-2] ❌ API 에러:', error);
            throw error;
        }
    }
};
