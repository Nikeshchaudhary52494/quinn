import { motion } from "framer-motion";
import { format, parse } from "date-fns";
import { Star } from "lucide-react";

interface JournalCardProps {
  entry: {
    imgUrl: string;
    date: string;
    rating: number;
    categories: string[];
    description: string;
  };
  direction: number;
  handlePrev: () => void;
  handleNext: () => void;
}

const variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.8,
    position: "absolute" as const,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    position: "absolute" as const,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -300 : 300,
    opacity: 0,
    scale: 0.8,
    position: "absolute" as const,
  }),
};

export default function JournalCard({
  entry,
  direction,
  handlePrev,
  handleNext,
}: JournalCardProps) {
  return (
    <motion.div
      key={entry.date}
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.5 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_, info) => {
        if (info.offset.x > 100) handlePrev();

        if (info.offset.x < -100) handleNext();
      }}
      className="relative flex flex-col w-[85%] md:w-[70%] h-[80vh] bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <img
        src={entry.imgUrl}
        alt="journal"
        className="w-full h-auto object-cover"
      />

      <div className="p-4 absolute bottom-0 bg-white">
        <h2 className="text-lg font-bold mb-2">
          {format(parse(entry.date, "dd/MM/yyyy", new Date()), "dd MMM yyyy")}
        </h2>

        <div className="text-gray-600 mb-2 flex items-center gap-2">
          <Star size={16} className="text-yellow-500" />

          {entry.rating}
        </div>

        <div className="flex flex-wrap gap-2 mb-2">
          {entry.categories.map((cat) => (
            <span
              key={cat}
              className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-md"
            >
              {cat}
            </span>
          ))}
        </div>

        <p className="text-gray-800 text-sm">{entry.description}</p>
      </div>
    </motion.div>
  );
}
