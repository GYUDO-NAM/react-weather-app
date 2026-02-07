import { CloudSun } from 'lucide-react';

function Header() {
    return (
        <header style={{
            width: '100%',
            height: '70px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 30px',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
            justifyContent: 'space-between',
            zIndex: 20
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CloudSun size={32} color="#fff" />
                <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', letterSpacing: '1px' }}>
                    Weather Dashboard
                </h1>
            </div>
            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', fontStyle: 'italic' }}>
                Check the weather in your favorite cities
            </div>
        </header>
    );
}

export default Header;
