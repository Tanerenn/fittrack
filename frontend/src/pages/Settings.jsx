import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSave, FaUserEdit, FaTint, FaRulerVertical, FaBullseye } from 'react-icons/fa';

const API_URL = 'http://127.0.0.1:8000/api/hedef/';

export default function Settings() {
  const [loading, setLoading] = useState(false);
  const [mesaj, setMesaj] = useState('');
  const [hedefId, setHedefId] = useState(null);
  
  const [formData, setFormData] = useState({
      hedef_turu: 'VER',
      hedef_kilo: '',
      baslangic_kilo: '',
      boy: '',
      cinsiyet: 'E'
  });

  useEffect(() => {
    // Mevcut ayarları çek
    axios.get(API_URL).then(res => {
        if(res.data.length > 0) {
            setFormData(res.data[0]);
            setHedefId(res.data[0].id);
        }
    });
  }, []);

  const guncelle = (e) => {
      e.preventDefault();
      setLoading(true);
      // Backend'de güncelleme (PUT) işlemi
      axios.put(`${API_URL}${hedefId}/`, formData).then(() => {
          setMesaj('Ayarlar başarıyla güncellendi! 🎉');
          setLoading(false);
          setTimeout(() => setMesaj(''), 3000);
      }).catch(() => {
          setMesaj('Bir hata oluştu.');
          setLoading(false);
      });
  };

  return (
    <div className="container-fluid">
      <h2 className="fw-bold mb-4">Profil ve Hedef Ayarları</h2>

      <div className="row">
          <div className="col-md-8 col-lg-6">
              <div className="card border-0 shadow-sm rounded-4">
                  <div className="card-body p-4">
                      
                      {mesaj && <div className={`alert ${mesaj.includes('hata') ? 'alert-danger' : 'alert-success'} rounded-3`}>{mesaj}</div>}

                      <form onSubmit={guncelle}>
                          {/* Hedef Türü Seçimi */}
                          <div className="mb-4">
                              <label className="form-label text-muted fw-bold small">HEDEFİNİZ</label>
                              <div className="d-flex gap-2">
                                  {['VER', 'AL', 'KORU'].map((tur) => (
                                      <button 
                                        key={tur}
                                        type="button" 
                                        className={`btn flex-grow-1 py-2 ${formData.hedef_turu === tur ? 'btn-dark' : 'btn-outline-light text-dark border'}`}
                                        onClick={() => setFormData({...formData, hedef_turu: tur})}
                                      >
                                          {tur === 'VER' ? 'Kilo Vermek' : tur === 'AL' ? 'Kilo Almak' : 'Korumak'}
                                      </button>
                                  ))}
                              </div>
                          </div>

                          <div className="row g-3 mb-3">
                              <div className="col-md-6">
                                  <label className="form-label text-muted fw-bold small"><FaBullseye className="me-1"/> HEDEF KİLO</label>
                                  <input type="number" className="form-control form-control-lg bg-light border-0" 
                                      value={formData.hedef_kilo} onChange={e => setFormData({...formData, hedef_kilo: e.target.value})} />
                              </div>
                              <div className="col-md-6">
                                  <label className="form-label text-muted fw-bold small"><FaUserEdit className="me-1"/> BAŞLANGIÇ KİLOSU</label>
                                  <input type="number" className="form-control form-control-lg bg-light border-0" 
                                      value={formData.baslangic_kilo} onChange={e => setFormData({...formData, baslangic_kilo: e.target.value})} />
                              </div>
                          </div>

                          <div className="row g-3 mb-4">
                              <div className="col-md-6">
                                  <label className="form-label text-muted fw-bold small"><FaRulerVertical className="me-1"/> BOY (CM)</label>
                                  <input type="number" className="form-control form-control-lg bg-light border-0" 
                                      value={formData.boy} onChange={e => setFormData({...formData, boy: e.target.value})} />
                              </div>
                              <div className="col-md-6">
                                  <label className="form-label text-muted fw-bold small">CİNSİYET</label>
                                  <select className="form-select form-select-lg bg-light border-0" 
                                      value={formData.cinsiyet} onChange={e => setFormData({...formData, cinsiyet: e.target.value})}>
                                      <option value="E">Erkek</option>
                                      <option value="K">Kadın</option>
                                  </select>
                              </div>
                          </div>

                          <div className="alert alert-light border border-secondary border-opacity-10 d-flex align-items-center mb-4">
                              <FaTint className="text-primary fs-4 me-3" />
                              <small className="text-muted">Günlük su hedefiniz, girdiğiniz kilo ve cinsiyet bilgilerine göre <strong>otomatik</strong> yeniden hesaplanacaktır.</small>
                          </div>

                          <button type="submit" className="btn btn-primary w-100 py-3 rounded-pill fw-bold shadow-sm" disabled={loading}>
                              {loading ? 'Kaydediliyor...' : <><FaSave className="me-2"/> Değişiklikleri Kaydet</>}
                          </button>
                      </form>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}