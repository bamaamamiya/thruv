// Dashboard.jsx
import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";

const Dashboard = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const fetchLeads = async () => {
      const db = getFirestore();
      const snapshot = await getDocs(collection(db, "leads"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setLeads(data);
    };
    fetchLeads();
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth);
    window.location.reload();
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>
      <div>
        {leads.length === 0 ? (
          <p>Belum ada data masuk.</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Nama</th>
                <th className="p-2 border">WhatsApp</th>
                <th className="p-2 border">Alamat</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td className="p-2 border">{lead.name}</td>
                  <td className="p-2 border">{lead.whatsapp}</td>
                  <td className="p-2 border">{lead.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
