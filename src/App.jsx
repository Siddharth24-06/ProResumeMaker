import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ResumeEditor from "./pages/ResumeEditor";
import SavedResumes from "./pages/SavedResumes";
import Login from "./pages/Login";
import './App.css';

function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    const stored = window.localStorage.getItem("rb-theme");
    if (stored === "light" || stored === "dark") return stored;
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem("rb-auth-logged-in") === "true";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    window.localStorage.setItem("rb-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <Router>
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        isLoggedIn={isLoggedIn}
        onLogout={() => {
          window.localStorage.removeItem("rb-auth-email");
          window.localStorage.removeItem("rb-auth-logged-in");
          setIsLoggedIn(false);
        }}
      />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme={theme === "dark" ? "dark" : "light"}
      />
      <div className="relative pt-20 min-h-screen bg-gradient-to-b from-slate-50 via-sky-50 to-indigo-50 text-slate-900 transition-colors duration-300 dark:from-violet-950 dark:via-indigo-950 dark:to-slate-950 dark:text-neutral-100">
        {/* Subtle glowing background orbs in dark mode */}
        <div className="pointer-events-none absolute inset-0 -z-10 hidden dark:block">
          <div className="glow-orb glow-orb--violet left-[-10%] top-10 h-72 w-72" />
          <div className="glow-orb glow-orb--indigo right-[-5%] top-40 h-64 w-64 animation-delay-1000" />
        </div>
        <Routes>
          {/* Show login first when app opens */}
          <Route path="/" element={<Login onAuthChange={setIsLoggedIn} />} />
          {/* Main app pages after login */}
          <Route path="/home" element={<Home />} />
          <Route path="/editor" element={<ResumeEditor />} />
          <Route path="/editor/:id" element={<ResumeEditor />} />
          <Route path="/saved" element={<SavedResumes />} />
          {/* Optional explicit /login route */}
          <Route path="/login" element={<Login onAuthChange={setIsLoggedIn} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
