import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type Dispatch,
} from "react";
import { getMonthGrid, type DayCell } from "../utils/calender";
import CalendarElement from "./CalendarElement";
import { addMonths, isSameMonth, subMonths } from "date-fns";

interface CalenderGridProps {
  currentMonth: Date;
  setCurrentMonth: Dispatch<React.SetStateAction<Date>>;
}

export default function CalenderGrid({
  currentMonth,
  setCurrentMonth,
}: CalenderGridProps) {
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

        requestAnimationFrame(() => {
          if (!container) return;

          const newScrollHeight = container.scrollHeight;
          const newTop =
            container.scrollTop + (newScrollHeight - prevScrollHeight);

          container.scrollTop = newTop;
        });
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

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === "top-sentinel") {
              loadMore("up");
            }
            if (entry.target.id === "bottom-sentinel") {
              loadMore("down");
            }
          }
        });
      },
      { root: container, threshold: 0.6 }
    );

    const topSentinel = document.getElementById("top-sentinel");
    const bottomSentinel = document.getElementById("bottom-sentinel");

    if (topSentinel) observer.observe(topSentinel);
    if (bottomSentinel) observer.observe(bottomSentinel);

    return () => observer.disconnect();
  }, [days, earliestMonth, latestMonth]);

  useLayoutEffect(() => {
    if (todayRef.current && !hasScrolledToToday.current) {
      todayRef.current.scrollIntoView({ behavior: "instant" });
      hasScrolledToToday.current = true;
    }
  }, []);

  useEffect(() => {
    const div = containerRef.current;
    if (!div) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const d = entry.target.getAttribute("data-date");
            if (d) {
              const dt = new Date(d);
              if (dt.getDate() === 15) {
                setCurrentMonth(dt);
              }
            }
          }
        });
      },
      { root: div, threshold: 0.6 }
    );

    const dateEls = div.querySelectorAll("[data-date]");
    dateEls.forEach((el) => observer.observe(el));

    return () => {
      dateEls.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [days]);

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-7 px-4 h-screen overflow-y-scroll"
    >
      <div id="top-sentinel" className="col-span-7 h-[1px]" />

      {days.map((day) => (
        <CalendarElement
          ref={day.isToday ? todayRef : null}
          key={day.date.toString()}
          isCurrentMonth={isSameMonth(day.date, currentMonth)}
          dayData={day}
        />
      ))}

      <div id="bottom-sentinel" className="col-span-7 h-[1px]" />
    </div>
  );
}
