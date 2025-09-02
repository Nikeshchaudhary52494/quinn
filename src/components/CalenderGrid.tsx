import { getMonthGrid } from "../utils/calender";
import CalenderElement from "./CalenderElement";

export default function CalenderGrid() {
  const today = new Date();
  const days = getMonthGrid(today);
  return (
    <div className="grid grid-cols-7 gap-1 mt-25 p-4">
      {days.map((day) => (
        <CalenderElement dayData={day} />
      ))}
    </div>
  );
}
