import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Popup() {
  const [showPopup, setShowPopup] = useState(false);
  const [phone, setPhone] = useState("");

  // Timer untuk menampilkan pop-up setelah 20 detik
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 3000); // 20 detik

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedPhone = `'${phone}`; // Tambahin petik biar gak ilang 0
    try {
      const response = await fetch("https://sheetdb.io/api/v1/3rkzb46uv8cuf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: [{ phone: formattedPhone }] }),
      });

      if (response.ok) {
        alert(`Nomor HP ${phone} berhasil didaftarkan! 🎉`);
        setShowPopup(false); // Langsung ilang popup tanpa delay
      } else {
        alert("Gagal mendaftarkan nomor!");
      }
    } catch (error) {
      alert("Terjadi kesalahan, coba lagi!");
    }
  };

  return (
    <>
      {/* Background overlay saat popup muncul */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 m-2 rounded-xl shadow-lg w-96 text-center"
          >
            <h2 className="text-2xl font-bold mb-4">🔥Dapatkan Diskon</h2>
            <h2 className="text-5xl font-bold mb-4">Penawaran Rahasia!</h2>
            <p className="text-gray-600 mb-4 text-sm">
              Masukkan nomor WhatsApp Anda untuk menerima diskon eksklusif +
              update promo sebelum orang lain tahu!
            </p>

            <form onSubmit={handleSubmit}>
              <input
                type="tel"
                placeholder="Masukkan nomor HP..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 mb-4"
                required
              />
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-800"
              >
                Kirim Sekarang
              </button>
            </form>

            <button
              className="text-gray-500 mt-4 text-sm hover:underline"
              onClick={() => setShowPopup(false)}
            >
              Tidak, Terima Kasih
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
}
