"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Menu() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check localStorage and system preference on mount
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const shouldBeDark =
      savedTheme === "dark" || (!savedTheme && systemPrefersDark);
    setIsDarkMode(shouldBeDark);

    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="fixed top-4 right-4 flex gap-3 z-50">
      <button
        onClick={toggleDarkMode}
        style={{ fontFamily: "DM Sans, Helvetica" }}
        className="px-4 py-2 bg-[#faf9f6] dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 
                         text-gray-800 dark:text-white rounded-lg text-sm font-medium transition-colors
                          hover:shadow-lg border border-gray-200 dark:border-gray-700"
      >
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <button
        onClick={() => router.push("/notes")}
        style={{ fontFamily: "DM Sans, Helvetica" }}
        className="px-4 py-2 bg-[#faf9f6] dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 
                         text-gray-800 dark:text-white rounded-lg text-sm font-medium transition-colors
                          hover:shadow-lg border border-gray-200 dark:border-gray-700"
      >
        Graph View
      </button>
    </div>
  );
}
