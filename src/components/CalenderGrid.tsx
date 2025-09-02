import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { getMonthGrid, type DayCell } from "../utils/calender";
import CalenderElement from "./CalenderElement";
import { addMonths, subMonths } from "date-fns";

export default function CalenderGrid() {
  const today = new Date();

  const [days, setDays] = useState<DayCell[]>(() => [...getMonthGrid(today)]);
  const containerRef = useRef<HTMLDivElement>(null);

  const [earliestMonth, setEarliestMonth] = useState(subMonths(today, 1));
  const [latestMonth, setLatestMonth] = useState(addMonths(today, 1));
  const todayRef = useRef<HTMLDivElement | null>(null);
  const hasScrolledToToday = useRef(false);

  const loadMore = (direction: "up" | "down") => {
    if (direction === "up") {
      const newMonth = subMonths(earliestMonth, 1);
      const newDays = getMonthGrid(newMonth).filter(
        (day) => day.date < days[0].date
      );

      const container = containerRef.current;
      if (container) {
        const prevScrollHeight = container.scrollHeight;

        setDays((prev) => [...newDays, ...prev]);

        setTimeout(() => {
          const newScrollHeight = container.scrollHeight;
          container.scrollTop += newScrollHeight - prevScrollHeight;
        }, 0);
      }

      setEarliestMonth(newMonth);
    } else {
      const newMonth = addMonths(latestMonth, 1);
      const newDays = getMonthGrid(newMonth).filter(
        (day) => day.date > days[days.length - 1].date
      );
      setDays((prev) => [...prev, ...newDays]);
      setLatestMonth(newMonth);
    }
  };

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    if (container.scrollTop < 200) loadMore("up");

    if (
      container.scrollHeight - container.scrollTop - container.clientHeight <
      200
    )
      loadMore("down");
  }, [loadMore]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  useLayoutEffect(() => {
    if (todayRef.current && !hasScrolledToToday.current) {
      todayRef.current.scrollIntoView({ behavior: "instant" });
      hasScrolledToToday.current = true;
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-7 gap-1 mt-25 p-4 h-screen overflow-scroll"
    >
      {days.map((day) => (
        <CalenderElement
          ref={day.isToday ? todayRef : null}
          key={day.date.toString()}
          dayData={day}
        />
      ))}
    </div>
  );
}
