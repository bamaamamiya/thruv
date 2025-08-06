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
      {/* Baris utama */}
      <div
        className="grid grid-cols-6 items-center gap-2 cursor-pointer hover:bg-white/5 px-2 py-2 rounded-md transition text-sm"
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
        <span
          className={`capitalize font-semibold ${
            lead.status === "complete"
              ? "text-green-400"
              : lead.status === "cancel"
              ? "text-red-400"
              : "text-yellow-300"
          }`}
        >
          {lead.status}
        </span>
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
              <p>
                <span className="text-gray-400">Nama:</span> {lead.name}
              </p>
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
              <p>
                <span className="text-gray-400">Alamat:</span> {lead.address}
              </p>
              <p>
                <span className="text-gray-400">Metode:</span>{" "}
                {lead.paymentMethod}
              </p>
              <p>
                <span className="text-gray-400">Produk:</span>{" "}
                {lead.productTitle}
              </p>
              <p>
                <span className="text-gray-400">Status:</span>{" "}
                <span className="capitalize font-semibold">{lead.status}</span>
              </p>
              <p>
                <span className="text-gray-400">Resi Check:</span>{" "}
                <span className="capitalize font-semibold">
                  {lead.resiCheck || "not"}
                </span>
              </p>
              <p className="text-xs text-gray-500">
                Masuk:{" "}
                {new Date(lead.createdAt.seconds * 1000).toLocaleString(
                  "id-ID"
                )}
              </p>
            </div>

            {/* Tombol Status */}
            <div className="flex flex-wrap gap-2 mt-5">
              {statusOptions.map((status) => {
                const isActive =
                  lead.status === (status === "none" ? "" : status);
                return (
                  <button
                    key={status}
                    disabled={updating}
                    onClick={() =>
                      handleStatusChange(status === "none" ? "" : status)
                    }
                    className={`px-3 py-1 text-xs font-bold rounded-full transition border-2 ${
                      isActive
                        ? "bg-white text-black"
                        : "border-white text-white hover:bg-white/10"
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

            {/* Tombol Resi Check */}
            <div className="flex flex-wrap gap-2 mt-3">
              {resiOptions.map((status) => {
                const isActive = (lead.resiCheck || "not") === status;
                return (
                  <button
                    key={status}
                    disabled={updating}
                    onClick={() => handleResiCheckChange(status)}
                    className={`px-3 py-1 text-xs font-bold rounded-full transition border-2 ${
                      isActive
                        ? "bg-white text-black"
                        : "border-white text-white hover:bg-white/10"
                    }`}
                  >
                    {status === "done" ? "📦 Resi Dicek" : "🕓 Belum Dicek"}
                  </button>
                );
              })}
            </div>

            {/* Copy dan Hapus */}
            <div className="flex justify-between items-center mt-6">
              <div className="space-x-2">
                <button
                  onClick={handleCopy}
                  className="bg-white text-black text-xs font-semibold px-3 py-1 rounded-md hover:bg-gray-200 transition"
                >
                  {copiedId === lead.id ? "✅ Disalin!" : "📋 Salin Total"}
                </button>
                <button
                  onClick={handleCopyAddress}
                  className="bg-white text-black text-xs font-semibold px-3 py-1 rounded-md hover:bg-gray-200 transition"
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
                  className="text-red-400 hover:text-red-500 text-sm flex"
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
