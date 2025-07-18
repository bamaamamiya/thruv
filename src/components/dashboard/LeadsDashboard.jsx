import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase";

import LeadRow from "./LeadRow";
import LeadRowMobile from "./LeadRowMobile";

const LeadsDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [copiedId, setCopiedId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Semua"); // ⬅️ State filter status

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

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔍 Filter leads berdasarkan status
  const filteredLeads =
    selectedStatus === "Semua"
      ? leads
      : leads.filter((lead) => lead.status === selectedStatus);

  // ✅ Daftar status yang bisa dipilih
  const statusOptions = ["Semua", "Pending", "complete", "cancel"];

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">📦 Order Masuk</h1>

        {/* Dropdown Filter */}
        <div className="mb-6 text-center">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-zinc-800 text-white px-4 py-2 rounded-lg border border-zinc-700 capitalize"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {!isMobile && (
          <div className="grid grid-cols-6 border-b border-white/10 py-3 text-sm font-semibold text-gray-400">
            <span>Tgl</span>
            <span>Nama</span>
            <span>WA</span>
            <span>Metode</span>
            <span>Produk</span>
            <span>Status</span>
          </div>
        )}

        <div className="divide-y divide-white/5">
          {filteredLeads.map((lead, index) => {
            const currentMonth = new Date(
              lead.createdAt.seconds * 1000
            ).toLocaleString("id-ID", {
              month: "long",
              year: "numeric",
            });

            const prevLead = filteredLeads[index - 1];
            const prevMonth =
              prevLead &&
              new Date(prevLead.createdAt.seconds * 1000).toLocaleString("id-ID", {
                month: "long",
                year: "numeric",
              });

            const showMonth = index === 0 || currentMonth !== prevMonth;

            return (
              <React.Fragment key={lead.id}>
                {showMonth && (
                  <div className="text-center text-sm font-semibold text-gray-300 bg-zinc-800 rounded-lg">
                    📅 {currentMonth}
                  </div>
                )}
                {isMobile ? (
                  <LeadRowMobile
                    lead={lead}
                    copiedId={copiedId}
                    setCopiedId={setCopiedId}
                  />
                ) : (
                  <LeadRow
                    lead={lead}
                    copiedId={copiedId}
                    setCopiedId={setCopiedId}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LeadsDashboard;
