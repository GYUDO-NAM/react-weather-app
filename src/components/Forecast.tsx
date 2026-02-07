import type { ForecastDay } from '../services/weatherService';
import ForecastItem from './ForecastItem';

interface ForecastProps {
    data: ForecastDay[];
}

function Forecast({ data }: ForecastProps) {
    // 5일치 데이터만 사용하도록 필터링 (최대 5개)
    const fiveDayData = data.slice(0, 5);

    return (
        <div className="forecast-section">
            <h3>5-Day Forecast:</h3>
            <div className="forecast-container">
                {fiveDayData.map((day, index) => (
                    <ForecastItem key={index} day={day} />
                ))}
            </div>
        </div>
    );
}

export default Forecast;
