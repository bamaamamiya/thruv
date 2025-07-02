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
   <div className="min-h-screen bg-black text-white px-4 py-12">
  <div className="max-w-5xl mx-auto space-y-8">
    <h1 className="text-3xl sm:text-4xl font-bold text-center text-white">
      📋 Data Leads WhatsApp
    </h1>

    {leads.length === 0 ? (
      <p className="text-center text-gray-400">Belum ada data leads masuk.</p>
    ) : (
      <div className="space-y-10">
        {Object.entries(
          leads.reduce((groups, lead) => {
            const date = new Date(lead.createdAt.seconds * 1000);
            const monthYear = date.toLocaleString("id-ID", {
              month: "long",
              year: "numeric",
            });

            if (!groups[monthYear]) groups[monthYear] = [];
            groups[monthYear].push(lead);
            return groups;
          }, {})
        ).map(([month, leadsInMonth]) => (
          <div key={month}>
            <h2 className="text-xl font-bold mb-4 border-b border-zinc-700 pb-1 text-white/90">
              {month}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {leadsInMonth.map((lead) => (
                <div
                  key={lead.id}
                  className="relative bg-zinc-900 border border-zinc-700 rounded-2xl p-5 shadow-md hover:shadow-lg transition"
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
                    className="absolute top-3 right-3 text-red-400 hover:text-red-500 text-lg"
                    title="Hapus data"
                  >
                    🗑️
                  </button>

                  {/* Konten Lead */}
                  <div className="space-y-2 text-sm text-gray-300">
                    <p>
                      <strong className="text-white">Nama:</strong> {lead.name}
                    </p>
                    <p>
                      <strong className="text-white">No. WhatsApp:</strong>{" "}
                      <a
                        href={`https://wa.me/${lead.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        {lead.whatsapp}
                      </a>
                    </p>
                    <p>
                      <strong className="text-white">Alamat:</strong>{" "}
                      {lead.address}
                    </p>
                    <p>
                      <strong className="text-white">Metode Bayar:</strong>{" "}
                      {lead.paymentMethod}
                    </p>
                    <p>
                      <strong className="text-white">Produk:</strong>{" "}
                      {lead.productTitle}
                    </p>
                    <p className="text-gray-500 text-xs pt-1">
                      Masuk:{" "}
                      {new Date(lead.createdAt.seconds * 1000).toLocaleString()}
                    </p>
                  </div>

                  {/* Tombol Copy */}
                  <button
                    onClick={() => handleCopy(lead)}
                    className="mt-4 inline-block bg-white text-black text-sm font-semibold px-4 py-2 rounded-md hover:bg-gray-200 transition"
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
</div>

  );
};

export default LeadsDashboard;
