import { useState } from 'react';
import { Droplets, Wind } from 'lucide-react';
import type { CurrentWeather as CurrentWeatherType } from '../services/weatherService';

interface CurrentWeatherProps {
    data: CurrentWeatherType;
}

// 현재 날짜 포맷팅 (Monday, January 26, 2026 형태)
const formatDate = (): string => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return now.toLocaleDateString('en-US', options);
};

function CurrentWeather({ data }: CurrentWeatherProps) {
    const [isCelsius, setIsCelsius] = useState(true);

    // 온도 변환
    const tempCelsius = Math.round(data.temp);
    const tempFahrenheit = Math.round((data.temp * 9) / 5 + 32);
    const displayTemp = isCelsius ? tempCelsius : tempFahrenheit;

    return (
        <div className="current-weather">
            {/* 도시명, 국가 */}
            <h2 className="city-name">{data.city}, {data.country}</h2>

            {/* 날짜 */}
            <p className="date">{formatDate()}</p>

            {/* 날씨 아이콘 */}
            <div className="temp-icon-wrapper">
                <img
                    src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
                    alt={data.description}
                    className="temp-icon"
                />
            </div>

            {/* 온도 (°C | °F 토글) */}
            <div className="temp">
                <span className="temp-value">{displayTemp}</span>
                <span
                    className={`temp-deg ${isCelsius ? 'active' : ''}`}
                    onClick={() => setIsCelsius(true)}
                >
                    °C
                </span>
                <span className="temp-separator">|</span>
                <span
                    className={`temp-deg ${!isCelsius ? 'active' : ''}`}
                    onClick={() => setIsCelsius(false)}
                >
                    °F
                </span>
            </div>

            {/* 날씨 설명 */}
            <p className="weather-des">{data.description}</p>

            {/* 풍속 & 습도 */}
            <div className="weather-info">
                <div className="col">
                    <Wind size={20} />
                    <div className="col-info">
                        <span className="info-value">{data.windSpeed} m/s</span>
                        <span className="info-label">Wind speed</span>
                    </div>
                </div>
                <div className="col">
                    <Droplets size={20} />
                    <div className="col-info">
                        <span className="info-value">{data.humidity}%</span>
                        <span className="info-label">Humidity</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CurrentWeather;
