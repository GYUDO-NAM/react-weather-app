import { useState, useEffect } from 'react'
import './App.css'
import Search from './components/Search'
import { weatherService } from './services/weatherService'
import type { CurrentWeather, ForecastData } from './services/weatherService'

function App() {
  // FE-3: 도시명, 날씨 데이터, 로딩 상태 관리
  const [city, setCity] = useState<string>('Seoul');
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 날씨 데이터 로드 함수
  const loadWeatherData = async (searchCity: string) => {
    console.log('===========================================');
    console.log(`[FE-3] � 검색 시작: ${searchCity}`);
    console.log('===========================================');

    setIsLoading(true);
    setError(null);

    try {
      // Current Weather 가져오기
      const currentWeather = await weatherService.getCurrentWeather(searchCity);
      setWeather(currentWeather);

      // 5-Day Forecast 가져오기
      const forecastData = await weatherService.getForecast(searchCity);
      setForecast(forecastData);

      // 도시명 업데이트
      setCity(searchCity);

      console.log('===========================================');
      console.log('[FE-3] 🎉 검색 완료!');
      console.log('===========================================');
    } catch (err) {
      console.error('[FE-3] ❌ 에러 발생:', err);
      setError('날씨 정보를 불러오는데 실패했습니다. 도시명을 확인해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  // 초기 로드
  useEffect(() => {
    loadWeatherData(city);
  }, []);

  // FE-3: 검색 핸들러
  const handleSearch = (searchCity: string) => {
    loadWeatherData(searchCity);
  };

  return (
    <div className="app">
      <h1>🌤️ Weather App</h1>

      {/* FE-3: Search 컴포넌트 */}
      <Search onSearch={handleSearch} isLoading={isLoading} />

      {/* 로딩 상태 */}
      {isLoading && (
        <div className="loading-message">
          <div className="loading-spinner-large"></div>
          <p>날씨 정보를 불러오는 중...</p>
        </div>
      )}

      {/* 에러 메시지 */}
      {error && !isLoading && (
        <div className="error-message">
          <p>❌ {error}</p>
        </div>
      )}

      {/* 현재 날씨 표시 */}
      {weather && !isLoading && !error && (
        <div className="weather-card">
          <h2>{weather.city}, {weather.country}</h2>
          <div className="weather-icon">
            <img
              src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt={weather.description}
            />
          </div>
          <div className="temp">{Math.round(weather.temp)}°C</div>
          <p className="description">{weather.description}</p>
          <div className="weather-details">
            <span>💧 습도: {weather.humidity}%</span>
            <span>🌡️ 체감: {weather.feelsLike}°C</span>
            <span>💨 풍속: {weather.windSpeed} m/s</span>
          </div>
        </div>
      )}

      {/* 5일 예보 표시 */}
      {forecast && !isLoading && !error && (
        <div className="forecast-section">
          <h3>📅 5일 예보</h3>
          <div className="forecast-list">
            {forecast.list.map((day, index) => (
              <div key={index} className="forecast-item">
                <div className="forecast-date">{day.date}</div>
                <img
                  src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}
                  alt={day.description}
                  className="forecast-icon"
                />
                <div className="forecast-temp">
                  {day.tempMin}° / {day.tempMax}°
                </div>
                <div className="forecast-desc">{day.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App
