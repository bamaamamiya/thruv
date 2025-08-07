// dashboard/leadrow.jsx
import { useState } from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const LeadRow = ({ lead, copiedId, setCopiedId }) => {
  const [showModal, setShowModal] = useState(false);
  const [updating, setUpdating] = useState(false);

  const formatHargaSingkat = (harga) => {
    if (harga >= 1_000_000) {
      return (harga / 1_000_000).toFixed(1).replace(".0", "") + "jt";
    }
    return (harga / 1000).toFixed(0) + "rb";
  };

  const handleCopyAddress = () => {
    const prompt = `[PROVINSI], [KABUPATEN/KOTA], [KECAMATAN], [DESA/KELURAHAN] dan rapikan alamat lengkap, dan kecamatan terpisah.\n\nAlamat mentah: ${lead.address}`;
    navigator.clipboard.writeText(prompt).then(() => {
      setCopiedId(lead.id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleCopy = () => {
    const pesan = `Terima kasih sudah melakukan pemesanan 🙏  
Berikut detail pesanan Kakak:

Nama Produk: ${lead.productTitle}  
Harga Produk: ${formatHargaSingkat(lead.price)}  
Ongkir: 
Total Pembayaran: 

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

  const handleStatusChange = async (newStatus) => {
    if (newStatus === lead.status) return;
    setUpdating(true);
    try {
      await updateDoc(doc(db, "leads", lead.id), { status: newStatus });
    } catch (err) {
      console.error("Gagal update status:", err);
      alert("Gagal update status.");
    } finally {
      setUpdating(false);
    }
  };

  const handleResiCheckChange = async (newResiCheck) => {
    if (newResiCheck === lead.resiCheck) return;
    setUpdating(true);
    try {
      await updateDoc(doc(db, "leads", lead.id), { resiCheck: newResiCheck });
    } catch (err) {
      console.error("Gagal update resiCheck:", err);
      alert("Gagal update status resi.");
    } finally {
      setUpdating(false);
    }
  };

  const statusOptions = ["pending", "complete", "cancel", "none"];
  const resiOptions = ["not", "done"];

  return (
    <>
      <div
        className="grid grid-cols-7 items-center gap-2 cursor-pointer hover:bg-gray-50 px-3 py-3 rounded-md transition text-sm shadow-sm bg-white border border-gray-200"
        onClick={() => setShowModal(true)}
      >
        <span className="text-xs text-gray-500">
          {new Date(lead.createdAt.seconds * 1000).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
          })}
        </span>

        <span className="font-medium text-gray-900">{lead.name}</span>

        <a
          href={`https://wa.me/${lead.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          {lead.whatsapp}
        </a>

        <span className="text-green-600 font-medium">{lead.paymentMethod}</span>
        <span className="text-gray-700 truncate">{lead.productTitle}</span>
        <span
          className={`capitalize font-semibold text-sm ${
            lead.status === "complete"
              ? "text-green-500"
              : lead.status === "cancel"
              ? "text-red-500"
              : "text-yellow-500"
          }`}
        >
          {lead.status}
        </span>

        <span
          className={`text-xs text-center font-semibold px-2 py-0.5 rounded-full ${
            lead.resiCheck === "done"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {lead.resiCheck === "done" ? "✅ Sudah Dicek" : "❌ Belum Dicek"}
        </span>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-xl relative text-sm text-gray-800">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-gray-400 hover:text-black text-xl"
            >
              ❌
            </button>

            <h2 className="text-lg font-semibold mb-4">📄 Detail Lead</h2>

            <div className="space-y-2">
              <p><strong>Nama:</strong> {lead.name}</p>
              <p>
                <strong>WA:</strong>{" "}
                <a
                  href={`https://wa.me/${lead.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {lead.whatsapp}
                </a>
              </p>
              <p><strong>Harga Produk:</strong> {formatHargaSingkat(lead.price)}</p>
              <p><strong>Alamat:</strong> {lead.address}</p>
              <p><strong>Metode:</strong> {lead.paymentMethod}</p>
              <p><strong>Produk:</strong> {lead.productTitle}</p>
              <p><strong>Status:</strong> <span className="capitalize font-semibold">{lead.status}</span></p>
              <p><strong>Resi Check:</strong> <span className="capitalize font-semibold">{lead.resiCheck || "not"}</span></p>
              <p className="text-xs text-gray-500">Masuk: {new Date(lead.createdAt.seconds * 1000).toLocaleString("id-ID")}</p>
            </div>

            <div className="flex flex-wrap gap-2 mt-5">
              {statusOptions.map((status) => {
                const isActive = lead.status === (status === "none" ? "" : status);
                return (
                  <button
                    key={status}
                    disabled={updating}
                    onClick={() => handleStatusChange(status === "none" ? "" : status)}
                    className={`px-3 py-1 text-xs font-bold rounded-full transition border ${
                      isActive
                        ? "bg-black text-white"
                        : "border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {status === "pending"
                      ? "🕓 Pending"
                      : status === "complete"
                      ? "✅ Complete"
                      : status === "cancel"
                      ? "❌ Cancel"
                      : "🧼 None"}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {resiOptions.map((status) => {
                const isActive = (lead.resiCheck || "not") === status;
                return (
                  <button
                    key={status}
                    disabled={updating}
                    onClick={() => handleResiCheckChange(status)}
                    className={`px-3 py-1 text-xs font-bold rounded-full transition border ${
                      isActive
                        ? "bg-black text-white"
                        : "border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {status === "done" ? "📦 Resi Dicek" : "🕓 Belum Dicek"}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between items-center mt-6">
              <div className="space-x-2">
                <button
                  onClick={handleCopy}
                  className="bg-black text-white text-xs font-semibold px-3 py-1 rounded-md hover:bg-gray-800 transition"
                >
                  {copiedId === lead.id ? "✅ Disalin!" : "📋 Salin Total"}
                </button>
                <button
                  onClick={handleCopyAddress}
                  className="bg-black text-white text-xs font-semibold px-3 py-1 rounded-md hover:bg-gray-800 transition"
                >
                  {copiedId === lead.id ? "✅ Disalin!" : "📋 Salin Alamat"}
                </button>
              </div>
              <div>
                <button
                  onClick={async () => {
                    const konfirmasi = window.confirm(
                      `Hapus data atas nama ${lead.name}?`
                    );
                    if (konfirmasi) {
                      await deleteDoc(doc(db, "leads", lead.id));
                      setShowModal(false);
                    }
                  }}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  🗑️ Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LeadRow;