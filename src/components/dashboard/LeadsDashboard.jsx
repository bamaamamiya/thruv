import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";

import LeadRow from "./LeadRow";

const LeadsDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [copiedId, setCopiedId] = useState(null); // untuk notifikasi salin

  useEffect(() => {
    const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLeads(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">📦 Order Masuk</h1>

        {/* Header */}
        <div className="grid grid-cols-5 border-b border-white/10 py-3 text-sm font-semibold text-gray-400">
          <span>Tgl</span>
          <span>Nama</span>
          <span>WA</span>
          <span>Metode</span>
          <span>Produk</span>
        </div>

        {/* Leads list */}
        <div className="divide-y divide-white/5">
          {leads.map((lead) => (
            <LeadRow
              key={lead.id}
              lead={lead}
              copiedId={copiedId}
              setCopiedId={setCopiedId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeadsDashboard;
