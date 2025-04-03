import { useState, useEffect } from "react";
import { BsSun, BsMoon } from "react-icons/bs";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition"
    >
      {theme === "light" ? <BsMoon className="text-md" /> : <BsSun className="text-yellow-500 text-md" />}
    </button>
  );
};

export default ThemeToggle;
