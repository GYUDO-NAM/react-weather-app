// Current Weather 목데이터
export const mockCurrentWeather = {
    city: "Seoul",
    country: "South Korea",
    coordinates: {
        longitude: 126.9780,
        latitude: 37.5665
    },
    condition: {
        description: "clear sky",
        icon_url: "http://openweathermap.org/img/wn/01d@2x.png",
        icon: "01d"
    },
    temperature: {
        current: 5.2,
        humidity: 45,
        feels_like: 2.1,
        pressure: 1018
    },
    wind: {
        speed: 3.5,
        degree: 120
    },
    timestamp: Date.now()
};

// 5-Day Forecast 목데이터
export const mockForecast = {
    city: "Seoul",
    country: "South Korea",
    list: [
        {
            dt: Date.now() / 1000,
            date: "2026-01-26",
            temp: { min: 1, max: 6 },
            weather: { description: "clear sky", icon: "01d" }
        },
        {
            dt: Date.now() / 1000 + 86400,
            date: "2026-01-27",
            temp: { min: 2, max: 8 },
            weather: { description: "few clouds", icon: "02d" }
        },
        {
            dt: Date.now() / 1000 + 172800,
            date: "2026-01-28",
            temp: { min: 0, max: 5 },
            weather: { description: "scattered clouds", icon: "03d" }
        },
        {
            dt: Date.now() / 1000 + 259200,
            date: "2026-01-29",
            temp: { min: -2, max: 4 },
            weather: { description: "snow", icon: "13d" }
        },
        {
            dt: Date.now() / 1000 + 345600,
            date: "2026-01-30",
            temp: { min: 1, max: 7 },
            weather: { description: "clear sky", icon: "01d" }
        }
    ]
};