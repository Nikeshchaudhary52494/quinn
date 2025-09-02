export default function Header() {
  const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return (
    <div className="fixed top-0 p-4 w-full z-10 bg-white h-20">
      <div className="flex justify-between">
        <div className="font-bold text-2xl">Quinn</div>
        <div>September 2025</div>
      </div>
      <div className="grid grid-cols-7">
        {weeks.map((day, index) => (
          <div key={index} className="text-center uppercase">
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}
