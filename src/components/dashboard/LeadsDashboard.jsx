import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";

const LeadsDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [copiedId, setCopiedId] = useState(null); // untuk notifikasi salin

  useEffect(() => {
    const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLeads(data);
    });

    return () => unsubscribe();
  }, []);

  const handleCopy = (lead) => {
    const pesan = `Terima kasih sudah melakukan pemesanan 🙏  
Berikut detail pesanan Kakak:

Nama Produk: ${lead.productTitle}  
Harga Produk: [isi harga produk]  
Ongkir: [isi ongkir]  
Total Pembayaran: [isi total pembayaran]

Nama: ${lead.name}  
Alamat Lengkap: ${lead.address}

Apakah alamat yang Kakak berikan sudah benar?  
Kami akan segera proses pesanan Kakak jika alamatnya sudah sesuai ya.  
Untuk ongkir, akan dihitung otomatis dan dianggap disetujui oleh sistem 🙏`;

    navigator.clipboard.writeText(pesan).then(() => {
      setCopiedId(lead.id);
      setTimeout(() => setCopiedId(null), 2000); // reset notif setelah 2 detik
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        📋 Data Leads WhatsApp
      </h1>

      {leads.length === 0 ? (
        <p className="text-center text-gray-600">Belum ada data leads masuk.</p>
      ) : (
        <div className="space-y-6">
          {Object.entries(
            leads.reduce((groups, lead) => {
              const date = new Date(lead.createdAt.seconds * 1000);
              const monthYear = date.toLocaleString("id-ID", {
                month: "long",
                year: "numeric",
              });

              if (!groups[monthYear]) {
                groups[monthYear] = [];
              }
              groups[monthYear].push(lead);
              return groups;
            }, {})
          ).map(([month, leadsInMonth]) => (
            <div key={month}>
              <h2 className="text-xl font-bold mb-3 border-b pb-1 text-gray-700">
                {month}
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {leadsInMonth.map((lead) => (
                  <div
                    key={lead.id}
                    className="relative bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition"
                  >
                    {/* Tombol Hapus */}
                    <button
                      onClick={async () => {
                        const confirmDelete = window.confirm(
                          `Yakin mau hapus data lead atas nama "${lead.name}"?`
                        );
                        if (confirmDelete) {
                          await deleteDoc(doc(db, "leads", lead.id));
                        }
                      }}
                      className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-lg"
                      title="Hapus data"
                    >
                      🗑️
                    </button>

                    {/* Konten Lead */}
                    <div className="space-y-1 text-gray-800">
                      <p>
                        <strong>Nama:</strong> {lead.name}
                      </p>
                      <p>
                        <strong>No. WhatsApp:</strong>{" "}
                        <a
                          href={`https://wa.me/${lead.whatsapp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          {lead.whatsapp}
                        </a>
                      </p>
                      <p>
                        <strong>Alamat:</strong> <br /> {lead.address}
                      </p>
                      <p>
                        <strong>Metode Bayar:</strong> {lead.paymentMethod}
                      </p>
                      <p>
                        <strong>Produk:</strong> {lead.productTitle}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        Masuk:{" "}
                        {new Date(
                          lead.createdAt.seconds * 1000
                        ).toLocaleString()}
                      </p>
                    </div>

                    {/* Tombol Copy */}
                    <button
                      onClick={() => handleCopy(lead)}
                      className="mt-4 inline-block bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                      {copiedId === lead.id ? "✅ Disalin!" : "📋 Salin Pesan"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeadsDashboard;
