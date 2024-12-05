import React from "react";

const ProductFeatures = () => {
  return (
    <div className="container p-2">
      {/* Title Section */}
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Keunggulan ThruvClean Mini
      </h2>

      {/* Features List */}
      <div className="space-y-6">
        {/* Feature 1: Tangan Tetap Bersih */}
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            {/* Checkmark Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              Tangan Tetap Bersih
            </h3>
            <p className="text-gray-600">
              Tidak perlu khawatir tangan terkena kotoran atau air. ThruvClean
              Mini menjaga kebersihan tangan Anda saat membersihkan permukaan.
            </p>
          </div>
        </div>

        {/* Feature 2: Praktis dan Mudah Digunakan */}
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            {/* Checkmark Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              Praktis dan Mudah Digunakan
            </h3>
            <p className="text-gray-600">
              Hanya dengan satu gerakan sederhana, meja Anda akan bersih. Proses
              pembersihan jadi lebih cepat dan efisien.
            </p>
          </div>
        </div>

        {/* Feature 3: Hemat Waktu dan Tenaga */}
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            {/* Checkmark Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              Hemat Waktu dan Tenaga
            </h3>
            <p className="text-gray-600">
              Tidak perlu lagi mencuci kain lap atau mengganti alat pembersih.
              Hemat waktu dan tenaga dalam rutinitas harian Anda.
            </p>
          </div>
        </div>

        {/* Feature 4: Desain Ergonomis */}
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            {/* Checkmark Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              Desain Ergonomis
            </h3>
            <p className="text-gray-600">
              ThruvClean Mini dirancang dengan pegangan nyaman yang pas di
              tangan, cocok untuk digunakan di berbagai jenis meja dan
              permukaan.
            </p>
          </div>
        </div>

        {/* Feature 5: Multifungsi dan Ramah Lingkungan */}
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            {/* Checkmark Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              Multifungsi dan Ramah Lingkungan
            </h3>
            <p className="text-gray-600">
              Tidak hanya untuk meja, ThruvClean Mini juga bisa digunakan untuk
              membersihkan berbagai permukaan seperti kaca dan plastik, serta
              mengurangi penggunaan kain lap sekali pakai yang tidak ramah
              lingkungan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFeatures;
