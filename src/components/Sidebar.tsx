import { useState, useEffect } from 'react';
import { weatherService } from '../services/weatherService';
import type { CurrentWeather } from '../services/weatherService';
import { MapPin } from 'lucide-react';

interface SidebarProps {
    onSelectCity: (city: string) => void;
    currentCity: string;
}

const FAVORITE_CITIES = ['Seoul', 'New York', 'London', 'Tokyo', 'Paris', 'Sydney', 'Dubai', 'Yakutsk'];

function Sidebar({ onSelectCity, currentCity }: SidebarProps) {
    const [cityData, setCityData] = useState<Record<string, CurrentWeather>>({});

    useEffect(() => {
        // 각 도시의 간단한 날씨 정보를 미리 로드 (아이콘/온도 표시용)
        const loadSidebarData = async () => {
            const dataMap: Record<string, CurrentWeather> = {};

            // 병렬로 요청하면 Mock 데이터나 API 제한에 걸릴 수 있으므로 순차 처리 또는 Promise.all 사용
            // 여기서는 UI 반응성을 위해 간단히 구현 (실제 프로덕션에선 캐싱 필요)
            await Promise.all(FAVORITE_CITIES.map(async (city) => {
                try {
                    // 사이드바용 api 호출은 조용히 실패해도 앱 사용엔 지장 없도록 처리
                    const data = await weatherService.getCurrentWeather(city);
                    dataMap[city] = data;
                } catch (e) {
                    console.error(`Failed to load sidebar weather for ${city}`, e);
                }
            }));
            setCityData(dataMap);
        };

        loadSidebarData();
    }, []);

    return (
        <div className="sidebar">
            <h3>Favorite Cities</h3>
            <ul className="city-list">
                {FAVORITE_CITIES.map((city) => {
                    const data = cityData[city];
                    const isActive = currentCity.toLowerCase() === city.toLowerCase();

                    return (
                        <li
                            key={city}
                            className={`city-item ${isActive ? 'active' : ''}`}
                            onClick={() => onSelectCity(city)}
                            style={isActive ? { background: 'rgba(255,255,255,0.5)', fontWeight: 'bold' } : {}}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <MapPin size={16} />
                                <span>{city}</span>
                            </div>

                            {data ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <img
                                        src={`https://openweathermap.org/img/wn/${data.icon}.png`}
                                        alt="icon"
                                        style={{ width: '25px', height: '25px' }}
                                    />
                                    <span>{Math.round(data.temp)}°</span>
                                </div>
                            ) : (
                                <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Loading...</span>
                            )}
                        </li>
                    );
                })}
            </ul>

            <div style={{ marginTop: 'auto', padding: '20px 0', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                Weather status updates automatically
            </div>
        </div>
    );
}

export default Sidebar;
