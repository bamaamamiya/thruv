"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../../firebase";
import OrderMachine from "../OrderMachineNew";

const ManualOrder = () => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(data);
      } catch (error) {
        console.error("Gagal mengambil products:", error);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (!productId.trim()) {
      setSelectedProduct(null);
      return;
    }

    const found = products.find(
      (product) =>
        product.id.toLowerCase() === productId.trim().toLowerCase()
    );

    setSelectedProduct(found || null);
  }, [productId, products]);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto max-w-md">

        {/* PRODUCT SELECTOR */}
        <div className="mb-5 rounded-2xl bg-white p-5 shadow-sm">

          <h1 className="mb-1 text-xl font-bold">
            Manual Order
          </h1>

          <p className="mb-5 text-sm text-gray-500">
            Pilih Product ID yang ingin digunakan untuk order.
          </p>

          <label className="mb-2 block text-sm font-semibold">
            Product ID
          </label>

          <input
            list="product-list"
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            placeholder="Ketik atau pilih Product ID"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-redto focus:ring-2 focus:ring-redto/20"
          />

          <datalist id="product-list">
            {products.map((product) => (
              <option
                key={product.id}
                value={product.id}
              >
                {product.title}
              </option>
            ))}
          </datalist>

          {loadingProducts && (
            <p className="mt-2 text-xs text-gray-400">
              Memuat produk...
            </p>
          )}

          {productId && !selectedProduct && !loadingProducts && (
            <p className="mt-2 text-xs font-medium text-red-500">
              Product ID tidak ditemukan.
            </p>
          )}

          {/* PRODUCT PREVIEW */}
          {selectedProduct && (
            <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-4">
              <p className="text-xs font-medium text-green-600">
                PRODUK TERPILIH
              </p>

              <p className="mt-1 font-bold text-gray-900">
                {selectedProduct.title}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                ID: {selectedProduct.id}
              </p>

              <p className="mt-2 font-bold text-gray-900">
                Rp{" "}
                {(
                  selectedProduct.pricing?.price || 0
                ).toLocaleString("id-ID")}
              </p>
            </div>
          )}
        </div>

        {/* ORDER FORM */}
        {selectedProduct && (
          <OrderMachine
            product={selectedProduct}
            pixel=""
            discountTransfer={false}
            useOngkir={true}
          />
        )}

      </div>
    </div>
  );
};

export default ManualOrder;