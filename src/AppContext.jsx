import { useState, useRef, useCallback, createContext, useContext } from "react";

/* ═══════════════════════════════════════════════════════════
   GLOBAL STATE CONTEXT
═══════════════════════════════════════════════════════════ */
export const AppContext = createContext(null);

export function useApp() { return useContext(AppContext); }

export function AppProvider({ children }) {
  const [page, setPage] = useState(() => sessionStorage.getItem("ep_page") || "landing"); // landing | login | dashboard | practice | test
  const [isPro, setIsPro] = useState(false);
  const [user] = useState({ name: "Demo", email: "demo@elevenplus.ac.uk" });
  const [xp, setXp] = useState(180);
  const [streak, setStreak] = useState(3);
  const [totalCorrect, setTotalCorrect] = useState(18);
  const [setProgress, setSetProgress] = useState({ A: 30, B: 0, C: 0 }); // percent
  const [activity, setActivity] = useState([
    { set:"Set A", date:"Today", q:10, t:"8 min", score:8 },
    { set:"Set A", date:"Yesterday", q:10, t:"9 min", score:6 },
    { set:"Set A", date:"2 days ago", q:10, t:"11 min", score:7 },
  ]);
  const [toast, setToast] = useState({ msg:"", show:false });
  const toastTimer = useRef(null);

  const showToast = useCallback((msg) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ msg, show: true });
    toastTimer.current = setTimeout(() => setToast(t => ({ ...t, show: false })), 3400);
  }, []);

  const navigate = useCallback((p) => { sessionStorage.setItem("ep_page", p); setPage(p); }, []);

  const addXp = useCallback((amount) => setXp(v => v + amount), []);
  const addCorrect = useCallback((n) => setTotalCorrect(v => v + n), []);
  const bumpStreak = useCallback(() => setStreak(v => v + 1), []);
  const resetStreak = useCallback(() => setStreak(0), []);

  const addActivity = useCallback((entry) => {
    setActivity(prev => [entry, ...prev.slice(0, 9)]);
  }, []);

  const updateProgress = useCallback((set, pct) => {
    setSetProgress(prev => ({ ...prev, [set]: pct }));
  }, []);

  const upgradeToProFn = useCallback(() => {
    setIsPro(true);
    showToast("🎉 Pro access granted! All papers unlocked.");
  }, [showToast]);

  const level = Math.floor(xp / 1000) + 2;
  const levelName = ["Beginner","Apprentice Scholar","Keen Learner","Rising Star","Expert Scholar","Master Scholar"][Math.min(level - 1, 5)] || "Master Scholar";

  return (
    <AppContext.Provider value={{
      page, navigate, user, xp, streak, totalCorrect, setProgress,
      activity, toast, showToast, addXp, addCorrect, bumpStreak, resetStreak,
      addActivity, updateProgress, isPro, upgradeToProFn,
      level, levelName, xpInLevel: xp % 1000
    }}>
      {children}
    </AppContext.Provider>
  );
}
