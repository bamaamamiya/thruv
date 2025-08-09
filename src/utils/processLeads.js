import {
   format,
  isWithinInterval,
  differenceInDays,
  startOfWeek,
  endOfWeek,
  subWeeks,
  startOfMonth,
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

  const totalSales = completed.reduce((sum, lead) => sum + (lead.price || 0), 0);
  const totalPendingValue = pending.reduce(
    (sum, lead) => sum + (lead.price || 0),
    0
  );
  const totalCost = completed.reduce(
    (sum, lead) => sum + (lead.costProduct || 0),
    0
  );
  const pendingCost = pending.reduce(
    (sum, lead) => sum + (lead.costProduct || 0),
    0
  );
  const totalAllTimeCost = leads.reduce(
    (sum, lead) => sum + (lead.costProduct || 0),
    0
  );

  const profit = totalSales - totalCost;
  const pendingProfit = totalPendingValue - pendingCost;

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
      const hour = i;
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
        if (lead.status === "complete") map[key].complete += 1;
        else if (lead.status === "pending") map[key].pending += 1;
      }
    });

    return Object.entries(map).map(([label, value]) => ({
      label,
      ...value,
    }));
  }

  if (selectedFilter === "lastWeek") {
    const lastWeekDate = subWeeks(new Date(), 1);
    const startOfLastWeek = startOfWeek(lastWeekDate, { weekStartsOn: 1 });
    const endOfLastWeek = endOfWeek(lastWeekDate, { weekStartsOn: 1 });

    const map = {};
    for (
      let dt = new Date(startOfLastWeek);
      dt <= endOfLastWeek;
      dt.setDate(dt.getDate() + 1)
    ) {
      const key = format(new Date(dt), "dd MMM");
      map[key] = { complete: 0, pending: 0 };
    }

    leads.forEach((lead) => {
      const time = new Date(lead.createdAt.seconds * 1000);
      if (isWithinInterval(time, { start: startOfLastWeek, end: endOfLastWeek })) {
        const key = format(time, "dd MMM");
        if (map[key]) {
          if (lead.status === "complete") map[key].complete += 1;
          else if (lead.status === "pending") map[key].pending += 1;
        }
      }
    });

    return Object.entries(map).map(([label, value]) => ({
      label,
      ...value,
    }));
  }

  if (selectedFilter === "month" || selectedFilter === "lastMonth") {
  const weekMap = {};

  const monthStart = startOfMonth(start); // pakai start dari range filter

  leads.forEach((lead) => {
    const time = new Date(lead.createdAt.seconds * 1000);
    // Hitung awal minggu dari tanggal lead (Senin sebagai awal minggu)
    const startWeek = startOfWeek(time, { weekStartsOn: 1 });
    // Hitung berapa hari selisih dari awal bulan ke awal minggu lead
    const diffDays = differenceInDays(startWeek, monthStart);
    // Tentukan nomor minggu: floor(difference / 7) + 1
    const weekNumber = Math.floor(diffDays / 7) + 1;
    const label = `Week ${weekNumber}`;

    if (!weekMap[label]) {
      weekMap[label] = { complete: 0, pending: 0 };
    }

    if (lead.status === "complete") {
      weekMap[label].complete += 1;
    } else if (lead.status === "pending") {
      weekMap[label].pending += 1;
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

      if (!map[key]) map[key] = { complete: 0, pending: 0 };

      if (lead.status === "complete") map[key].complete += 1;
      else if (lead.status === "pending") map[key].pending += 1;
    });

    return Object.entries(map).map(([label, value]) => ({
      label,
      ...value,
    }));
  }

  if (selectedFilter === "custom") {
    const dayDiff = differenceInDays(end, start);

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
          if (lead.status === "complete") map[key].complete += 1;
          else if (lead.status === "pending") map[key].pending += 1;
        }
      });

      return Object.entries(map).map(([label, value]) => ({
        label,
        ...value,
      }));
    } else {
      const weekMap = {};

      leads.forEach((lead) => {
        const time = new Date(lead.createdAt.seconds * 1000);
        if (!isWithinInterval(time, { start, end })) return;

        const startWeek = startOfWeek(time, { weekStartsOn: 1 });
        const key = format(startWeek, "'Week of' dd MMM");

        if (!weekMap[key]) weekMap[key] = { complete: 0, pending: 0 };

        if (lead.status === "complete") weekMap[key].complete += 1;
        else if (lead.status === "pending") weekMap[key].pending += 1;
      });

      return Object.entries(weekMap).map(([label, value]) => ({
        label,
        ...value,
      }));
    }
  }

  return [];
};
