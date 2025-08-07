// dashboard/leadDashboard.jsx
import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";

import LeadRow from "./LeadRow";
import LeadRowMobile from "./LeadRowMobile";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { startOfDay, endOfDay } from "date-fns";
import Navbar from "../analytics/Navbar";

const LeadsDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [copiedId, setCopiedId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Semua");
  const [selectedDate, setSelectedDate] = useState(null);

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

  const filteredLeads = leads.filter((lead) => {
    const matchStatus =
      selectedStatus === "Semua" || lead.status === selectedStatus;

    const matchDate =
      !selectedDate ||
      (lead.createdAt &&
        lead.createdAt.seconds * 1000 >= startOfDay(selectedDate).getTime() &&
        lead.createdAt.seconds * 1000 <= endOfDay(selectedDate).getTime());

    return matchStatus && matchDate;
  });

  const statusOptions = ["Semua", "pending", "complete", "cancel"];

  return (
    <div className="font-sans">
      <Navbar />
      <div className="min-h-screen bg-white text-gray-900 px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-semibold text-center mb-8">
            📦 Order Masuk
          </h1>

          <div className="mb-6 flex flex-wrap gap-4 justify-between items-center w-full">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              placeholderText="Filter by date"
              className="bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-[200px]"
              dateFormat="dd/MM/yyyy"
              isClearable
            />

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-[200px]"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {!isMobile && (
            <div className="grid grid-cols-7 border-b border-gray-200 py-3 text-sm font-medium text-gray-500 px-2">
              <span>Tanggal</span>
              <span>Nama</span>
              <span>WhatsApp</span>
              <span>Metode</span>
              <span>Produk</span>
              <span>Status</span>
              <span>Resi</span>
            </div>
          )}

          <div className="divide-y divide-gray-100">
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
                new Date(prevLead.createdAt.seconds * 1000).toLocaleString(
                  "id-ID",
                  {
                    month: "long",
                    year: "numeric",
                  }
                );

              const showMonth = index === 0 || currentMonth !== prevMonth;

              return (
                <React.Fragment key={lead.id}>
                  {showMonth && (
                    <div className="text-center text-sm font-medium text-gray-500 py-2 bg-gray-50 rounded-md my-4">
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
    </div>
  );
};

export default LeadsDashboard;