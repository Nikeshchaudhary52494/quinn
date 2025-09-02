import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isToday,
} from "date-fns";

export interface DayCell {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
}

export const getMonthGrid = (date: Date): DayCell[] => {
  const start = startOfWeek(startOfMonth(date));
  const end = endOfWeek(endOfMonth(date));

  const days: DayCell[] = [];
  let current = start;

  while (current <= end) {
    days.push({
      date: current,
      isCurrentMonth: isSameMonth(current, new Date()),
      isToday: isToday(current),
    });
    current = addDays(current, 1);
  }
  return days;
};
