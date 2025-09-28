import React from "react";

// Komponen Testimoni
function Testimoni({ testimonials }) {
  return (
    <section className="px-6 py-10 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Testimoni</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="border rounded-xl p-4 bg-white shadow-sm"
          >
            {/* Profile */}
            <div className="flex items-center gap-3 mb-3">
              <img
                src={t.profile}
                alt={t.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <p className="font-semibold">{t.name}</p>
            </div>

            {/* Stars */}
            <p className="mb-2">{t.stars}</p>

            {/* Review */}
            <p className="text-gray-700 mb-3">{t.review}</p>

            {/* Foto produk */}
            {t.image && (
              <img
                src={t.image}
                alt="Foto Produk"
                className="rounded-lg shadow-sm w-full"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimoni;
