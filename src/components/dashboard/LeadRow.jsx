import { useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

const LeadRow = ({ lead, copiedId, setCopiedId }) => {
  const [showModal, setShowModal] = useState(false);

	const formatHargaSingkat = (harga) => {
  if (harga >= 1_000_000) {
    return (harga / 1_000_000).toFixed(1).replace(".0", "") + "jt";
  }
  return (harga / 1000).toFixed(0) + "rb";
};


  const handleCopy = () => {
    const pesan = `Terima kasih sudah melakukan pemesanan 🙏  
Berikut detail pesanan Kakak:

Nama Produk: ${lead.productTitle}  
Harga Produk: ${formatHargaSingkat(lead.price)}  
Ongkir: [isi ongkir]  
Total Pembayaran: [isi total pembayaran]

Nama: ${lead.name}  
Alamat Lengkap: ${lead.address}

Apakah alamat yang Kakak berikan sudah benar?  
Kami akan segera proses pesanan Kakak jika alamatnya sudah sesuai ya.  
Untuk ongkir, akan dihitung otomatis dan dianggap disetujui oleh sistem 🙏`;

    navigator.clipboard.writeText(pesan).then(() => {
      setCopiedId(lead.id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <>
      {/* Baris utama */}
      <div
        className="grid grid-cols-5 items-center gap-2 cursor-pointer hover:bg-white/5 px-2 py-2 rounded-md transition text-sm"
        onClick={() => setShowModal(true)}
      >
        <span className="text-xs text-gray-400">
          {new Date(lead.createdAt.seconds * 1000).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
          })}
        </span>

        <span className="font-medium">{lead.name}</span>

        <a
          href={`https://wa.me/${lead.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          {lead.whatsapp}
        </a>

        <span className="text-emerald-400">{lead.paymentMethod}</span>
        <span className="text-white/90 truncate">{lead.productTitle}</span>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-zinc-900 w-[90%] max-w-md p-6 rounded-xl shadow-lg relative border border-white/10 text-sm text-white">
            {/* Tombol close */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-gray-400 hover:text-white text-xl"
            >
              ❌
            </button>

            <h2 className="text-xl font-semibold mb-4">📄 Detail Lead</h2>

            <div className="space-y-2">
              <p><span className="text-gray-400">Nama:</span> {lead.name}</p>
              <p>
                <span className="text-gray-400">WA:</span>{" "}
                <a
                  href={`https://wa.me/${lead.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  {lead.whatsapp}
                </a>
              </p>
              <p><span className="text-gray-400">Harga Produk:</span>{" "}{formatHargaSingkat(lead.price)}</p>
              <p><span className="text-gray-400">Alamat:</span> {lead.address}</p>
              <p><span className="text-gray-400">Metode:</span> {lead.paymentMethod}</p>
              <p><span className="text-gray-400">Produk:</span> {lead.productTitle}</p>
              <p className="text-xs text-gray-500">
                Masuk: {new Date(lead.createdAt.seconds * 1000).toLocaleString("id-ID")}
              </p>
            </div>

            <div className="flex justify-between items-center mt-6">
              <button
                onClick={handleCopy}
                className="bg-white text-black text-xs font-semibold px-3 py-1 rounded-md hover:bg-gray-200 transition"
              >
                {copiedId === lead.id ? "✅ Disalin!" : "📋 Salin Pesan"}
              </button>
              <button
                onClick={async () => {
                  const konfirmasi = window.confirm(`Hapus data atas nama ${lead.name}?`);
                  if (konfirmasi) {
                    await deleteDoc(doc(db, "leads", lead.id));
                    setShowModal(false);
                  }
                }}
                className="text-red-400 hover:text-red-500 text-sm"
              >
                🗑️ Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LeadRow;
