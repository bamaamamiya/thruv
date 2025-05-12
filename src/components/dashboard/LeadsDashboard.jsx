import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase"; // pastikan path-nya benar

const LeadsDashboard = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLeads(data);
    });

    return () => unsubscribe(); // cleanup listener
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">📋 Data Leads WhatsApp</h1>

      {leads.length === 0 ? (
        <p>Belum ada data leads masuk.</p>
      ) : (
        <div className="space-y-4">
          {leads.map((lead, i) => (
            <div
              key={lead.id}
              className="p-4 border rounded-xl shadow-sm bg-white"
            >
              <p>
                <strong>Nama:</strong> {lead.name}
              </p>
              <p>
                <strong>No. WhatsApp:</strong>{" "}
                <a
                  href={`https://wa.me/${lead.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {lead.whatsapp}
                </a>
              </p>
              <p>
                <strong>Alamat:</strong> <br /> {lead.address}
              </p>
              <p>
                <strong>Metode Bayar:</strong> {lead.paymentMethod}
              </p>
              <p>
                <strong>Produk:</strong> {lead.productTitle}
              </p>
              <p className="text-sm text-gray-500">
                Masuk: {new Date(lead.createdAt.seconds * 1000).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeadsDashboard;
