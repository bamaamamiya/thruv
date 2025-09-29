import { useEffect, useState } from "react";

const names = [
  "Arul", "Budi", "Citra", "Dewi", "Eka", "Fajar", "Gilang", "Hana", "Indra", "Joko",
  "Kiki", "Lia", "Maya", "Nando", "Oki", "Putri", "Rian", "Sari", "Tono", "Vina",
];

const cities = [
  "Jakarta", "Bandung", "Surabaya", "Medan", "Yogyakarta", "Semarang", "Palembang",
  "Makassar", "Denpasar", "Malang",
];

export default function FakeNotif({ funnelProduct }) {
  const [notif, setNotif] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      setNotif(`${randomName} dari ${randomCity}, baru saja memesan ${funnelProduct.title}`);

      // Auto-hide notifikasi setelah 5 detik
      setTimeout(() => setNotif(null), 5000);
    }, 8000); // setiap 8 detik muncul notif baru

    return () => clearInterval(interval);
  }, [funnelProduct.title]);

  return (
    <div className="fixed top-0 m-4 left-5 z-50">
      {notif && (
        <div className="bg-white shadow-lg rounded-2xl px-4 py-2 border border-gray-200 animate-bounce text-4xl">
          <p className="text-sm text-gray-800">{notif}</p>
        </div>
      )}
    </div>
  );
}