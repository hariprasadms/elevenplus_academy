import { useState, useEffect } from "react";
import { useApp } from "./AppContext";

/* ═══════════════════════════════════════════════════════════
   SHARED COMPONENTS
═══════════════════════════════════════════════════════════ */

export function Toast() {
  const { toast } = useApp();
  return <div className={`toast${toast.show ? " show" : ""}`}>{toast.msg}</div>;
}

export function Confetti({ active }) {
  const colours = ["#d4912a","#f5c842","#1e7a4a","#2a7ad4","#e84040","#ffffff"];
  if (!active) return null;
  return (
    <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:1000 }}>
      {Array.from({length: 80}).map((_, i) => (
        <div key={i} className="confetti-piece" style={{
          left: `${Math.random()*100}vw`,
          width: `${6+Math.random()*8}px`,
          height: `${8+Math.random()*6}px`,
          background: colours[Math.floor(Math.random()*colours.length)],
          animationDuration: `${2+Math.random()*2}s`,
          animationDelay: `${Math.random()*.5}s`,
        }} />
      ))}
    </div>
  );
}

export function Header({ showBack, showTimer, timerSec, timerState }) {
  const { navigate, xp, streak, xpInLevel, user, showToast } = useApp();
  const [ddOpen, setDdOpen] = useState(false);

  useEffect(() => {
    const close = (e) => { if (!e.target.closest(".nav-avatar-wrap")) setDdOpen(false); };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const formatTime = (s) => {
    const m = Math.floor(s / 60), sec = s % 60;
    return `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
  };

  return (
    <header className="header">
      <div className="hdr">
        <div className="logo" onClick={() => navigate("dashboard")}>
          ElevenPlus<em> Academy</em><span className="beta-tag">Beta</span>
        </div>
        <div className="nav-app">
          {showBack && (
            <button className="nav-back" onClick={() => navigate("dashboard")}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
              Dashboard
            </button>
          )}
          {showTimer && (
            <div className={`nav-timer${timerState === "urgent" ? " urgent" : timerState === "warn" ? " warn" : ""}`}>
              {formatTime(timerSec)}
            </div>
          )}
          {!showTimer && (
            <>
              <div className="nav-stat" style={{display:"flex"}}>
                ⚡ <b>{xp}</b>&nbsp;XP&nbsp;
                <div className="nav-xp"><div className="nav-xp-f" style={{width:`${(xpInLevel/1000)*100}%`}}/></div>
              </div>
              <div className="nav-stat">🔥 <b>{streak}</b></div>
            </>
          )}
          <div className="nav-avatar-wrap">
            <div className="nav-avatar" onClick={(e) => { e.stopPropagation(); setDdOpen(o => !o); }}>
              {user.name[0]}
            </div>
            {ddOpen && (
              <div className="nav-dd">
                <div className="nav-dd-head">
                  <div className="dd-name">{user.name} User</div>
                  <div className="dd-email">{user.email}</div>
                </div>
                <button className="nav-dd-item" onClick={() => { navigate("dashboard"); setDdOpen(false); }}>🏠 Dashboard</button>
                <button className="nav-dd-item" onClick={() => { navigate("practice"); setDdOpen(false); }}>📝 Practice</button>
                <button className="nav-dd-item" onClick={() => { showToast("💳 Upgrade feature coming soon!"); setDdOpen(false); }}>💳 Upgrade to Pro</button>
                <div className="nav-dd-div"/>
                <button className="nav-dd-item red" onClick={() => navigate("login")}>🚪 Log out</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  const { navigate } = useApp();
  return (
    <footer className="site-footer">
      <div className="foot-inner">
        <div className="foot-brand">
          <div className="logo" style={{cursor:"pointer"}} onClick={() => navigate("dashboard")}>ElevenPlus<em> Academy</em></div>
          <p>UK 11+ exam preparation — Maths, English, Verbal &amp; Non-Verbal Reasoning.</p>
        </div>
        <div className="foot-col">
          <div className="foot-head">Practice</div>
          <a onClick={() => navigate("dashboard")}>Dashboard</a>
          <a onClick={() => navigate("practice")}>Practice Sets</a>
          <a onClick={() => navigate("dashboard")}>Upgrade to Pro</a>
        </div>
        <div className="foot-col">
          <div className="foot-head">Product</div>
          <a>Features</a>
          <a>How it works</a>
          <a>Pricing</a>
        </div>
        <div className="foot-col">
          <div className="foot-head">Legal</div>
          <a>Privacy Policy</a>
          <a>Terms of Service</a>
          <a>Cookie Policy</a>
        </div>
      </div>
      <div className="foot-bar">
        <span>© 2026 ElevenPlus Academy. MVP Demo — practice use only.</span>
        <span>Not affiliated with CGP Books Ltd.</span>
      </div>
    </footer>
  );
}

export function AppFooter() {
  return (
    <footer className="app-footer">
      <div className="app-footer-inner">
        <span className="app-footer-brand">ElevenPlus<em> Academy</em> <span className="beta-tag">Beta</span></span>
        <span className="app-footer-divider"/>
        <span>© 2026 ElevenPlus Academy — practice use only.</span>
      </div>
      <div className="app-footer-links">
        <a>Privacy Policy</a>
        <a>Terms of Service</a>
        <a>Cookie Policy</a>
      </div>
    </footer>
  );
}

export function PaywallModal({ title, onUpgrade, onClose }) {
  return (
    <div className="paywall-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="paywall-card">
        <div className="pw-badge">🔒 Pro Feature</div>
        <h2>Unlock: {title}</h2>
        <p>Get instant access to full past papers with timed exam mode, instant marking, and detailed explanations — all included in Pro.</p>
        <div className="pw-features">
          {[["📝","18 past papers"],["⏱️","Timed exam mode"],["✅","Instant marking"],["📊","Score analytics"]].map(([icon,text]) => (
            <div key={text} className="pw-feat"><span>{icon}</span>{text}</div>
          ))}
        </div>
        <button className="pw-btn-pro" onClick={onUpgrade}>⚡ Upgrade to Pro — £9.99/mo</button>
        <button className="pw-btn-cancel" onClick={onClose}>Maybe later</button>
        <p className="pw-note">Cancel anytime · No commitment · Instant access</p>
      </div>
    </div>
  );
}
