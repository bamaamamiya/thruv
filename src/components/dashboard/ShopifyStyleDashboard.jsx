import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import ConversionRate from "../analytics/ConversionRate";
import Navbar from "../analytics/Navbar";
import FilterBar from "../analytics/FilterBar";
import Summary from "../analytics/Summary";
import LeadsChart from "../analytics/LeadsChart";
import OrderStatus from "../analytics/OrderStatus";

import { getDateRange } from "../../utils/dateFilters";
import { getPreviousRange } from "../../utils/getPreviousRange";
import {
  filterLeadsByDate,
  calculateSummary,
  generateChartData,
} from "../../utils/processLeads";
import ProfitSummary from "../analytics/ProfitSummary";
import PendingProfit from "../analytics/PendingProfit";
import ProfitTotal from "../analytics/ProfitTotal";

const ShopifyStyleDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("month");
  const [customRange, setCustomRange] = useState([new Date(), new Date()]);

  // 1. Listen to Firebase leads
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

  // 2. Active range & metrics
  const [start, end] = getDateRange(selectedFilter, customRange);
  const filteredLeads = filterLeadsByDate(leads, start, end);
  const {
    totalOrders,
    completedOrders,
    pendingOrders,
    totalSales,
    totalPendingValue,
    totalCost,
    pendingCost,
    totalAllTimeCost, // ✅ Tambahkan ini
  } = calculateSummary(filteredLeads);

  // 3. Previous range & metrics
  const [prevStart, prevEnd] = getPreviousRange(selectedFilter, start, end);
  const previousLeads = filterLeadsByDate(leads, prevStart, prevEnd);
  const previousSummary = calculateSummary(previousLeads);

  const previousConversionRate =
    previousSummary.totalOrders > 0
      ? (previousSummary.completedOrders / previousSummary.totalOrders) * 100
      : null;

  // 4. Chart data
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
          {/* Filter Selection */}
          <FilterBar
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            customRange={customRange}
            setCustomRange={setCustomRange}
          />

          {/* Summary Cards */}
          <Summary
            totalSales={totalSales}
            totalOrders={totalOrders}
            completedOrders={completedOrders}
            pendingOrders={pendingOrders}
            totalPendingValue={totalPendingValue}
            totalCost={totalCost}
            start={start}
            end={end}
            pendingOrdersPrevious={previousSummary.pendingOrders || 0}
          />

          {/* Leads Chart */}
          <LeadsChart data={chartData} />

          {/* Conversion Rate */}
          <ConversionRate
            completedOrders={completedOrders}
            totalOrders={totalOrders}
            previousRate={previousConversionRate}
          />

          {/* Order Status */}
          <OrderStatus
            completedOrders={completedOrders}
            pendingOrders={pendingOrders}
            totalOrders={totalOrders}
          />
          <ProfitTotal
            totalSales={totalSales}
            totalPendingValue={totalPendingValue}
            totalCost={totalCost}
          />
          <ProfitSummary totalSales={totalSales} totalCost={totalCost} />

          <PendingProfit
            totalPendingValue={totalPendingValue}
            pendingCost={pendingCost}
          />
        </div>
      </div>
    </div>
  );
};

export default ShopifyStyleDashboard;
