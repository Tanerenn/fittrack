import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaStickyNote } from 'react-icons/fa';
import toast from 'react-hot-toast'; // Bildirim
import Skeleton from 'react-loading-skeleton'; // Yükleme Efekti
import 'react-loading-skeleton/dist/skeleton.css'; // CSS'i unutma

const API_URL = 'http://127.0.0.1:8000/api/kilo-kayitlari/';

export default function History() {
  const [veriler, setVeriler] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    veriCek();
  }, []);

  const veriCek = () => {
    setLoading(true);
    axios.get(API_URL).then(res => {
        setVeriler(res.data);
        setLoading(false);
    });
  };

  const sil = (id) => {
    // Silme işlemi boyunca "Siliniyor..." döner, bitince "Silindi" der.
    toast.promise(
        axios.delete(`${API_URL}${id}/`),
        {
           loading: 'Siliniyor...',
           success: () => { 
               veriCek(); // Listeyi güncelle
               return 'Kayıt silindi!'; 
           },
           error: 'Bir hata oluştu.',
        }
    );
  };

  return (
    <div className="container-fluid p-4">
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div className="card-header bg-white py-3">
                <h5 className="mb-0 fw-bold">Tüm Kayıt Geçmişi</h5>
            </div>
            <div className="table-responsive">
                <table className="table table-hover mb-0 align-middle">
                    <thead className="table-light small text-muted text-uppercase">
                        <tr>
                            <th>Tarih</th>
                            <th>Kilo</th>
                            <th>Notlar</th>
                            <th>İşlem</th>
                        </tr>
                    </thead>
                    <tbody className="border-top-0">
                        {loading ? (
                            // YÜKLENİYORSA 5 TANE BOŞ SATIR GÖSTER (Skeleton)
                            Array(5).fill(0).map((_, i) => (
                                <tr key={i}>
                                    <td><Skeleton width={100} /></td>
                                    <td><Skeleton width={80} /></td>
                                    <td><Skeleton width={200} /></td>
                                    <td><Skeleton width={50} /></td>
                                </tr>
                            ))
                        ) : (
                            // VERİ VARSA LİSTELE
                            [...veriler].reverse().map((item) => (
                                <tr key={item.id}>
                                    <td className="fw-bold text-secondary">
                                        {new Date(item.tarih).toLocaleDateString('tr-TR', {day: 'numeric', month: 'long', year: 'numeric'})}
                                    </td>
                                    <td>
                                        <span className="badge bg-primary bg-opacity-10 text-primary fs-6 px-3 rounded-pill">
                                            {item.kilo} kg
                                        </span>
                                    </td>
                                    <td>
                                        {item.notlar ? (
                                            <div className="d-flex align-items-center text-muted">
                                                <FaStickyNote className="me-2 text-warning" />
                                                <span className="small text-truncate" style={{maxWidth: '250px'}} title={item.notlar}>
                                                    {item.notlar}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="text-muted small opacity-50">-</span>
                                        )}
                                    </td>
                                    <td>
                                        <button className="btn btn-sm btn-outline-danger rounded-pill px-3" onClick={() => sil(item.id)}>
                                            <FaTrash className="me-1"/> Sil
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                {!loading && veriler.length === 0 && (
                    <div className="text-center p-5 text-muted">
                        Henüz hiç kayıt bulunamadı.
                    </div>
                )}
            </div>
        </div>
    </div>
  );
}