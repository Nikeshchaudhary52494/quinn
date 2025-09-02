import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isToday,
  subMonths,
  addMonths,
} from "date-fns";

export interface DayCell {
  date: Date;
  isToday: boolean;
}

export const getMonthGrid = (date: Date): DayCell[] => {
  const prevMonth = subMonths(date, 1);
  const nextMonth = addMonths(date, 1);

  const start = startOfWeek(startOfMonth(prevMonth), { weekStartsOn: 0 });
  const end = endOfWeek(endOfMonth(nextMonth), { weekStartsOn: 0 });

  const days: DayCell[] = [];
  let current = start;

  while (current <= end) {
    days.push({
      date: current,
      isToday: isToday(current),
    });
    current = addDays(current, 1);
  }
  return days;
};
