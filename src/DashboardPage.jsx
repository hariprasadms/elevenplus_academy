import { useState } from "react";
import { useApp } from "./AppContext";
import { Header, AppFooter, PaywallModal } from "./SharedComponents";

/* ═══════════════════════════════════════════════════════════
   DASHBOARD PAGE
═══════════════════════════════════════════════════════════ */
export default function DashboardPage() {
  const { navigate, xp, streak, totalCorrect, setProgress, activity, upgradeToProFn, showToast, level, levelName, xpInLevel } = useApp();
  const [paywallFor, setPaywallFor] = useState(null);

  const sets = [
    { id:"A", icon:"📖", badge:"Set A", name:"Core Foundations", desc:"Maths, English, Verbal & Non-Verbal Reasoning — the essential 11+ building blocks.", total:40 },
    { id:"B", icon:"🎯", badge:"Set B", name:"CGP Assessment", desc:"Authentic CGP-style 11+ Maths questions — serious exam-level practice.", total:30 },
    { id:"C", icon:"🏆", badge:"Set C", name:"Mixed Challenge", desc:"Advanced mixed questions across all subjects — the ultimate 11+ challenge.", total:30 },
  ];

  const papers = [
    { id:"maths-2020", type:"maths", subject:"Maths", year:"2020", name:"Secondary Entrance Sample Test 2020", q:40, time:"45 min", locked:false },
    { id:"maths-2021", type:"maths", subject:"Maths", year:"2021", name:"Secondary Entrance Sample Test 2021", q:40, time:"45 min", locked:true },
    { id:"english-2020", type:"english", subject:"English", year:"2020", name:"Secondary Entrance English Test 2020", q:35, time:"40 min", locked:true },
    { id:"verbal-2020", type:"verbal", subject:"Verbal", year:"2020", name:"Secondary Entrance Verbal Reasoning 2020", q:50, time:"50 min", locked:true },
  ];

  const days = ["M","T","W","T","F","S","S"];

  const subjectPerf = [
    { label:"Maths", pct:75, color:"var(--a)" },
    { label:"English", pct:60, color:"var(--ok)" },
    { label:"Verbal", pct:80, color:"var(--b)" },
    { label:"Non-Verbal", pct:50, color:"var(--c)" },
  ];

  return (
    <>
      <Header />
      {paywallFor && (
        <PaywallModal
          title={paywallFor}
          onUpgrade={() => { upgradeToProFn(); setPaywallFor(null); }}
          onClose={() => setPaywallFor(null)}
        />
      )}

      {/* Welcome */}
      <div className="welcome">
        <div className="welcome-inner">
          <div className="welcome-text">
            <h1>Welcome back, <em>Demo!</em> 👋</h1>
            <p>{streak}-day streak — keep it up! Set A is {setProgress.A}% complete.</p>
          </div>
          <div className="w-stats">
            <div className="wstat"><div className="wstat-v">{streak}</div><div className="wstat-l">Streak 🔥</div></div>
            <div className="wstat"><div className="wstat-v">{xp}</div><div className="wstat-l">XP ⚡</div></div>
            <div className="wstat"><div className="wstat-v">{totalCorrect}</div><div className="wstat-l">Correct ✅</div></div>
          </div>
        </div>
      </div>

      <div className="dash-body">
        {/* LEFT */}
        <div>
          {/* Practice Sets */}
          <div className="section">
            <div className="section-head">
              <div className="section-title">Practice Sets</div>
              <span className="section-link" onClick={() => navigate("practice")}>Open practice →</span>
            </div>
            <div className="set-list">
              {sets.map(s => {
                const done = Math.round(setProgress[s.id] / 100 * s.total);
                return (
                  <div key={s.id} className="set-card" onClick={() => navigate("practice")}>
                    <div className={`sc-icon sc-icon-${s.id.toLowerCase()}`}>{s.icon}</div>
                    <div className="sc-mid">
                      <div className="sc-top">
                        <span className={`sc-badge sc-badge-${s.id.toLowerCase()}`}>{s.badge}</span>
                        <span className="sc-name">{s.name}</span>
                      </div>
                      <div className="sc-desc">{s.desc}</div>
                      <div className="sc-prog">
                        <div className="sc-bar-wrap">
                          <div className={`sc-bar-fill sc-bar-${s.id.toLowerCase()}`} style={{ width:`${setProgress[s.id]}%` }}/>
                        </div>
                        <span className="sc-prog-text">
                          {setProgress[s.id] === 0 ? `Not started · ${s.total} questions` : `${setProgress[s.id]}% · ${done} / ${s.total} done`}
                        </span>
                      </div>
                    </div>
                    <div className="sc-right">
                      <button className={`sc-btn sc-btn-${s.id.toLowerCase()}`} onClick={e => { e.stopPropagation(); navigate("practice"); }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21"/></svg>
                        {setProgress[s.id] > 0 ? "Continue" : "Start"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Premium Papers */}
          <div className="premium-section">
            <div className="premium-header">
              <div className="premium-title-wrap">
                <div className="section-title">Premium Test Papers</div>
                <div className="prem-badge">🔒 Pro</div>
              </div>
              <span className="section-link" onClick={() => showToast("⚡ Upgrade to Pro to access all 18 test papers")}>View all →</span>
            </div>
            <div className="paper-grid">
              {papers.map(p => (
                <div key={p.id} className={`paper-card ${p.type}`} onClick={() => p.locked ? setPaywallFor(p.name) : navigate("test")}>
                  <div className="pc-top">
                    <div className="pc-tags">
                      <span className={`pc-tag pc-tag-${p.type}`}>{p.subject}</span>
                      <span className="pc-tag pc-tag-yr">{p.year}</span>
                    </div>
                    <div className={`pc-lock${p.locked ? "" : " open"}`}>{p.locked ? "🔒" : "✓"}</div>
                  </div>
                  <div className="pc-name">{p.name.split("2")[0]}<br/>{p.name.includes("2") ? "— " + p.name.split("— ")[1] || p.name.slice(p.name.indexOf("2")) : ""}</div>
                  <div className="pc-meta">
                    <span className="pc-m">📋 {p.q} questions</span>
                    <span className="pc-m">⏱ {p.time}</span>
                  </div>
                  <div className="pc-foot">
                    <span className="pc-score-pill">{p.locked ? "Pro only" : "Not attempted"}</span>
                    <span className="pc-action" style={{ color: p.locked ? "#7c3aed" : "#059669" }}>
                      {p.locked ? "🔒 Unlock →" : "Start test →"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="upgrade-banner">
              <div className="ub-icon">⚡</div>
              <div className="ub-text">
                <h4>Unlock all 18 past papers with Pro</h4>
                <p>Maths, English, Verbal & Non-Verbal — timed, marked, with full explanations.</p>
              </div>
              <button className="ub-btn" onClick={() => setPaywallFor("Pro Plan")}>Upgrade — £9.99/mo</button>
            </div>
          </div>

          {/* Activity */}
          <div className="section">
            <div className="section-head"><div className="section-title">Recent Activity</div></div>
            <div className="act-list">
              {activity.slice(0, 5).map((a, i) => {
                const cls = a.score / a.q >= .8 ? "score-ok" : a.score / a.q >= .6 ? "score-mid" : "score-bad";
                return (
                  <div key={i} className="act-row">
                    <div className="act-icon">📝</div>
                    <div className="act-info">
                      <div className="act-name">{a.set} — Practice Test</div>
                      <div className="act-meta">{a.date} · {a.q} questions · {a.t}</div>
                    </div>
                    <div className={`act-score ${cls}`}>{a.score} / {a.q}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="sidebar">
          <div className="card xp-card">
            <div className="card-title">⚡ Your Level</div>
            <div className="xp-lv">
              <div className="xp-lv-n">{level}</div>
              <div className="xp-lv-l">{levelName}</div>
            </div>
            <div className="xp-bar"><div className="xp-bar-f" style={{ width:`${(xpInLevel/1000)*100}%` }}/></div>
            <div className="xp-note">{xpInLevel} / 1,000 XP to Level {level+1}</div>
          </div>

          <div className="card streak-card">
            <div className="card-title">🔥 Streak</div>
            <div className="streak-n">{streak}</div>
            <div className="streak-sub">days in a row — brilliant!</div>
            <div className="streak-days">
              {days.map((d, i) => {
                const cls = i < streak - 1 ? "done" : i === streak - 1 ? "today" : "";
                return <div key={i} className={`sd ${cls}`}>{d}</div>;
              })}
            </div>
          </div>

          <div className="card">
            <div className="card-title">📊 Subject Performance</div>
            <div className="bk-rows">
              {subjectPerf.map(s => (
                <div key={s.label} className="bk-row">
                  <div className="bk-l">{s.label}</div>
                  <div className="bk-track"><div className="bk-fill" style={{ width:`${s.pct}%`, background:s.color }}/></div>
                  <div className="bk-p" style={{fontSize:".72rem",fontWeight:700,color:"var(--text)",width:28,textAlign:"right"}}>{s.pct}%</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card up-card">
            <div className="card-title">🚀 Unlock Pro</div>
            <p>PDF papers, progress analytics and full parent dashboard.</p>
            <button className="up-btn" onClick={() => setPaywallFor("Pro Plan")}>View plans →</button>
          </div>
        </div>
      </div>

      <AppFooter />
    </>
  );
}
