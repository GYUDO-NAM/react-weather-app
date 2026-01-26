import { useState, useEffect } from 'react'
import './App.css'
import Search from './components/Search'
import CurrentWeather from './components/CurrentWeather'
import Forecast from './components/Forecast'
import { weatherService } from './services/weatherService'
import type { CurrentWeather as CurrentWeatherType, ForecastData } from './services/weatherService'

function App() {
  const [city, setCity] = useState<string>('Seoul');
  const [weather, setWeather] = useState<CurrentWeatherType | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadWeatherData = async (searchCity: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const currentWeather = await weatherService.getCurrentWeather(searchCity);
      setWeather(currentWeather);

      const forecastData = await weatherService.getForecast(searchCity);
      setForecast(forecastData);

      setCity(searchCity);
    } catch (err) {
      console.error('Error:', err);
      setError('날씨 정보를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadWeatherData(city);
  }, []);

  const handleSearch = (searchCity: string) => {
    loadWeatherData(searchCity);
  };

  return (
    <div className="App">
      {/* Search */}
      <Search onSearch={handleSearch} isLoading={isLoading} />

      {/* Loading */}
      {isLoading && (
        <div className="loading-message">
          <div className="loading-spinner-large"></div>
        </div>
      )}

      {/* Error */}
      {error && !isLoading && (
        <p className="error-message">{error}</p>
      )}

      {/* Current Weather */}
      {weather && !isLoading && !error && (
        <CurrentWeather data={weather} />
      )}

      {/* 5-Day Forecast */}
      {forecast && !isLoading && !error && (
        <Forecast data={forecast.list} />
      )}

      {/* Credit */}
      <div className="credit">
        Coded by <a href="#">Developer</a>. Open sourced on Github.
      </div>
    </div>
  );
}

export default App
