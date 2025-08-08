// dashboard/LeadRowMobile.jsx
import { useState } from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const formatHargaSingkat = (harga) => {
  if (!harga) return "-";
  if (harga >= 1_000_000)
    return (harga / 1_000_000).toFixed(1).replace(".0", "") + "jt";
  return (harga / 1000).toFixed(0) + "rb";
};

const LeadRowMobile = ({ lead, copiedId, setCopiedId }) => {
  const [showModal, setShowModal] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [costProductValue, setCostProductValue] = useState(
    lead.costProduct || ""
  );
  const [priceValue, setPriceValue] = useState(lead.price || "");
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

  // Gabungkan semua logika update ke dalam satu fungsi
  const handleUpdateAll = async () => {
    // Ambil nilai dari state, misalnya costProductValue dan priceValue
    // Anda harus memastikan state ini selalu merefleksikan nilai di input
    if (
      costProductValue === "" ||
      isNaN(costProductValue) ||
      priceValue === "" ||
      isNaN(priceValue)
    ) {
      alert("Harga dan biaya produk tidak boleh kosong dan harus angka.");
      return;
    }

    setUpdating(true);
    try {
      // Buat satu objek data untuk diupdate
      const updatedData = {
        costProduct: Number(costProductValue),
        price: Number(priceValue),
      };

      // Kirim satu kali update ke Firestore
      await updateDoc(doc(db, "leads", lead.id), updatedData);
    } catch (err) {
      console.error("Gagal update data:", err);
      alert("Gagal update data.");
    } finally {
      setUpdating(false);
    }
  };

  const statusOptions = ["pending", "complete", "cancel", "none"];
  const resiOptions = ["not", "done"];

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="bg-white rounded-xl p-4 mb-4 shadow-sm hover:ring ring-gray-200 transition cursor-pointer"
      >
        <div className="flex justify-between text-sm mb-2 text-gray-400">
          <span>
            {new Date(lead.createdAt.seconds * 1000).toLocaleDateString(
              "id-ID",
              {
                day: "2-digit",
                month: "short",
              }
            )}
          </span>
          <span className="text-emerald-500 font-medium">
            {lead.paymentMethod}
          </span>
        </div>
        <div className="text-gray-800 font-semibold text-base">{lead.name}</div>
        <div className="text-blue-600 text-sm mb-1">{lead.whatsapp}</div>
        <span
          className={`text-sm font-medium capitalize rounded px-2 py-0.5 inline-block mt-1 ${
            lead.status === "complete"
              ? "bg-green-100 text-green-700"
              : lead.status === "cancel"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {lead.status || "None"}
        </span>
        <div className="text-sm text-gray-700 mt-1">{lead.productTitle}</div>
        <div className="flex justify-between text-sm mt-1">
          <span className="text-gray-500">Resi:</span>
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              lead.resiCheck === "done"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {lead.resiCheck === "done" ? "✅ Dicek" : "❌ Belum"}
          </span>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-xl relative text-sm text-gray-800">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-xl"
            >
              ❌
            </button>

            <h2 className="text-xl font-semibold mb-4">📄 Detail Order</h2>

            <div className="space-y-2">
              <p>
                <span className="text-gray-500">Nama:</span> {lead.name}
              </p>
              <p>
                <span className="text-gray-500">WA:</span>{" "}
                <a
                  href={`https://wa.me/${lead.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {lead.whatsapp}
                </a>
              </p>
              <p>
                <span className="text-gray-500">Harga:</span>{" "}
                {formatHargaSingkat(lead.price)}
              </p>
              <div className="mt-4">
                <label className="block text-gray-500 text-xs mb-1">
                  Harga:
                </label>
                <input
                  type="number"
                  value={priceValue}
                  onChange={(e) => setPriceValue(e.target.value)}
                  className="border rounded px-2 py-1 text-sm w-full"
                  placeholder="Masukkan harga terbaru"
                />
              </div>
              <p>
                <span className="text-gray-500">Alamat:</span> {lead.address}
              </p>
              <p>
                <span className="text-gray-500">Metode:</span>{" "}
                {lead.paymentMethod}
              </p>
              <p>
                <span className="text-gray-500">Produk:</span>{" "}
                {lead.productTitle}
              </p>
              <p>
                <span className="text-gray-500">Status:</span>{" "}
                <span className="capitalize font-semibold">{lead.status}</span>
              </p>
              <p>
                <span className="text-gray-500">Resi Check:</span>{" "}
                <span className="capitalize font-semibold">
                  {lead.resiCheck || "not"}
                </span>
              </p>
              <p className="text-xs text-gray-400">
                Masuk:{" "}
                {new Date(lead.createdAt.seconds * 1000).toLocaleString(
                  "id-ID"
                )}
              </p>
            </div>

            {/* Input Cost Product */}
            <div className="mt-4">
              <label className="block text-gray-500 text-xs mb-1">
                Cost Product:
              </label>
              <input
                type="number"
                value={costProductValue}
                onChange={(e) => setCostProductValue(e.target.value)}
                className="border rounded px-2 py-1 text-sm w-full"
                placeholder="Masukkan cost product"
              />
            </div>

            <button
              onClick={handleUpdateAll}
              disabled={updating}
              className="bg-black text-white text-xs font-semibold px-3 py-1 rounded-md hover:bg-gray-800 transition mt-2"
            >
              {updating ? "⏳ Updating..." : "💾 Simpan Update Terbaru"}
            </button>
            {/* Status Buttons */}
            <div className="flex flex-wrap gap-2 mt-4">
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

            {/* Resi Check Buttons */}
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

            {/* Copy & Delete */}
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
                  className="text-red-500 hover:text-red-600 text-sm flex"
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

export default LeadRowMobile;
