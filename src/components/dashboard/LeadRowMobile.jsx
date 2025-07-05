import { useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

const formatHargaSingkat = (harga) => {
  if (!harga) return "-";
  if (harga >= 1_000_000) return (harga / 1_000_000).toFixed(1).replace(".0", "") + "jt";
  return (harga / 1000).toFixed(0) + "rb";
};

const LeadRowMobile = ({ lead, copiedId, setCopiedId }) => {
  const [showModal, setShowModal] = useState(false);

  const handleCopy = () => {
    const pesan = `Terima kasih sudah melakukan pemesanan 🙏  
Nama Produk: ${lead.productTitle}  
Harga Produk: ${formatHargaSingkat(lead.price)}  
Ongkir: [isi ongkir]  
Total Pembayaran: [isi total pembayaran]

Nama: ${lead.name}  
Alamat Lengkap: ${lead.address}

Apakah alamat yang Kakak berikan sudah benar?`;
    navigator.clipboard.writeText(pesan).then(() => {
      setCopiedId(lead.id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="bg-zinc-900 rounded-xl p-4 mb-4 shadow hover:bg-zinc-800 transition cursor-pointer"
      >
        <div className="flex justify-between text-sm mb-2 text-gray-400">
          <span>
            {new Date(lead.createdAt.seconds * 1000).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "short",
            })}
          </span>
          <span className="text-emerald-400">{lead.paymentMethod}</span>
        </div>
        <div className="text-white font-semibold">{lead.name}</div>
        <div className="text-blue-400 text-sm">{lead.whatsapp}</div>
        <div className="text-sm text-white mt-1">{lead.productTitle}</div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
          <div className="bg-zinc-900 w-full max-w-md p-6 rounded-xl shadow-lg relative border border-white/10 text-sm text-white">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-gray-400 hover:text-white text-xl"
            >
              ❌
            </button>

            <h2 className="text-xl font-semibold mb-4">📄 Detail Order</h2>

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
              <p>
                <span className="text-gray-400">Harga Produk:</span>{" "}
                {formatHargaSingkat(lead.price)}
              </p>
              <p><span className="text-gray-400">Alamat:</span> {lead.address}</p>
              <p><span className="text-gray-400">Metode:</span> {lead.paymentMethod}</p>
              <p><span className="text-gray-400">Produk:</span> {lead.productTitle}</p>
            </div>

            <div className="flex justify-between items-center mt-6">
              <button
                onClick={handleCopy}
                className="bg-white text-black text-xs font-semibold px-3 py-1 rounded-md hover:bg-gray-200 transition"
              >
                {copiedId === lead.id ? "✅ Disalin!" : "📋 Salin"}
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

export default LeadRowMobile;
