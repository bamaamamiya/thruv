import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

import Navbar from "../analytics/Navbar";
import FilterBar from "../analytics/FilterBar";
import Summary from "../analytics/Summary";
import LeadsChart from "../analytics/LeadsChart";

import { getDateRange } from "../../utils/dateFilters";
import {
  filterLeadsByDate,
  calculateSummary,
  generateChartData,
} from "../../utils/processLeads";

const ShopifyStyleDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("today");
  const [customRange, setCustomRange] = useState([new Date(), new Date()]);
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "leads"), (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLeads(docs);
    });

    return () => unsub();
  }, []);


  // Process date range and filter
  const [start, end] = getDateRange(selectedFilter, customRange);
  const filteredLeads = filterLeadsByDate(leads, start, end);

  // Generate summary metrics
  const {
    totalOrders,
    completedOrders,
    pendingOrders,
    totalSales,
    totalPendingValue,
  } = calculateSummary(filteredLeads);

  // Generate chart data
  const chartData = generateChartData(
    filteredLeads,
    selectedFilter,
    start,
    end
  );

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-white text-black px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <FilterBar
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            customRange={customRange}
            setCustomRange={setCustomRange}
          />

          <Summary
            totalSales={totalSales}
            totalOrders={totalOrders}
            completedOrders={completedOrders}
            pendingOrders={pendingOrders}
            totalPendingValue={totalPendingValue}
            start={start}
            end={end}
          />

          <LeadsChart data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default ShopifyStyleDashboard;
