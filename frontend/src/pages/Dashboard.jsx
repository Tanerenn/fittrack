import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine 
} from 'recharts';
import { FaTint, FaPlus, FaMinus, FaWalking, FaRobot, FaMagic, FaCalendarAlt, FaChartBar, FaChartLine } from 'react-icons/fa';
import ProgressBar from "@ramonak/react-progress-bar";
import Confetti from 'react-confetti';
import toast from 'react-hot-toast'; // YENİ: Bildirimler

const API_BASE = 'http://127.0.0.1:8000/api/';

export default function Dashboard() {
  // --- STATE ---
  const [hedefBilgisi, setHedefBilgisi] = useState(null);
  const [kiloVerileri, setKiloVerileri] = useState([]);
  const [suGecmisi, setSuGecmisi] = useState([]);
  
  // Su State'leri
  const [suVerisi, setSuVerisi] = useState({ bardak_sayisi: 0 });
  const [suTarih, setSuTarih] = useState(new Date().toISOString().split('T')[0]);
  const [suModalAcik, setSuModalAcik] = useState(false);

  // Grafik Seçimi
  const [aktifGrafik, setAktifGrafik] = useState('KILO');

  // Kilo Giriş State'leri
  const [yeniKilo, setYeniKilo] = useState('');
  const [notlar, setNotlar] = useState(''); // YENİ: Not tutmak için
  const [secilenTarih, setSecilenTarih] = useState(new Date().toISOString().split('T')[0]);
  const [kiloModalAcik, setKiloModalAcik] = useState(false);
  const [konfettiVar, setKonfettiVar] = useState(false);

  useEffect(() => {
    veriYukle();
  }, [suTarih]);

  const veriYukle = () => {
    // 1. Hedef
    axios.get(API_BASE + 'hedef/').then(res => {
        if(res.data.length > 0) setHedefBilgisi(res.data[0]);
    });
    // 2. Kilo Geçmişi
    axios.get(API_BASE + 'kilo-kayitlari/').then(res => {
        setKiloVerileri(res.data);
        if(res.data.length > 0) setYeniKilo(res.data[res.data.length-1].kilo);
    });
    // 3. Su Geçmişi (Grafik için)
    axios.get(API_BASE + 'su-takibi/').then(res => {
        const siraliData = [...res.data].sort((a,b) => new Date(a.tarih) - new Date(b.tarih));
        setSuGecmisi(siraliData);
    });
    // 4. Günlük Su
    axios.post(API_BASE + 'su-takibi/tarihli_islem/', { tarih: suTarih, islem: 'getir' })
         .then(res => setSuVerisi(res.data));
  };

  // --- KİLO KAYDETME (NOTLU & TOAST'LI) ---
  const kiloyuKaydet = (e) => {
      e.preventDefault();
      if(!yeniKilo) return;
      
      const oncekiKilo = kiloVerileri.length > 0 ? Number(kiloVerileri[kiloVerileri.length-1].kilo) : Number(yeniKilo);
      const yeniNum = Number(yeniKilo);
      
      // Notlar alanını da gönderiyoruz
      axios.post(API_BASE + 'kilo-kayitlari/', { 
          tarih: secilenTarih, 
          kilo: yeniKilo,
          notlar: notlar 
      }).then(() => {
          veriYukle();
          setKiloModalAcik(false);
          setNotlar(''); // Notu temizle
          
          // BİLDİRİM GÖSTER
          toast.success('Kayıt başarıyla eklendi! 🎉');

          // KONFETİ MANTIĞI
          if (hedefBilgisi) {
              if (hedefBilgisi.hedef_turu === 'VER' && yeniNum < oncekiKilo) { setKonfettiVar(true); setTimeout(() => setKonfettiVar(false), 4000); }
              if (hedefBilgisi.hedef_turu === 'AL' && yeniNum > oncekiKilo) { setKonfettiVar(true); setTimeout(() => setKonfettiVar(false), 4000); }
          }
      });
  }

  const suGuncelle = (islem) => {
      axios.post(API_BASE + 'su-takibi/tarihli_islem/', { tarih: suTarih, islem: islem }).then(res => {
          setSuVerisi(res.data);
          veriYukle();
          // Ufak bir bildirim (İsteğe bağlı)
          if(islem === 'arttir') toast.success('+1 Bardak su içildi! 💧', {duration: 2000, position: 'bottom-center'});
      });
  }

  // --- HESAPLAMALAR ---
  const sonKilo = kiloVerileri.length > 0 ? Number(kiloVerileri[kiloVerileri.length - 1].kilo) : (hedefBilgisi ? hedefBilgisi.baslangic_kilo : 0);
  const hedef = hedefBilgisi ? Number(hedefBilgisi.hedef_kilo) : 75;
  const baslangic = hedefBilgisi ? Number(hedefBilgisi.baslangic_kilo) : sonKilo;
  
  const gunlukSuHedefiLt = (sonKilo * 0.033).toFixed(1);
  const hedefBardak = Math.ceil(gunlukSuHedefiLt / 0.2);
  const icilenLt = (suVerisi.bardak_sayisi * 0.2).toFixed(1);
  let suYuzdesi = Math.min((icilenLt / gunlukSuHedefiLt) * 100, 100);
  if(suYuzdesi < 10) suYuzdesi = 10;

  // --- AI ANALİZ ---
  const aiAnaliz = () => {
      if(!hedefBilgisi || kiloVerileri.length < 2) return { title: "Veri Toplanıyor...", msg: "Biraz daha veri girdiğinde sana özel tavsiyeler vereceğim.", color: "#6c757d" };
      
      const fark = sonKilo - kiloVerileri[0].kilo;
      const gunFarki = (new Date(kiloVerileri[kiloVerileri.length-1].tarih) - new Date(kiloVerileri[0].tarih)) / (1000*3600*24);
      const hiz = fark / (gunFarki || 1);
      
      const son3GunSu = suGecmisi.slice(-3);
      let suOrt = 0;
      if (son3GunSu.length > 0) suOrt = son3GunSu.reduce((a, b) => a + b.bardak_sayisi, 0) / son3GunSu.length;
      const suYeterli = suOrt >= (hedefBardak * 0.8);

      if (hedefBilgisi.hedef_turu === 'VER') {
          if (hiz >= 0 && !suYeterli) return { title: "Su İçmelisin! 💧", msg: "Kilo verimi durmuş. Yetersiz su tüketimi ödem yapıyor olabilir.", color: "#fd7e14" };
          if (hiz < -0.2) return { title: "Mükemmel Gidiyor 🔥", msg: "Yağ yakımı hızın harika. Aynen devam!", color: "#198754" };
          if (hiz > 0) return { title: "Dikkat", msg: "Kilo artışı var. Kalorilere dikkat.", color: "#dc3545" };
          return { title: "İstikrarlısın", msg: "Doğru yoldasın, bozma.", color: "#0d6efd" };
      }
      return { title: "Durum Stabil", msg: "Veriler normal görünüyor.", color: "#0d6efd" };
  }
  const aiData = aiAnaliz();

  return (
    <div className="position-relative container-fluid p-4">
        <style>{`
            @keyframes wave { 0% { transform: translate(-50%, -50%) rotate(0deg); } 100% { transform: translate(-50%, -50%) rotate(360deg); } }
            .wave { position: absolute; left: 50%; width: 200%; height: 200%; border-radius: 40%; background-color: rgba(255, 255, 255, 0.2); animation: wave 10s infinite linear; z-index: 1; }
            .ai-glow:hover { transform: translateY(-5px); box-shadow: 0 0 30px rgba(13, 110, 253, 0.6); }
        `}</style>

        {konfettiVar && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={300}/>}

        <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
                <h2 className="fw-bold mb-0">Kontrol Paneli</h2>
                <small className="text-muted">Hedef: {hedefBilgisi?.hedef_turu === 'VER' ? 'Kilo Vermek' : 'Kilo Almak'}</small>
            </div>
            <button className="btn btn-dark rounded-pill px-4 py-2 shadow-lg d-flex align-items-center gap-2" onClick={() => setKiloModalAcik(true)}>
                <FaWalking className="text-warning" /> <span>Kilo Gir</span>
            </button>
        </div>

        <div className="row g-4 mb-4">
            {/* KİLO KARTI */}
            <div className="col-md-4">
                <div className="card border-0 shadow-sm rounded-4 h-100 p-4 bg-gradient-to-br" style={{background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)'}}>
                    <div className="d-flex justify-content-between">
                        <div><small className="text-muted fw-bold">MEVCUT</small><h1 className="display-4 fw-bold mb-0">{sonKilo}</h1></div>
                        <div className="text-end"><small className="text-muted">HEDEF</small><div className="fw-bold fs-5">{hedef} kg</div></div>
                    </div>
                    <div className="mt-auto pt-4">
                        <ProgressBar completed={Math.min((Math.abs(baslangic - sonKilo) / Math.abs(baslangic - hedef)) * 100, 100)} 
                                     bgColor={hedefBilgisi?.hedef_turu === 'AL' ? '#198754' : '#0d6efd'} baseBgColor="#e0e0e0" height="8px" isLabelVisible={false} />
                    </div>
                </div>
            </div>

            {/* SU KARTI */}
            <div className="col-md-4">
                <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden text-white bg-primary position-relative">
                    <button className="btn btn-sm btn-white position-absolute top-0 end-0 m-3 text-white bg-white bg-opacity-25" style={{zIndex: 20}} onClick={() => setSuModalAcik(true)}>
                        <FaCalendarAlt /> {new Date(suTarih).toLocaleDateString('tr-TR', {day:'numeric', month:'short'})}
                    </button>
                    <div style={{ position: 'absolute', bottom: '0', left: '0', width: '100%', height: `${suYuzdesi}%`, transition: 'height 1s ease' }}>
                        <div className="wave" style={{ top: '-40%' }}></div>
                        <div className="wave" style={{ top: '-45%', animationDuration: '7s' }}></div>
                        <div className="bg-primary w-100 h-100" style={{opacity: 0.9}}></div>
                    </div>
                    <div className="card-body position-relative d-flex flex-column justify-content-between" style={{zIndex: 10}}>
                        <div className="d-flex align-items-center gap-2"><div className="bg-white bg-opacity-25 p-2 rounded-circle"><FaTint /></div><span className="fw-bold">Su Takibi</span></div>
                        <div className="text-center my-2"><h1 className="display-3 fw-bold mb-0">{icilenLt}</h1><small className="opacity-75 fw-bold">/ {gunlukSuHedefiLt} Lt</small></div>
                        <div className="d-flex justify-content-center gap-3">
                            <button className="btn btn-outline-light rounded-circle" onClick={() => suGuncelle('azalt')} disabled={suVerisi.bardak_sayisi <= 0}><FaMinus /></button>
                            <button className="btn btn-light text-primary fw-bold px-4 rounded-pill shadow-sm" onClick={() => suGuncelle('arttir')}>+ 1 Bardak</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* AI KARTI */}
            <div className="col-md-4">
                <div className="card border-0 shadow-sm rounded-4 h-100 text-white ai-glow" style={{background: '#1a1d21'}}>
                    <div className="card-body p-4 d-flex flex-column">
                        <div className="d-flex align-items-center mb-3"><FaRobot className="fs-3 me-2 text-info" /><h5 className="mb-0 fw-bold">AI Koç</h5></div>
                        <div className="flex-grow-1 d-flex flex-column justify-content-center"><h4 className="fw-bold" style={{color: aiData.color}}>{aiData.title}</h4><p className="text-secondary small mb-0">{aiData.msg}</p></div>
                        <div className="mt-3 pt-3 border-top border-secondary border-opacity-25"><small className="text-muted"><FaMagic /> Analiz edildi.</small></div>
                    </div>
                </div>
            </div>
        </div>

        {/* GRAFİK TABLARI */}
        <div className="card border-0 shadow-sm rounded-4 p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold text-secondary mb-0">Analizler</h5>
                <ul className="nav nav-pills bg-light rounded-pill p-1">
                    <li className="nav-item"><button className={`nav-link rounded-pill px-4 ${aktifGrafik === 'KILO' ? 'active' : ''}`} onClick={() => setAktifGrafik('KILO')}><FaChartLine className="me-2" /> Kilo</button></li>
                    <li className="nav-item"><button className={`nav-link rounded-pill px-4 ${aktifGrafik === 'SU' ? 'active' : ''}`} onClick={() => setAktifGrafik('SU')}><FaChartBar className="me-2" /> Su</button></li>
                </ul>
            </div>
            <div style={{ height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                    {aktifGrafik === 'KILO' ? (
                        <AreaChart data={kiloVerileri}>
                            <defs>
                                <linearGradient id="colorKilo" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={hedefBilgisi?.hedef_turu === 'AL' ? '#198754' : '#0d6efd'} stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="tarih" tickFormatter={(t) => t.substring(5)} />
                            <YAxis domain={['auto', 'auto']} />
                            <Tooltip />
                            <ReferenceLine y={hedef} stroke="red" strokeDasharray="3 3" label="Hedef" />
                            <Area type="monotone" dataKey="kilo" stroke={hedefBilgisi?.hedef_turu === 'AL' ? '#198754' : '#0d6efd'} fill="url(#colorKilo)" strokeWidth={3} />
                        </AreaChart>
                    ) : (
                        <BarChart data={suGecmisi}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="tarih" tickFormatter={(t) => t.substring(5)} />
                            <YAxis />
                            <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius:'10px'}}/>
                            <ReferenceLine y={hedefBardak} stroke="orange" strokeDasharray="3 3" label="Hedef" />
                            <Bar dataKey="bardak_sayisi" name="Bardak" fill="#0d6efd" radius={[5, 5, 0, 0]} barSize={40} />
                        </BarChart>
                    )}
                </ResponsiveContainer>
            </div>
        </div>

        {/* MODAL: KİLO & NOT GİRİŞİ */}
        {kiloModalAcik && (
            <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)' }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0 rounded-4 shadow-lg">
                        <div className="modal-body p-5 text-center">
                            <h4 className="fw-bold mb-3">Günlük Giriş</h4>
                            <div className="mb-4">
                                <label className="text-muted small fw-bold mb-1">Tarih</label>
                                <input type="date" className="form-control text-center mx-auto" style={{maxWidth: '200px'}} value={secilenTarih} onChange={e => setSecilenTarih(e.target.value)} />
                            </div>
                            <form onSubmit={kiloyuKaydet}>
                                <div className="input-group input-group-lg mb-4 justify-content-center">
                                    <input type="number" step="0.1" className="form-control text-center fw-bold text-primary border-0 bg-light rounded-pill fs-1" style={{maxWidth: '200px'}} value={yeniKilo} onChange={e => setYeniKilo(e.target.value)} placeholder="0.0" autoFocus />
                                </div>
                                <div className="mb-4">
                                    <textarea className="form-control bg-light border-0 rounded-4 p-3" placeholder="Bugün nasıl hissediyorsun? (Notlar)" rows="2" value={notlar} onChange={e => setNotlar(e.target.value)}></textarea>
                                </div>
                                <button type="submit" className="btn btn-dark w-100 rounded-pill py-3 fw-bold shadow">KAYDET</button>
                            </form>
                            <button className="btn btn-link text-muted mt-3 text-decoration-none" onClick={() => setKiloModalAcik(false)}>Vazgeç</button>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* MODAL: SU TARİHİ */}
        {suModalAcik && (
             <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)' }}>
                <div className="modal-dialog modal-dialog-centered modal-sm">
                    <div className="modal-content border-0 rounded-4 shadow-lg">
                        <div className="modal-body text-center p-4">
                            <h5 className="fw-bold mb-3">Geçmişe Su Ekle</h5>
                            <input type="date" className="form-control mb-3" value={suTarih} onChange={e => setSuTarih(e.target.value)} />
                            <button className="btn btn-primary w-100 rounded-pill" onClick={() => setSuModalAcik(false)}>O Günü Aç</button>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
}