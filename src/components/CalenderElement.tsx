import type { DayCell } from "../utils/calender";

interface CalenderElementProps {
  dayData: DayCell;
}

export default function CalenderElement({ dayData }: CalenderElementProps) {
  return (
    <div
      className={`rounded-md font-bold text-6xl flex justify-center items-center  aspect-[2/3] 
        ${
          dayData.isToday
            ? "border-blue-400 border-4 text-blue-400"
            : "hover:bg-blue-300 hover:text-white duration-200 transition-colors"
        }
        ${dayData.isCurrentMonth ? "bg-blue-100" : "bg-gray-100"}
        `}
    >
      {dayData.date.getDate()}
    </div>
  );
}
