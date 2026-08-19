import React, { useState, useRef } from "react";
import { setDoc, doc, Timestamp, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { validateOrderInput } from "../lib/order/validation";
import { calculateOrderTotal, createOrderId } from "../lib/order/orderHelpers";
import { createOrder } from "../lib/order/createOrder";
import { trackInitiateCheckout, trackPurchase } from "../lib/order/tracking";
const OrderMachine = ({
  pixel,
  product,
  adminWA = "6282387881505",
  discountTransfer,
  buttonColor = "bg-redto",
  buttonHoverColor = "hover:bg-red-700",
  useOngkir = true,
}) => {
  console.log("========== ORDER MACHINE ==========");
  console.log("Pixel:", pixel);

  if (!product) {
    return <div>Loading...</div>;
  }

  const settings = React.useMemo(
    () => ({
      checkout: {
        cod: true,
        bankTransfer: true,
        ongkir: true,
        bundle: true,
        ...(product?.settings?.checkout || {}),
      },

      automation: {
        aiAgent: false,
        reminder: false,
        faq: false,
        followUp: false,
        upsell: false,
        ...(product?.settings?.automation || {}),
      },
    }),
    [product],
  );

  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(
    settings.checkout.cod ? "COD" : "Bank Transfer",
  );
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const nameInputRef = useRef(null);
  const whatsappInputRef = useRef(null);
  const addressInputRef = useRef(null);
  const debounceRef = useRef(null);
  const [selectedBundle, setSelectedBundle] = useState(
    product?.bundles?.length ? product.bundles[0] : null,
  );

  // === Helper ===

  const paymentMethods = React.useMemo(() => {
    const methods = [];

    if (settings.checkout.cod) {
      methods.push("COD");
    }

    if (settings.checkout.bankTransfer) {
      methods.push("Bank Transfer");
    }

    return methods;
  }, [settings.checkout.cod, settings.checkout.bankTransfer]);

  const cleanAndValidateWA = (wa) => {
    let cleaned = wa.replace(/\D/g, "");
    if (cleaned.startsWith("0")) cleaned = "62" + cleaned.slice(1);
    if (!cleaned.startsWith("62")) cleaned = "62" + cleaned;
    return /^62[0-9]{9,14}$/.test(cleaned) ? cleaned : null;
  };

  // === Save Abandoned Lead with Merge ===
  const saveAbandonedLead = (nameInput, waInput, addressInput) => {
  if (debounceRef.current) {
    clearTimeout(debounceRef.current);
  }

  debounceRef.current = setTimeout(async () => {
    if (!nameInput || nameInput.trim().length < 3) return;

    const cleanedWA = cleanAndValidateWA(waInput);

    if (!cleanedWA || !product?.id) return;

    const docId = `${cleanedWA}_${product.id}`;
    const docRef = doc(db, "abandonedLeads", docId);

    try {
      const snapshot = await getDoc(docRef);

      // Kalau lead sudah converted, jangan balikin ke abandoned
      if (snapshot.exists() && snapshot.data()?.status === "converted") {
        console.log("Lead sudah converted, skip abandoned update");
        return;
      }

      await setDoc(
        docRef,
        {
          name: nameInput.trim(),
          whatsapp: cleanedWA,
          address: addressInput?.trim() || "",
          productId: product.id,
          productTitle: product.title || "unknown",
          status: "abandoned",
          updatedAt: Timestamp.now(),
        },
        { merge: true },
      );

      console.log("✅ Abandoned lead saved:", cleanedWA);
    } catch (err) {
      console.error("❌ Gagal simpan abandoned lead:", err);
    }
  }, 1500);
};
  const saveLeadImmediately = async ({ nameInput, waInput, addressInput }) => {
    if (!nameInput || nameInput.trim().length < 3) return;

    const cleanedWA = cleanAndValidateWA(waInput);

    if (!cleanedWA || !product?.id) return;

    const docId = `${cleanedWA}_${product.id}`;

    const docRef = doc(db, "abandonedLeads", docId);

    try {
      await setDoc(
        docRef,
        {
          name: nameInput.trim(),
          whatsapp: cleanedWA,
          address: addressInput?.trim() || "",
          productId: product.id,
          productTitle: product.title || "unknown",
          status: "abandoned",
          updatedAt: Timestamp.now(),
        },
        { merge: true },
      );

      console.log("✅ Lead saved immediately:", cleanedWA);
    } catch (err) {
      console.error("❌ Failed saving lead:", err);
    }
  };

  const markLeadAsConverted = async (waInput) => {
    const cleanedWA = cleanAndValidateWA(waInput);

    if (!cleanedWA || !product?.id) return;

    const docId = `${cleanedWA}_${product.id}`;
    const docRef = doc(db, "abandonedLeads", docId);

    try {
      await setDoc(
        docRef,
        {
          status: "converted",
          convertedAt: Timestamp.now(),
        },
        { merge: true },
      );

      console.log("✅ Abandoned lead → converted:", cleanedWA);
    } catch (err) {
      console.error("❌ Gagal update abandoned lead:", err);
    }
  };

  const sendOrderEmail = async (data) => {
    try {
      const res = await fetch(
        "https://order-alert-six.vercel.app/api/send-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            whatsapp: data.whatsapp,
            address: data.address,
            product_title: data.productTitle,
            price: data.price,
            total: data.total,
            payment_method: data.paymentMethod,
            order_date: data.order_date,
          }),
        },
      );

      if (!res.ok) {
        throw new Error("Gagal kirim email");
      }

      console.log("Email order berhasil dikirim!");
    } catch (err) {
      console.error("Error kirim email:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      // ==========================================
      // 1. VALIDATE CUSTOMER
      // ==========================================

      const validation = validateOrderInput({
        name,
        whatsapp,
        address,
        checkout: settings.checkout,
      });

      if (!validation.valid) {
        setErrors({
          [validation.field]: validation.reason,
        });

        const refs = {
          name: nameInputRef,
          whatsapp: whatsappInputRef,
          address: addressInputRef,
        };

        const targetRef = refs[validation.field];

        targetRef?.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        setTimeout(() => {
          targetRef?.current?.focus();
        }, 300);

        return;
      }

      const { cleanedWA, addressCleaned, provinceName } = validation;

      // ==========================================
      // SAVE LEAD
      // ==========================================

      await saveLeadImmediately({
        nameInput: name,
        waInput: whatsapp,
        addressInput: address,
      });

      // ==========================================
      // 2. CALCULATE PRICING
      // ==========================================

      const pricing = calculateOrderTotal({
        product,
        checkout: settings.checkout,
        selectedBundle,
        provinceName,
      });

      // ==========================================
      // 3. CREATE ORDER
      // ==========================================

      const orderId = createOrderId(cleanedWA, product.id);

      await createOrder({
        orderId,

        customer: {
          name,
          whatsapp: cleanedWA,
          address: addressCleaned,
        },

        product,

        selectedBundle,

        pricing,

        paymentMethod,

        checkout: settings.checkout,

        automation: settings.automation,

        provinceName,
      });

      // ==========================================
      // 3.5 MARK ABANDONED LEAD AS CONVERTED
      // ==========================================

      await markLeadAsConverted(cleanedWA);

      // ==========================================
      // 4. META — INITIATE CHECKOUT
      // ==========================================

      await trackInitiateCheckout({
        pixel,
        product,
        price: pricing.total,
        quantity: selectedBundle?.quantity || 1,
      });

      // ==========================================
      // 5. PURCHASE
      // ==========================================

      await trackPurchase({
        pixel,
        product,
        price: pricing.total,
        whatsapp: cleanedWA,
        quantity: selectedBundle?.quantity || 1,
      });

      // ==========================================
      // 6. EMAIL
      // ==========================================

      await sendOrderEmail({
        name,
        whatsapp: cleanedWA,
        address,
        productTitle: product.title,
        bundle: selectedBundle?.title || "Default",
        quantity: selectedBundle?.quantity || 1,
        productId: product.id || "unknown",
        price: pricing.price,
        total: pricing.total,
        paymentMethod,
        order_date: new Date().toLocaleString("id-ID"),
      });

      // ==========================================
      // 7. WHATSAPP
      // ==========================================

      const message =
        `PESANAN BARU\n\n` +
        `Produk: ${product.title}\n` +
        `Nama: ${name}\n` +
        `Metode Pembayaran: ${paymentMethod}\n\n` +
        `Mohon segera diproses, terima kasih`;

      const whatsappURL =
        `https://api.whatsapp.com/send?phone=${adminWA}` +
        `&text=${encodeURIComponent(message)}`;

      window.location.href = whatsappURL;
    } catch (err) {
      console.error("Gagal proses order:", err);

      alert("Terjadi kesalahan saat menyimpan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
      {settings.checkout.bundle && product?.bundles?.length > 0 && (
        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-3">Pilih Paket</h2>

          <ProductBundles
            bundles={product.bundles}
            selectedBundle={selectedBundle}
            setSelectedBundle={setSelectedBundle}
          />
        </div>
      )}

      <h2 className="text-xl font-bold mb-4">Data Penerima:</h2>

      <form onSubmit={handleSubmit}>
        {/* Nama */}
        <div className="mb-4">
          <input
            ref={nameInputRef}
            type="text"
            placeholder="Nama Anda"
            value={name}
            onChange={(e) => {
              setName(e.target.value);

              if (errors.name) {
                setErrors((prev) => {
                  const next = { ...prev };
                  delete next.name;
                  return next;
                });
              }

              saveAbandonedLead(e.target.value, whatsapp, address);
            }}
            className="
  w-full
  rounded-xl
  border border-gray-200
  bg-white
  px-4 py-3
  text-sm text-gray-900
  placeholder:text-gray-400
  shadow-sm
  outline-none
  transition-all duration-200
  hover:border-gray-300
  focus:border-redto
  focus:ring-2
  focus:ring-redto/20
"
          />
          {errors.name && (
            <p className="mt-1.5 text-xs font-medium text-red-500">
              {errors.name}
            </p>
          )}
        </div>

        {/* WhatsApp */}
        <div className="mb-4">
          <input
            ref={whatsappInputRef}
            type="text"
            placeholder="Masukkan No. WhatsApp Aktif"
            value={whatsapp}
            onChange={(e) => {
              const wa = e.target.value.replace(/\D/g, "");

              setWhatsapp(wa);

              if (errors.whatsapp) {
                setErrors((prev) => {
                  const next = { ...prev };
                  delete next.whatsapp;
                  return next;
                });
              }

              saveAbandonedLead(name, wa, address);
            }}
            className="
    w-full
    rounded-xl
    border border-gray-200
    bg-white
    px-4 py-3
    text-sm text-gray-900
    placeholder:text-gray-400
    shadow-sm
    outline-none
    transition-all duration-200
    hover:border-gray-300
    focus:border-redto
    focus:ring-2
    focus:ring-redto/20
  "
          />
          {errors.whatsapp && (
            <p className="mt-1.5 text-xs font-medium text-red-500">
              {errors.whatsapp}
            </p>
          )}
        </div>

        {/* Alamat */}
        <div className="mb-4">
          <label className="block font-bold mb-1">Alamat Lengkap :</label>
          <textarea
            ref={addressInputRef}
            placeholder="Masukkan Nomor Rumah, RT/RW, Kecamatan, Kota/Kab, Ciri2 Rumah"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);

              if (errors.address) {
                setErrors((prev) => {
                  const next = { ...prev };
                  delete next.address;
                  return next;
                });
              }

              saveAbandonedLead(name, whatsapp, e.target.value);
            }}
            rows={4}
            className="
      w-full
      resize-none
      rounded-xl
      border border-gray-200
      bg-white
      px-4 py-3
      text-sm text-gray-900
      placeholder:text-gray-400
      shadow-sm
      outline-none
      transition-all duration-200
      hover:border-gray-300
      focus:border-redto
      focus:ring-2
      focus:ring-redto/20
    "
          />
          {errors.address && (
            <p className="mt-1.5 text-xs font-medium text-red-500">
              {errors.address}
            </p>
          )}
        </div>

        {/* Payment Method */}
        <div className="mb-4">
          <label className="block font-bold mb-1">Metode Pembayaran :</label>
          {paymentMethods.map((method) => (
            <div
              key={method}
              onClick={() => setPaymentMethod(method)}
              className={`
    relative
    mb-3
    flex
    cursor-pointer
    items-center
    gap-4
    rounded-xl
    border
    p-4
    transition-all
    duration-200
    ${
      paymentMethod === method
        ? "border-redto bg-redto/5 ring-2 ring-redto/10"
        : "border-gray-200 bg-white hover:border-gray-300"
    }
  `}
            >
              <input
                type="radio"
                name="payment"
                value={method}
                checked={paymentMethod === method}
                onChange={() => setPaymentMethod(method)}
                className="
    h-4
    w-4
    accent-redto
    focus:ring-2
    focus:ring-redto/20
  "
              />
              <label className="grid items-center relative cursor-pointer">
                <img
                  src={`/images/funnel/${
                    method === "COD" ? "cod" : "transfer"
                  }.webp`}
                  alt={method}
                  className="w-12 h-12 object-contain"
                />
                <span className="font-medium -mt-2">
                  {method === "COD" ? "Bayar di Tempat" : "Bank Transfer"}
                </span>
                {method === "Bank Transfer" && discountTransfer && (
                  <span className="inline-block bg-redto/10 text-redto text-[11px] font-bold px-3 py-0.5 rounded-md shadow-sm border border-redto/70 capitalize tracking-wide">
                    Potongan ONGKIR 10RB !!!
                  </span>
                )}
              </label>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`
  w-full
  rounded-xl
  px-4
  py-3.5
  text-lg
  font-bold
  text-white
  shadow-sm
  transition-all
  duration-200
  focus:outline-none
  focus:ring-2
  focus:ring-redto/30
  focus:ring-offset-2
  ${
    loading
      ? "cursor-not-allowed bg-gray-400"
      : `${buttonColor} ${buttonHoverColor} hover:shadow-md active:scale-[0.98]`
  }
`}
        >
          {/* {loading ? "Memproses..." : "Ambil Promo & Lanjut Ke WA ADMIN"} */}
          {loading ? "Memproses..." : "Ambil Promo di WhatsApp"}
        </button>
      </form>
      <p className="text-center text-xs p-2 italic font-semibold text-gray-700">
        Mohon isi data hanya jika siap dihubungi hari ini & menerima pengiriman.
      </p>
    </div>
  );
};

export default OrderMachine;
