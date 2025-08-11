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

const LeadRowMobile = ({ lead, copiedId, setCopiedId, onSelect }) => {
  const [showModal, setShowModal] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    if (onSelect) {
      onSelect(lead, checked);
    }
  };
  // Form state for editing
  const [formData, setFormData] = useState({
    costProduct: lead.costProduct || "",
    price: lead.price || "",
    status: lead.status || "",
    resiCheck: lead.resiCheck || "not",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCopyAddress = () => {
    const prompt = `[PROVINSI], [KABUPATEN/KOTA], [KECAMATAN], [DESA/KELURAHAN] dan rapikan alamat lengkap, dan kelurahan/desa terpisah.\n\nAlamat mentah: ${lead.address}`;
    navigator.clipboard.writeText(prompt).then(() => {
      setCopiedId(lead.id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleCopyOrder = () => {
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

  const handleSave = async () => {
    if (!formData.price || !formData.costProduct) {
      alert("Harga dan biaya produk tidak boleh kosong.");
      return;
    }
    setUpdating(true);
    try {
      await updateDoc(doc(db, "leads", lead.id), {
        price: Number(formData.price),
        costProduct: Number(formData.costProduct),
        status: formData.status,
        resiCheck: formData.resiCheck,
      });
      setShowModal(false);
    } catch (err) {
      console.error("Gagal update:", err);
      alert("Gagal menyimpan data.");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Hapus data atas nama ${lead.name}?`)) {
      await deleteDoc(doc(db, "leads", lead.id));
      setShowModal(false);
    }
  };

  const statusOptions = [
    { value: "", label: "🧼 None" },
    { value: "pending", label: "🕓 Pending" },
    { value: "complete", label: "✅ Complete" },
    { value: "cancel", label: "❌ Cancel" },
  ];
  const resiOptions = [
    { value: "not", label: "🕓 Belum Dicek" },
    { value: "done", label: "📦 Resi Dicek" },
  ];

  return (
    <>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        className="scale-125"
      />
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
                <span className="text-gray-500">Alamat:</span> {lead.address}
              </p>
              <p>
                <span className="text-gray-500">Produk:</span>{" "}
                {lead.productTitle}
              </p>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-gray-500 text-xs mb-1">
                  Harga:
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                  className="border rounded px-2 py-2 text-sm w-full"
                />
              </div>
              <div>
                <label className="block text-gray-500 text-xs mb-1">
                  Cost Product:
                </label>
                <input
                  type="number"
                  value={formData.costProduct}
                  onChange={(e) => handleChange("costProduct", e.target.value)}
                  className="border rounded px-2 py-2 text-sm w-full"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {statusOptions.map((s) => (
                  <button
                    key={s.value}
                    disabled={updating}
                    onClick={() => handleChange("status", s.value)}
                    className={`px-3 py-1 text-xs font-bold rounded-full border ${
                      formData.status === s.value
                        ? "bg-black text-white"
                        : "border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {resiOptions.map((r) => (
                  <button
                    key={r.value}
                    disabled={updating}
                    onClick={() => handleChange("resiCheck", r.value)}
                    className={`px-3 py-1 text-xs font-bold rounded-full border ${
                      formData.resiCheck === r.value
                        ? "bg-black text-white"
                        : "border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>

              <button
                onClick={handleSave}
                disabled={updating}
                className="w-full bg-black text-white text-xs font-semibold px-3 py-2 rounded-md hover:bg-gray-800 transition"
              >
                {updating ? "⏳ Menyimpan..." : "💾 Simpan Perubahan"}
              </button>

              <div className="flex justify-between items-center mt-4">
                <div className="space-x-2">
                  <button
                    onClick={handleCopyOrder}
                    className="bg-black text-white text-xs font-semibold px-3 py-1 rounded-md hover:bg-gray-800"
                  >
                    {copiedId === lead.id ? "✅ Disalin!" : "📋 Salin Total"}
                  </button>
                  <button
                    onClick={handleCopyAddress}
                    className="bg-black text-white text-xs font-semibold px-3 py-1 rounded-md hover:bg-gray-800"
                  >
                    {copiedId === lead.id ? "✅ Disalin!" : "📋 Salin Alamat"}
                  </button>
                </div>
                <button
                  onClick={handleDelete}
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
