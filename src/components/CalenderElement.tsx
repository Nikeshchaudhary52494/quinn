import { useState } from "react";
import type { RefObject } from "react";
import type { DayCell } from "../utils/calender";
import { journalData } from "../assets/data";
import { format, parse } from "date-fns";
import { AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import JournalCard from "./JournalCard";

interface CalendarElementProps {
  dayData: DayCell;
  ref: RefObject<HTMLDivElement | null> | null;
}

export default function CalendarElement({
  dayData,
  ref,
}: CalendarElementProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);

  const journalIndex = journalData.findIndex((entry) => {
    const entryDate = parse(entry.date, "dd/MM/yyyy", new Date());
    return (
      format(entryDate, "dd/MM/yyyy") === format(dayData.date, "dd/MM/yyyy")
    );
  });

  const journal = journalIndex !== -1 ? journalData[journalIndex] : null;

  const handlePrev = () => {
    if (openIndex !== null) {
      setDirection(-1);
      setOpenIndex((openIndex - 1 + journalData.length) % journalData.length);
    }
  };

  const handleNext = () => {
    if (openIndex !== null) {
      setDirection(1);
      setOpenIndex((openIndex + 1) % journalData.length);
    }
  };

  return (
    <>
      <div
        ref={ref}
        onClick={() => journal && setOpenIndex(journalIndex)}
        className={`rounded-md md:font-semibold md:text-6xl hover:bg-blue-300 hover:text-white  flex justify-center items-center md:aspect-[2/3] aspect-[1/2] cursor-pointer
          ${
            dayData.isToday
              ? "border-blue-500 border-4 text-blue-500"
              : "duration-200 transition-colors"
          }
          ${dayData.isCurrentMonth ? "bg-blue-100" : "bg-gray-100"}
        `}
      >
        {journal ? (
          <img
            src={journal.imgUrl}
            alt="journal"
            className="w-full h-full object-cover rounded-md"
          />
        ) : (
          <span>{dayData.date.getDate()}</span>
        )}
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-50 overflow-hidden">
            <button
              className="absolute top-4 right-4 text-white"
              onClick={() => setOpenIndex(null)}
            >
              <X size={28} />
            </button>

            <button
              onClick={handlePrev}
              className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow"
            >
              <ChevronLeft size={28} />
            </button>

            <button
              onClick={handleNext}
              className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow"
            >
              <ChevronRight size={28} />
            </button>
            <div className="relative w-full max-w-3xl flex items-center h-[90vh] justify-center overflow-hidden">
              <AnimatePresence custom={direction} initial={false}>
                <JournalCard
                  key={openIndex}
                  entry={journalData[openIndex]}
                  direction={direction}
                  handlePrev={handlePrev}
                  handleNext={handleNext}
                />
              </AnimatePresence>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
