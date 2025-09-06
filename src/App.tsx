import { useState } from "react";
import CalenderGrid from "./components/CalenderGrid";
import Header from "./components/Header";

function App() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  return (
    <div className="h-screen flex flex-col">
      <Header currentMonth={currentMonth} />

      <div className="flex-1 overflow-y-auto">
        <CalenderGrid
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
        />
      </div>
    </div>
  );
}

export default App;
