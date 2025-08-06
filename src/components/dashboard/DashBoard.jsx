// dahsboard/dashboard.jsx
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

  const handleLogout = () => {_
    const auth = getAuth();
    signOut(auth);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-xl transition duration-200"
          >
            Logout
          </button>
        </div>

        <div>
          {leads.length === 0 ? (
            <p className="text-gray-500 text-center">Belum ada data masuk.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-200 text-gray-700 text-left">
                    <th className="p-3 border-b">Nama</th>
                    <th className="p-3 border-b">WhatsApp</th>
                    <th className="p-3 border-b">Alamat</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50">
                      <td className="p-3 border-b">{lead.name}</td>
                      <td className="p-3 border-b">{lead.whatsapp}</td>
                      <td className="p-3 border-b">{lead.address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
