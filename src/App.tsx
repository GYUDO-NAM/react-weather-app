import { useState, useEffect } from 'react'
import './App.css'
import Search from './components/Search'
import CurrentWeather from './components/CurrentWeather'
import Forecast from './components/Forecast'
import { weatherService } from './services/weatherService'
import type { CurrentWeather as CurrentWeatherType, ForecastData } from './services/weatherService'

function App() {
  // 1. 상태 정의
  const [city, setCity] = useState<string>('Seoul');
  const [weather, setWeather] = useState<CurrentWeatherType | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [bgClass, setBgClass] = useState<string>('weather-clear'); // 초기 배경 상태

  // 2. 동적 배경 클래스 매핑 함수 (OpenWeatherMap Condition 코드 기준)
  const getBackgroundClass = (description: string): string => {
    const desc = description.toLowerCase();
    if (desc.includes('clear')) return 'weather-clear';
    if (desc.includes('cloud')) return 'weather-clouds';
    if (desc.includes('rain') || desc.includes('drizzle')) return 'weather-rain';
    if (desc.includes('snow')) return 'weather-snow';
    if (desc.includes('thunder')) return 'weather-thunderstorm';
    if (desc.includes('mist') || desc.includes('fog') || desc.includes('haze')) return 'weather-mist';
    return 'weather-clear'; // 기본값
  };

  // 3. 데이터 로드 함수
  const loadWeatherData = async (searchCity: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Current Weather 가져오기
      const currentWeather = await weatherService.getCurrentWeather(searchCity);
      setWeather(currentWeather);
      setCity(searchCity);

      // 배경 클래스 업데이트 (날씨 설명 기반)
      const newBgClass = getBackgroundClass(currentWeather.description);
      setBgClass(newBgClass);
      document.body.className = newBgClass; // body 클래스 직접 변경

      // 5-Day Forecast 가져오기
      const forecastData = await weatherService.getForecast(searchCity);
      setForecast(forecastData);

    } catch (err: any) {
      // 4. 에러 핸들링
      console.error('Error loading weather data:', err);

      // API 에러 메시지 분석 (MockData 사용 시에는 발생하지 않음)
      if (err.response && err.response.status === 404) {
        setError(`⛔ "${searchCity}" 도시를 찾을 수 없습니다. 다시 시도해주세요.`);
      } else {
        setError('⚠️ 날씨 정보를 불러오는데 실패했습니다. 네트워크 상태를 확인하거나 잠시 후 다시 시도해주세요.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 5. 초기 로드
  useEffect(() => {
    loadWeatherData('Seoul');
    // Clean up body class on unmount
    return () => {
      document.body.className = '';
    };
  }, []);

  // 6. 검색 핸들러
  const handleSearch = (searchCity: string) => {
    // 빈 검색어 방지
    if (!searchCity.trim()) return;
    loadWeatherData(searchCity);
  };

  return (
    <div className="App">
      {/* Search Component */}
      <Search onSearch={handleSearch} isLoading={isLoading} />

      {/* Error Message */}
      {error && !isLoading && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* Loading Spinner */}
      {isLoading && (
        <div className="loading-message">
          <div className="loading-spinner-large"></div>
        </div>
      )}

      {/* Weather Content (Only show if no error) */}
      {!isLoading && !error && weather && (
        <>
          <CurrentWeather data={weather} />
          {forecast && <Forecast data={forecast.list} />}
        </>
      )}

      {/* Credit Footer */}
      <div className="credit">
        Coded by <a href="https://github.com/GYUDO-NAM" target="_blank" rel="noopener noreferrer">Gyudo Nam</a>.
        Styled inspired by <a href="https://github.com/s-shemmee/React-Weather-App" target="_blank" rel="noopener noreferrer">Shemmee</a>.
      </div>
    </div>
  );
}

export default App
