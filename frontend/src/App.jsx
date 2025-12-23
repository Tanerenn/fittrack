import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Toaster } from 'react-hot-toast'; // Bildirimler için
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'; // CSS dosyanı import et

import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Settings from './pages/Settings';
import Onboarding from './pages/Onboarding';

const API_URL = 'http://127.0.0.1:8000/api/hedef/';

function App() {
  const [kurulumYapildi, setKurulumYapildi] = useState(null);
  // Tema State'i (Varsayılanı localStorage'dan çek)
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const navigate = useNavigate();

  // Tema değişince HTML'e uygula ve kaydet
  useEffect(() => {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
      setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }

  useEffect(() => {
    axios.get(API_URL).then(res => {
        if (res.data.length > 0) { setKurulumYapildi(true); } else { setKurulumYapildi(false); navigate('/kurulum'); }
    }).catch(() => setKurulumYapildi(false));
  }, []);

  if (kurulumYapildi === null) return <div className="d-flex justify-content-center align-items-center min-vh-100">Yükleniyor...</div>;

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Bildirim Kutusu (En üstte dursun) */}
      <Toaster position="top-right" toastOptions={{className: 'fw-bold rounded-4 shadow-sm'}}/>
      
      {kurulumYapildi && <Sidebar theme={theme} toggleTheme={toggleTheme} />}
      
      <div className="flex-grow-1 p-0" style={{maxHeight: '100vh', overflowY: 'auto'}}>
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/gecmis" element={<History />} />
            <Route path="/ayarlar" element={<Settings />} />
            <Route path="/kurulum" element={<Onboarding setKurulumYapildi={setKurulumYapildi} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App