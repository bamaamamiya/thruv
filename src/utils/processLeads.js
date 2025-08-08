import {
  format,
  isWithinInterval,
  differenceInDays,
  startOfWeek,
} from "date-fns";

// Filter leads berdasarkan rentang tanggal
export const filterLeadsByDate = (leads, start, end) => {
  return leads.filter((lead) => {
    if (!lead.createdAt?.seconds) return false;
    const createdAt = new Date(lead.createdAt.seconds * 1000);
    return isWithinInterval(createdAt, { start, end });
  });
};

// Hitung ringkasan data leads
export const calculateSummary = (leads) => {
  const completed = leads.filter((lead) => lead.status === "complete");
  const pending = leads.filter((lead) => lead.status === "pending");
  // const costProduct = leads.filter((lead) => lead.status === "costProduct");

  const totalSales = completed.reduce(
    (sum, lead) => sum + (lead.price || 0),
    0
  );
  const totalPendingValue = pending.reduce(
    (sum, lead) => sum + (lead.price || 0),
    0
  );
  // ✅ PERBAIKAN: totalCost hanya dihitung dari lead yang sudah "complete"
  const totalCost = completed.reduce(
    (sum, lead) => sum + (lead.costProduct || 0),
    0
  );

  // ✅ BARU: Hitung biaya khusus untuk lead yang "pending"
  const pendingCost = pending.reduce(
    (sum, lead) => sum + (lead.costProduct || 0),
    0
  );

	// ✅ BARU: total biaya dari SEMUA lead
  const totalAllTimeCost = leads.reduce(
    (sum, lead) => sum + (lead.costProduct || 0),
    0
  );

  const pendingProfit = totalPendingValue - pendingCost;

  const profit = totalSales - totalCost;

  return {
    totalOrders: leads.length,
    completedOrders: completed.length,
    pendingOrders: pending.length,
    totalSales,
    totalPendingValue,
    totalCost,
    profit,
    pendingCost, 
		totalAllTimeCost,
  };
};

// Buat data chart berdasarkan filter waktu (per jam, per hari, per bulan)
export const generateChartData = (leads, selectedFilter, start, end) => {
  if (selectedFilter === "today" || selectedFilter === "yesterday") {
    return Array.from({ length: 24 }, (_, i) => {
      const hour = i; // 0 to 23
      const label = `${hour.toString().padStart(2, "0")}:00`;
      const complete = leads.filter((lead) => {
        const time = new Date(lead.createdAt.seconds * 1000);
        return time.getHours() === hour && lead.status === "complete";
      }).length;

      const pending = leads.filter((lead) => {
        const time = new Date(lead.createdAt.seconds * 1000);
        return time.getHours() === hour && lead.status === "pending";
      }).length;

      return { label, complete, pending };
    });
  }

  if (selectedFilter === "week") {
    const map = {};
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const key = format(new Date(d), "dd MMM");
      map[key] = { complete: 0, pending: 0 };
    }

    leads.forEach((lead) => {
      const time = new Date(lead.createdAt.seconds * 1000);
      const key = format(time, "dd MMM");

      if (map[key]) {
        if (lead.status === "complete") {
          map[key].complete += 1;
        } else if (lead.status === "pending") {
          map[key].pending += 1;
        }
      }
    });

    return Object.entries(map).map(([label, value]) => ({
      label,
      ...value,
    }));
  }

  if (selectedFilter === "month" || selectedFilter === "lastMonth") {
    const weekMap = {
      "Week 1": { complete: 0, pending: 0 },
      "Week 2": { complete: 0, pending: 0 },
      "Week 3": { complete: 0, pending: 0 },
      "Week 4": { complete: 0, pending: 0 },
    };

    leads.forEach((lead) => {
      const time = new Date(lead.createdAt.seconds * 1000);
      const weekOfMonth = Math.ceil(time.getDate() / 7);
      const label = `Week ${weekOfMonth}`;

      if (weekMap[label]) {
        if (lead.status === "complete") {
          weekMap[label].complete += 1;
        } else if (lead.status === "pending") {
          weekMap[label].pending += 1;
        }
      }
    });

    return Object.entries(weekMap).map(([label, value]) => ({
      label,
      ...value,
    }));
  }

  if (selectedFilter === "allTime") {
    const map = {};

    leads.forEach((lead) => {
      const time = new Date(lead.createdAt.seconds * 1000);
      const key = format(time, "MMM yyyy");

      if (!map[key]) {
        map[key] = { complete: 0, pending: 0 };
      }

      if (lead.status === "complete") {
        map[key].complete += 1;
      } else if (lead.status === "pending") {
        map[key].pending += 1;
      }
    });

    return Object.entries(map).map(([label, value]) => ({
      label,
      ...value,
    }));
  }

  // ✅ CUSTOM FILTER
  if (selectedFilter === "custom") {
    const dayDiff = differenceInDays(end, start);

    // Jika kurang dari atau sama dengan 31 hari → tampilkan per hari
    if (dayDiff <= 31) {
      const map = {};
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const key = format(new Date(d), "dd MMM");
        map[key] = { complete: 0, pending: 0 };
      }

      leads.forEach((lead) => {
        const time = new Date(lead.createdAt.seconds * 1000);
        const key = format(time, "dd MMM");

        if (map[key]) {
          if (lead.status === "complete") {
            map[key].complete += 1;
          } else if (lead.status === "pending") {
            map[key].pending += 1;
          }
        }
      });

      return Object.entries(map).map(([label, value]) => ({
        label,
        ...value,
      }));
    } else {
      // Jika lebih dari 31 hari → group per minggu
      const weekMap = {};

      leads.forEach((lead) => {
        const time = new Date(lead.createdAt.seconds * 1000);
        if (!isWithinInterval(time, { start, end })) return;

        const startWeek = startOfWeek(time, { weekStartsOn: 1 }); // Monday as first day
        const key = format(startWeek, "'Week of' dd MMM");

        if (!weekMap[key]) {
          weekMap[key] = { complete: 0, pending: 0 };
        }

        if (lead.status === "complete") {
          weekMap[key].complete += 1;
        } else if (lead.status === "pending") {
          weekMap[key].pending += 1;
        }
      });

      return Object.entries(weekMap).map(([label, value]) => ({
        label,
        ...value,
      }));
    }
  }

  return [];
};
