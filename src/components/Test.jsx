import { useState } from "react";
import axios from "axios";

function Test() {
  const [loading, setLoading] = useState(false);
  const sendConversion = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/conversion", {
        event_name: "Purchase",
        email: "email@example.com",
        value: 157000,
      });
      console.log("Conversion sent:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Beli Sekarang</h1>
      <button onClick={sendConversion} disabled={loading}>
        {loading ? "Loading..." : "Beli Sekarang"}
      </button>
    </div>
  );
}

export default Test;
