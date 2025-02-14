export const sendConversion = async (event_name, data) => {
    await fetch("shop-production-d5d0.up.railway.app", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event_name, ...data }),
    });
  };
  