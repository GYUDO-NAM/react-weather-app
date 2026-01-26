import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Card, Space } from 'antd'
import Search from 'antd/es/input/Search'
import { weatherService } from './services/weatherService'
import type { CurrentWeather, ForecastData } from './services/weatherService'

function App() {
  const [count, setCount] = useState(0)
  const [weather, setWeather] = useState<CurrentWeather | null>(null)
  const [forecast, setForecast] = useState<ForecastData | null>(null)

  // FE-2: 컴포넌트 마운트 시 날씨 데이터 로드
  useEffect(() => {
    const loadWeatherData = async () => {
      console.log('===========================================');
      console.log('[FE-2] 🚀 Weather Service 시작');
      console.log('===========================================');

      try {
        // Current Weather 가져오기
        const currentWeather = await weatherService.getCurrentWeather('Seoul');
        setWeather(currentWeather);

        // 5-Day Forecast 가져오기
        const forecastData = await weatherService.getForecast('Seoul');
        setForecast(forecastData);

        console.log('===========================================');
        console.log('[FE-2] 🎉 모든 데이터 로드 완료!');
        console.log('===========================================');
      } catch (error) {
        console.error('[FE-2] ❌ 에러 발생:', error);
      }
    };

    loadWeatherData();
  }, []);

  const handleSearch = (value: string) => {
    console.log(value)
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React 1111</h1>
      <Space vertical size={16}>
        <Card title="Default size card" className='!bg-red-500' extra={<a href="#">More</a>} style={{ width: 300 }}>
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={handleSearch}
          />
          <p>Card content: {weather?.city} {weather?.country}</p>
          <p>Card content</p>
          <p>Card content</p>
          <div className="flex">
            <div className="w-14 flex-none bg-red-500">01</div>
            <div className="w-64 flex-1 bg-green-500">02</div>
            <div className="w-32 flex-1 bg-blue-500">03</div>
          </div>
        </Card>
        <Card size="small" title="Small size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </Space>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
