import { Link, useLocation } from 'react-router-dom';
import { FaChartLine, FaHistory, FaWalking, FaCog, FaMoon, FaSun, FaFire } from 'react-icons/fa';

// theme ve toggleTheme props olarak geliyor
export default function Sidebar({ theme, toggleTheme }) {
  const location = useLocation();
  
  // --- Basit Streak (Seri) Hesabı (Frontend'de) ---
  // Gerçek bir uygulamada bu backend'den gelmeli ama şimdilik görsel olarak ekleyelim.
  // Dashboard'daki veri çekme mantığını buraya taşımak gerekir, şimdilik statik bir örnek yapalım.
  const streakGun = 3; // Örnek veri

  return (
    <div className={`d-flex flex-column flex-shrink-0 p-3 ${theme === 'dark' ? 'bg-dark text-white' : 'bg-white text-dark border-end'}`} style={{width: '260px', minHeight: '100vh', transition: 'all 0.3s'}}>
        <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none fw-bold fs-4">
          <span className={theme === 'dark' ? 'text-white' : 'text-primary'}>FitTrack Pro</span>
        </Link>
        <hr />
        <div className="mb-4">
             <div className="d-flex align-items-center">
                <div className="bg-primary bg-opacity-25 p-3 rounded-circle text-primary me-3">
                    <FaWalking size={24} />
                </div>
                <div>
                    <h6 className="mb-0 fw-bold">Şampiyon</h6>
                    {/* Streak Göstergesi */}
                    <small className="text-warning fw-bold"><FaFire /> {streakGun} Günlük Seri!</small>
                </div>
             </div>
        </div>
        
        <ul className="nav nav-pills flex-column mb-auto gap-2">
          {/* Linkler aynı... Sadece renkler CSS'ten gelecek */}
          <li className="nav-item">
            <Link to="/" className={`nav-link fw-bold ${location.pathname === '/' ? 'active' : (theme==='dark'?'text-white':'text-dark')}`}>
              <FaChartLine className="me-2" /> Genel Bakış
            </Link>
          </li>
          <li>
            <Link to="/gecmis" className={`nav-link fw-bold ${location.pathname === '/gecmis' ? 'active' : (theme==='dark'?'text-white':'text-dark')}`}>
              <FaHistory className="me-2" /> Geçmiş
            </Link>
          </li>
           <li>
            <Link to="/ayarlar" className={`nav-link fw-bold ${location.pathname === '/ayarlar' ? 'active' : (theme==='dark'?'text-white':'text-dark')}`}>
              <FaCog className="me-2" /> Ayarlar
            </Link>
          </li>
        </ul>
        
        <hr />
        
        {/* Dark Mode Toggle */}
        <button className={`btn w-100 py-2 mb-3 fw-bold d-flex align-items-center justify-content-center gap-2 ${theme==='dark' ? 'btn-outline-light' : 'btn-outline-dark'}`} onClick={toggleTheme}>
            {theme === 'light' ? <><FaMoon /> Karanlık Mod</> : <><FaSun /> Aydınlık Mod</>}
        </button>

    </div>
  );
}