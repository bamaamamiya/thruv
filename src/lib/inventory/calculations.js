export function calculateInventoryPosition({
  onHand,
  inTransit,
  unfulfilled,
}) {
  return onHand + inTransit - unfulfilled;
}

export function calculateReorderPoint({
  averageDailySales,
  leadTimeDays,
  safetyStockDays,
}) {
  const leadTimeStock = averageDailySales * leadTimeDays;
  const safetyStock = averageDailySales * safetyStockDays;

  return Math.ceil(leadTimeStock + safetyStock);
}

export function calculateDaysOfStock({
  inventory,
  averageDailySales,
}) {
  if (averageDailySales <= 0) return Infinity;

  return inventory / averageDailySales;
}

export function calculateUnitsUntilReorder({
  inventoryPosition,
  reorderPoint,
}) {
  return inventoryPosition - reorderPoint;
}

export function calculateRecommendedOrder({
  inventoryPosition,
  averageDailySales,
  targetStockDays,
}) {
  const targetInventory = Math.ceil(
    averageDailySales * targetStockDays
  );

  return Math.max(0, targetInventory - inventoryPosition);
}

export function calculateStatus({
  inventoryPosition,
  reorderPoint,
  onHand,
  averageDailySales,
  inboundShipments = [],
}) {
  if (averageDailySales <= 0) {
    return {
      status: "SAFE",
      label: "SAFE",
      description: "No sales velocity detected.",
    };
  }

  const physicalDays = onHand / averageDailySales;

  const earliestInbound = inboundShipments
    .filter((shipment) => shipment.quantity > 0)
    .sort(
      (a, b) =>
        new Date(a.expectedArrivalDate) -
        new Date(b.expectedArrivalDate)
    )[0];

  let stockoutRisk = false;

  if (physicalDays <= 0) {
    stockoutRisk = true;
  }

  if (earliestInbound) {
    const today = new Date();

    const arrival = new Date(
      earliestInbound.expectedArrivalDate
    );

    const daysUntilArrival =
      Math.max(
        0,
        (arrival - today) / (1000 * 60 * 60 * 24)
      );

    if (physicalDays < daysUntilArrival) {
      stockoutRisk = true;
    }
  }

  if (stockoutRisk) {
    return {
      status: "STOCKOUT_RISK",
      label: "STOCKOUT RISK",
      description:
        "Physical inventory is projected to reach zero before replenishment arrives.",
    };
  }

  if (inventoryPosition <= reorderPoint) {
    return {
      status: "ORDER_TODAY",
      label: "ORDER TODAY",
      description:
        "Inventory position has reached your reorder point.",
    };
  }

  const distance = inventoryPosition - reorderPoint;

  if (distance <= averageDailySales * 2) {
    return {
      status: "WATCH",
      label: "WATCH",
      description:
        "Inventory is approaching the reorder point.",
    };
  }

  return {
    status: "SAFE",
    label: "SAFE",
    description:
      "Inventory is comfortably above the reorder point.",
  };
}

export function calculateInventoryMetrics(data) {
  const inventoryPosition = calculateInventoryPosition({
    onHand: data.onHand,
    inTransit: data.inTransit,
    unfulfilled: data.unfulfilled,
  });

  const reorderPoint = calculateReorderPoint({
    averageDailySales: data.averageDailySales,
    leadTimeDays: data.leadTimeDays,
    safetyStockDays: data.safetyStockDays,
  });

  const physicalDays = calculateDaysOfStock({
    inventory: data.onHand,
    averageDailySales: data.averageDailySales,
  });

  const totalCoverageDays = calculateDaysOfStock({
    inventory: inventoryPosition,
    averageDailySales: data.averageDailySales,
  });

  const unitsUntilReorder = calculateUnitsUntilReorder({
    inventoryPosition,
    reorderPoint,
  });

  const recommendedOrder = calculateRecommendedOrder({
    inventoryPosition,
    averageDailySales: data.averageDailySales,
    targetStockDays: data.targetStockDays,
  });

  const status = calculateStatus({
    inventoryPosition,
    reorderPoint,
    onHand: data.onHand,
    averageDailySales: data.averageDailySales,
    inboundShipments: data.inboundShipments,
  });

  return {
    inventoryPosition,
    reorderPoint,
    physicalDays,
    totalCoverageDays,
    unitsUntilReorder,
    recommendedOrder,
    status,
  };
}