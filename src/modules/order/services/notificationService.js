// services/notificationService.js
export const sendOrderEmail = async (data) => {
  await fetch("https://order-alert-six.vercel.app/api/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

export const redirectToWhatsApp = (adminWA, message) => {
  const url = `https://api.whatsapp.com/send?phone=${adminWA}&text=${encodeURIComponent(message)}`;
  window.location.href = url;
};