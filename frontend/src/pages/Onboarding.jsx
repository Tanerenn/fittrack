import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaBullseye, FaArrowRight, FaMars, FaVenus, FaCheckCircle } from 'react-icons/fa';

export default function Onboarding({ setKurulumYapildi }) {
  const navigate = useNavigate();
  const [adim, setAdim] = useState(1);
  
  const [form, setForm] = useState({
      hedef_turu: 'VER', // VER, AL, KORU
      baslangic_kilo: '',
      hedef_kilo: '',
      boy: '',
      cinsiyet: 'E'
  });

  const kaydet = () => {
    axios.post('http://127.0.0.1:8000/api/hedef/', form)
        .then(() => {
            // İlk kilo kaydını da otomatik oluşturalım
            const bugun = new Date().toISOString().split('T')[0];
            axios.post('http://127.0.0.1:8000/api/kilo-kayitlari/', {
                tarih: bugun,
                kilo: form.baslangic_kilo
            });
            
            setKurulumYapildi(true);
            navigate('/');
        });
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-dark">
      <div className="card shadow-lg border-0 rounded-4 overflow-hidden" style={{maxWidth: '500px', width: '100%'}}>
        <div className="card-body p-5">
            
            {/* ADIM 1: HEDEF TÜRÜ */}
            {adim === 1 && (
                <div className="text-center fade-in">
                    <div className="mb-4 bg-primary bg-opacity-10 d-inline-block p-3 rounded-circle text-primary">
                        <FaBullseye size={40} />
                    </div>
                    <h2 className="fw-bold mb-3">Hedefin ne?</h2>
                    <p className="text-muted mb-4">Sana en uygun planı hazırlamamız için bunu bilmeliyiz.</p>
                    
                    <div className="d-grid gap-3">
                        <button className={`btn p-3 text-start border rounded-3 ${form.hedef_turu === 'VER' ? 'btn-primary' : 'btn-outline-light text-dark'}`} 
                            onClick={() => setForm({...form, hedef_turu: 'VER'})}>
                            <h5 className="mb-0 fw-bold">📉 Kilo Vermek</h5>
                            <small className="opacity-75">Daha fit ve hafif hissetmek istiyorum.</small>
                        </button>
                        <button className={`btn p-3 text-start border rounded-3 ${form.hedef_turu === 'AL' ? 'btn-primary' : 'btn-outline-light text-dark'}`} 
                            onClick={() => setForm({...form, hedef_turu: 'AL'})}>
                            <h5 className="mb-0 fw-bold">📈 Kilo Almak</h5>
                            <small className="opacity-75">Daha güçlü ve hacimli olmak istiyorum.</small>
                        </button>
                        <button className={`btn p-3 text-start border rounded-3 ${form.hedef_turu === 'KORU' ? 'btn-primary' : 'btn-outline-light text-dark'}`} 
                            onClick={() => setForm({...form, hedef_turu: 'KORU'})}>
                            <h5 className="mb-0 fw-bold">⚓️ Kilomu Korumak</h5>
                            <small className="opacity-75">Mevcut formumdan memnunum.</small>
                        </button>
                    </div>
                    <button className="btn btn-dark w-100 mt-4 py-3 rounded-pill fw-bold" onClick={() => setAdim(2)}>Devam Et <FaArrowRight/></button>
                </div>
            )}

            {/* ADIM 2: VÜCUT BİLGİLERİ */}
            {adim === 2 && (
                <div className="fade-in">
                    <h3 className="fw-bold mb-4 text-center">Vücut Analizi</h3>
                    
                    <div className="row g-3 mb-3">
                        <div className="col-6">
                            <label className="form-label text-muted small fw-bold">Şu Anki Kilon</label>
                            <input type="number" className="form-control form-control-lg fw-bold" placeholder="kg" 
                                value={form.baslangic_kilo} onChange={e => setForm({...form, baslangic_kilo: e.target.value})} />
                        </div>
                        <div className="col-6">
                            <label className="form-label text-muted small fw-bold">Hedef Kilon</label>
                            <input type="number" className="form-control form-control-lg fw-bold" placeholder="kg" 
                                value={form.hedef_kilo} onChange={e => setForm({...form, hedef_kilo: e.target.value})} />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label text-muted small fw-bold">Boyun (cm)</label>
                        <input type="number" className="form-control form-control-lg" placeholder="Örn: 178" 
                             value={form.boy} onChange={e => setForm({...form, boy: e.target.value})} />
                    </div>

                    <div className="mb-4">
                        <label className="form-label text-muted small fw-bold d-block">Cinsiyet</label>
                        <div className="btn-group w-100" role="group">
                            <button type="button" className={`btn py-2 ${form.cinsiyet === 'E' ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => setForm({...form, cinsiyet: 'E'})}>
                                <FaMars /> Erkek
                            </button>
                            <button type="button" className={`btn py-2 ${form.cinsiyet === 'K' ? 'btn-danger' : 'btn-outline-secondary'}`} onClick={() => setForm({...form, cinsiyet: 'K'})}>
                                <FaVenus /> Kadın
                            </button>
                        </div>
                    </div>

                    <div className="d-flex gap-2">
                        <button className="btn btn-light w-50 py-3 rounded-pill" onClick={() => setAdim(1)}>Geri</button>
                        <button className="btn btn-dark w-50 py-3 rounded-pill fw-bold" onClick={kaydet}>Başlayalım <FaCheckCircle/></button>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}