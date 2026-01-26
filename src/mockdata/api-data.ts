export const mockDB: Record<string, any> = {
    seoul: {
        current: {
            city: 'Seoul',
            country: 'KR',
            temperature: { current: -5, feels_like: -10, humidity: 40 },
            condition: { description: 'clear sky', icon: '01d' },
            wind: { speed: 4.5 }
        },
        forecast: [
            { date: '2026-01-27', temp: { min: -8, max: 1 }, weather: { description: 'clear sky', icon: '01d' } },
            { date: '2026-01-28', temp: { min: -7, max: 2 }, weather: { description: 'few clouds', icon: '02d' } },
            { date: '2026-01-29', temp: { min: -6, max: 3 }, weather: { description: 'cloudy', icon: '03d' } },
            { date: '2026-01-30', temp: { min: -4, max: 4 }, weather: { description: 'snow', icon: '13d' } },
            { date: '2026-01-31', temp: { min: -5, max: 2 }, weather: { description: 'clear sky', icon: '01d' } }
        ]
    },
    daegu: {
        current: {
            city: 'Daegu',
            country: 'KR',
            temperature: { current: -2, feels_like: -5, humidity: 35 },
            condition: { description: 'clear sky', icon: '01d' },
            wind: { speed: 2.5 }
        },
        forecast: [
            { date: '2026-01-27', temp: { min: -4, max: 5 }, weather: { description: 'clear sky', icon: '01d' } },
            { date: '2026-01-28', temp: { min: -3, max: 6 }, weather: { description: 'few clouds', icon: '02d' } },
            { date: '2026-01-29', temp: { min: -2, max: 7 }, weather: { description: 'cloudy', icon: '03d' } },
            { date: '2026-01-30', temp: { min: 0, max: 8 }, weather: { description: 'broken clouds', icon: '04d' } },
            { date: '2026-01-31', temp: { min: -1, max: 6 }, weather: { description: 'clear sky', icon: '01d' } }
        ]
    },
    'da nang': {
        current: {
            city: 'Da Nang',
            country: 'VN',
            temperature: { current: 22, feels_like: 23, humidity: 80 },
            condition: { description: 'broken clouds', icon: '04d' },
            wind: { speed: 5.2 }
        },
        forecast: [
            { date: '2026-01-27', temp: { min: 21, max: 24 }, weather: { description: 'light rain', icon: '10d' } },
            { date: '2026-01-28', temp: { min: 21, max: 25 }, weather: { description: 'cloudy', icon: '04d' } },
            { date: '2026-01-29', temp: { min: 22, max: 26 }, weather: { description: 'clear sky', icon: '01d' } },
            { date: '2026-01-30', temp: { min: 22, max: 27 }, weather: { description: 'few clouds', icon: '02d' } },
            { date: '2026-01-31', temp: { min: 23, max: 28 }, weather: { description: 'clear sky', icon: '01d' } }
        ]
    },
    london: {
        current: {
            city: 'London',
            country: 'GB',
            temperature: { current: 5, feels_like: 2, humidity: 82 },
            condition: { description: 'light rain', icon: '10d' },
            wind: { speed: 5.2 }
        },
        forecast: [
            { date: '2026-01-27', temp: { min: 4, max: 8 }, weather: { description: 'rain', icon: '10d' } },
            { date: '2026-01-28', temp: { min: 3, max: 7 }, weather: { description: 'heavy rain', icon: '09d' } },
            { date: '2026-01-29', temp: { min: 2, max: 6 }, weather: { description: 'drizzle', icon: '09d' } },
            { date: '2026-01-30', temp: { min: 3, max: 8 }, weather: { description: 'cloudy', icon: '04d' } },
            { date: '2026-01-31', temp: { min: 4, max: 9 }, weather: { description: 'rain', icon: '10d' } }
        ]
    },
    'new york': {
        current: {
            city: 'New York',
            country: 'US',
            temperature: { current: -2, feels_like: -8, humidity: 45 },
            condition: { description: 'snow', icon: '13d' },
            wind: { speed: 8.8 }
        },
        forecast: [
            { date: '2026-01-27', temp: { min: -5, max: 0 }, weather: { description: 'snow', icon: '13d' } },
            { date: '2026-01-28', temp: { min: -4, max: 1 }, weather: { description: 'snow', icon: '13d' } },
            { date: '2026-01-29', temp: { min: -2, max: 3 }, weather: { description: 'mist', icon: '50d' } },
            { date: '2026-01-30', temp: { min: 0, max: 5 }, weather: { description: 'clear sky', icon: '01d' } },
            { date: '2026-01-31', temp: { min: 2, max: 6 }, weather: { description: 'cloudy', icon: '03d' } }
        ]
    },
    tokyo: {
        current: {
            city: 'Tokyo',
            country: 'JP',
            temperature: { current: 8, feels_like: 5, humidity: 45 },
            condition: { description: 'clear sky', icon: '01d' },
            wind: { speed: 3.1 }
        },
        forecast: [
            { date: '2026-01-27', temp: { min: 5, max: 10 }, weather: { description: 'cloudy', icon: '04d' } },
            { date: '2026-01-28', temp: { min: 6, max: 11 }, weather: { description: 'clear sky', icon: '01d' } },
            { date: '2026-01-29', temp: { min: 7, max: 12 }, weather: { description: 'clear sky', icon: '01d' } },
            { date: '2026-01-30', temp: { min: 6, max: 13 }, weather: { description: 'few clouds', icon: '02d' } },
            { date: '2026-01-31', temp: { min: 5, max: 11 }, weather: { description: 'rain', icon: '10d' } }
        ]
    }
};

export const mockCurrentWeather = mockDB.seoul.current;
export const mockForecast = { city: mockDB.seoul.current.city, country: mockDB.seoul.current.country, list: mockDB.seoul.forecast };