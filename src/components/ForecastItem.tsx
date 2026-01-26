import React from 'react';
import type { ForecastDay } from '../services/weatherService';

interface ForecastItemProps {
    day: ForecastDay;
}

// 날짜를 요일로 변환 (Mon, Tue, Wed 형태)
const formatDay = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
};

function ForecastItem({ day }: ForecastItemProps) {
    return (
        <div className="day">
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
    );
}

export default ForecastItem;
