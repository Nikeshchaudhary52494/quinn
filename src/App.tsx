import { useState } from "react";
import CalenderGrid from "./components/CalenderGrid";
import Header from "./components/Header";

function App() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  return (
    <div className="h-screen">
      <Header currentMonth={currentMonth} />
      <CalenderGrid
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
      />
    </div>
  );
}

export default App;
