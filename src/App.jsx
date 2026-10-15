import React, { useState, useEffect } from "react";
import Ultah24 from "./pages/Ultah24/Ultah24";
import Ultah25 from "./pages/Ultah25/Ultah25";
import ClickHeartEffect from "./components/ClickHeartEffect";
import { Coffee, Heart } from "lucide-react";

function App() {
  const getInitialYear = () => {
    const hash = window.location.hash.toLowerCase();
    const searchParams = new URLSearchParams(window.location.search);
    if (hash === "#24" || searchParams.get("year") === "24") {
      return "24";
    }
    return "25";
  };

  const [activeYear, setActiveYear] = useState(getInitialYear);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === "#24") {
        setActiveYear("24");
      } else {
        setActiveYear("25");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigateTo = (year) => {
    window.location.hash = `#${year}`;
    setActiveYear(year);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen w-full">
      {/* Efek Love Partikel Melayang Global saat Layar Diklik/Disentuh */}
      <ClickHeartEffect />

      {/* Render halaman sesuai tahun terpilih */}
      {activeYear === "25" ? (
        <Ultah25 onGoToUltah24={() => navigateTo("24")} />
      ) : (
        <Ultah24 onGoToUltah25={() => navigateTo("25")} />
      )}
    </div>
  );
}

export default App;
