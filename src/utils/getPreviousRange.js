import {
  startOfDay,
  endOfDay,
  subDays,
  subWeeks,
  subMonths,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  differenceInCalendarDays,
} from "date-fns";

export const getPreviousRange = (selectedFilter, currentStart, currentEnd) => {
  switch (selectedFilter) {
    case "today":
    case "yesterday":
      return [
        startOfDay(subDays(currentStart, 1)),
        endOfDay(subDays(currentEnd, 1)),
      ];

    case "week":
      const prevWeek = subWeeks(currentStart, 1);
      return [startOfWeek(prevWeek), endOfWeek(prevWeek)];

    case "month":
      const prevMonth = subMonths(currentStart, 1);
      return [startOfMonth(prevMonth), endOfMonth(prevMonth)];

    case "lastMonth":
      const twoMonthsAgo = subMonths(currentStart, 1);
      return [startOfMonth(twoMonthsAgo), endOfMonth(twoMonthsAgo)];

    case "custom":
      const diff = differenceInCalendarDays(currentEnd, currentStart);
      const prevStart = subDays(currentStart, diff + 1);
      const prevEnd = subDays(currentStart, 1);
      return [startOfDay(prevStart), endOfDay(prevEnd)];

    case "allTime":
    default:
      return [null, null];
  }
};
