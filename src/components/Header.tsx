import { format } from "date-fns";

interface HeaderProps {
  currentMonth: Date;
}

export default function Header({ currentMonth }: HeaderProps) {
  const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return (
    <div className="fixed top-0 p-4 w-full z-10 bg-white h-[70px] border-b-2 md:h-20">
      <div className="flex justify-between">
        <div className="font-bold text-2xl">Quinn</div>
        <div>{format(currentMonth, "MMMM yyyy")}</div>
      </div>
      <div className="grid grid-cols-7">
        {weeks.map((day, index) => (
          <div
            key={index}
            className="text-center text-sm md:text-normal uppercase"
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}
