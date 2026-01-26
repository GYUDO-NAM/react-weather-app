import type { ForecastDay } from '../services/weatherService';

interface ForecastProps {
    data: ForecastDay[];
}

// 날짜를 요일로 변환 (Mon, Tue, Wed 형태)
const formatDay = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
};

function Forecast({ data }: ForecastProps) {
    return (
        <div className="forecast-section">
            <h3>5-Day Forecast:</h3>
            <div className="forecast-container">
                {data.map((day, index) => (
                    <div key={index} className="day">
                        <span className="day-name">{formatDay(day.date)}</span>
                        <img
                            src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                            alt={day.description}
                            className="day-icon"
                        />
                        <span className="day-temperature">
                            {day.tempMin}° / {day.tempMax}°
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Forecast;
