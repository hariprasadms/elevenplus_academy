import { useState, useEffect, useRef, useCallback } from "react";
import { useApp } from "./AppContext";
import { Header, AppFooter, Confetti } from "./SharedComponents";

/* ═══════════════════════════════════════════════════════════
   TEST PAGE (Premium Timed Paper)
═══════════════════════════════════════════════════════════ */
const LETTERS = ["A","B","C","D"];

const MATHS_2020 = [
  { n:1, cat:"Area & Shapes", text:"A factory makes 4,596 nails in a week. 2,914 are sold. How many remain?", opts:["1,682","1,772","1,582","1,882"], ans:0, explain:"4,596 − 2,914 = 1,682." },
  { n:2, cat:"Fractions", text:"What is ⅗ of 60?", opts:["21","24","36","30"], ans:2, explain:"60÷5=12; 12×3=36." },
  { n:3, cat:"Rounding", text:"47,983 rounded to the nearest thousand:", opts:["47,000","50,000","48,000","47,900"], ans:2, explain:"Hundreds digit=9 (≥5), round up: 48,000." },
  { n:4, cat:"Sequences", text:"Next number: 23, 35, 47, 59, ___", opts:["69","71","70","68"], ans:1, explain:"+12 each time. 59+12=71." },
  { n:5, cat:"Division", text:"Winston packs 106 eggs into boxes of 6. How many complete boxes?", opts:["15","16","17","18"], ans:2, explain:"106÷6=17 remainder 4. Answer: 17 boxes." },
  { n:6, cat:"Probability", text:"Two fair dice rolled, scores added. P(total=7)?", opts:["1/9","1/3","1/6","1/5"], ans:2, explain:"6 ways to score 7 out of 36 outcomes = 6/36 = 1/6." },
  { n:7, cat:"Averages", text:"10 students scored: 16, 11, 15, 17, 11, 20, 14, 11, 15, 18. Mode and range?", opts:["Mode:15; Range:9","Mode:15; Range:7","Mode:11; Range:9","Mode:11; Range:10"], ans:2, explain:"Mode=11 (3 times). Range=20-11=9." },
  { n:8, cat:"Indices", text:"Solve: 15² ÷ 3²", opts:["5","25","122","24"], ans:1, explain:"225÷9=25." },
  { n:9, cat:"Percentages", text:"Wilbert buys 9 pens at £1.20 each with 40% discount. How much does he save?", opts:["£6.48","£0.48","£2.70","£4.32"], ans:3, explain:"Total=£10.80. 40% saving=£4.32." },
  { n:10, cat:"Negative Numbers", text:"Ireland=3°C, Romania=−3°C. Difference?", opts:["9°C","0°C","1°C","6°C"], ans:3, explain:"3−(−3)=6°C." },
  { n:11, cat:"Exchange Rates", text:"£1=8.80 Yuan. Jumper=220 Yuan, scarf=132 Yuan. 1 jumper + 2 scarves in pounds?", opts:["£49","£52","£56","£55"], ans:3, explain:"220+264=484 Yuan. 484÷8.80=£55." },
  { n:12, cat:"Place Value", text:"Twelve million + thirty thousand + one thousand + forty-nine =", opts:["12,031,049","12,030,149","12,003,149","12,301,049"], ans:0, explain:"12,000,000+30,000+1,000+49=12,031,049." },
  { n:13, cat:"Money", text:"Sean & Ravi: 2 coffees at £2.30 each, cake £1.20, 10% tip. Change from £10?", opts:["£6.38","£3.62","£3.38","£3.48"], ans:1, explain:"2×2.30+1.20=5.80. Tip=0.58. Total=6.38. Change=£3.62." },
  { n:14, cat:"Multiplication", text:"What is 21.7 × 9.4?", opts:["203.98","287.68","117.24","412.96"], ans:0, explain:"21.7×9.4=203.98." },
  { n:15, cat:"Fractions", text:"A teacher marks 48 questions; 16 are wrong. What fraction were right?", opts:["1/2","2/3","1/4","1/3"], ans:1, explain:"Right=32. 32/48=2/3." },
  { n:16, cat:"Algebra", text:"If b=8, what is y? Equation: 12b + 6 × 7 = y", opts:["138","135","128","62"], ans:0, explain:"12×8+6×7=96+42=138." },
  { n:17, cat:"Age Problem", text:"My age is a multiple of 5. Next year it will be a multiple of 6. I'm between 10 and 60. How old?", opts:["30","25","42","35"], ans:3, explain:"35+1=36=6×6. Answer: 35." },
  { n:18, cat:"Rounding", text:"What is ¼ of 37 rounded to the nearest whole number?", opts:["9.2","9.3","10","9"], ans:3, explain:"37÷4=9.25≈9." },
  { n:19, cat:"Speed", text:"Kuran's car: 210 miles in 210 minutes. Speed in mph?", opts:["10 mph","1 mph","40 mph","60 mph"], ans:3, explain:"210 min=3.5 hrs. 210÷3.5=60 mph." },
  { n:20, cat:"BODMAS", text:"9 + 8 ÷ 4 = 44 ÷ ?", opts:["4","5","6","7"], ans:0, explain:"Left=9+2=11. 44÷?=11 → ?=4." },
];

export default function TestPage() {
  const { navigate, isPro, upgradeToProFn, addXp } = useApp();
  const [showPaywall, setShowPaywall] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [isFullMode, setIsFullMode] = useState(false);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timerSec, setTimerSec] = useState(45 * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [elapsedSec, setElapsedSec] = useState(0);
  const startTimeRef = useRef(null);
  const timerRef = useRef(null);

  const DEMO_LIMIT = 5;
  const limit = isFullMode ? MATHS_2020.length : DEMO_LIMIT;
  const questions = MATHS_2020.slice(0, limit);

  const startTimer = () => {
    startTimeRef.current = Date.now();
    setTimerRunning(true);
  };

  useEffect(() => {
    if (!timerRunning) return;
    timerRef.current = setInterval(() => {
      setTimerSec(s => {
        if (s <= 1) { clearInterval(timerRef.current); handleSubmit(); return 0; }
        return s - 1;
      });
      setElapsedSec(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [timerRunning]);

  const timerState = timerSec <= 300 ? "urgent" : timerSec <= 600 ? "warn" : "";

  const handleUpgrade = () => {
    upgradeToProFn();
    setShowPaywall(false);
    setIsFullMode(true);
    setIsDemoMode(false);
    startTimer();
  };

  const handleDemoAccess = () => {
    setShowPaywall(false);
    setIsDemoMode(true);
    startTimer();
  };

  const handleAnswer = (n, choice) => {
    if (answers[n] !== undefined) return;
    setAnswers(prev => ({ ...prev, [n]: choice }));
  };

  const answeredCount = Object.keys(answers).length;

  const handleSubmit = useCallback(() => {
    clearInterval(timerRef.current);
    setTimerRunning(false);
    setShowResults(true);
  }, []);

  useEffect(() => {
    if (answeredCount >= limit && timerRunning) {
      setTimeout(handleSubmit, 600);
    }
  }, [answeredCount, limit, timerRunning]);

  const score = MATHS_2020.slice(0, limit).reduce((acc, q) => acc + (answers[q.n] === q.ans ? 1 : 0), 0);
  const pct = limit > 0 ? score / limit : 0;
  const wrong = answeredCount - score;
  const circumference = 339.3;
  const arcOffset = circumference * (1 - pct);
  const arcRef = useRef(null);

  useEffect(() => {
    if (showResults && arcRef.current) {
      setTimeout(() => { if (arcRef.current) arcRef.current.style.strokeDashoffset = arcOffset; }, 100);
    }
  }, [showResults]);

  const pad = (n) => String(n).padStart(2, "0");
  const formatTime = (s) => `${pad(Math.floor(s/60))}:${pad(s%60)}`;

  return (
    <>
      {showPaywall && (
        <div className="paywall-overlay" onClick={(e) => { if (e.target === e.currentTarget) navigate("dashboard"); }}>
          <div className="paywall-card">
            <div className="pay-badge" style={{display:"inline-flex",alignItems:"center",gap:7,background:"var(--pro-bg)",color:"var(--pro)",fontSize:".72rem",fontWeight:700,letterSpacing:"1.5px",textTransform:"uppercase",padding:"5px 14px",borderRadius:20,marginBottom:20}}>🔒 Pro Content</div>
            <h2>Unlock Full Practice Papers</h2>
            <p>This is a real Secondary Entrance exam paper. Access 40 timed questions with instant marking, explanations, and analytics — included in Pro.</p>
            <div className="pw-features">
              {[["📝","Full past papers"],["⏱️","Timed exam mode"],["📊","Score analytics"],["✅","Instant answers"],["🔁","Unlimited retakes"],["📄","PDF downloads"]].map(([i,t]) => (
                <div key={t} className="pw-feat"><span>{i}</span>{t}</div>
              ))}
            </div>
            <button className="pw-btn-pro" onClick={handleUpgrade}>⚡ Upgrade to Pro — £9.99/mo</button>
            <button className="pw-btn-cancel" onClick={handleDemoAccess}>Try Demo (first 5 questions free)</button>
            <p className="pw-note">Cancel anytime · No commitments · Instant access</p>
          </div>
        </div>
      )}

      <Header showBack showTimer timerSec={timerSec} timerState={timerState} />

      <div className="test-banner">
        <div className="banner-inner">
          <div className="banner-tags">
            <span className="btag btag-pro">🔒 Pro</span>
            <span className="btag btag-sub">Maths</span>
            <span className="btag btag-sub">Secondary Entrance</span>
          </div>
          <h1>Maths — Sample Test 2020</h1>
          <p>Full practice paper in the style of Secondary Entrance exam papers. 40 questions covering all key 11+ Maths topics.</p>
          <div className="banner-meta">
            <span className="bmeta">📋 <strong>40 questions</strong></span>
            <span className="bmeta">⏱️ <strong>45 minutes</strong></span>
            <span className="bmeta">🔓 <strong>{isFullMode ? "Pro — all 40 questions" : isDemoMode ? "Demo — 5 questions" : "Choose access"}</strong></span>
          </div>
        </div>
      </div>

      <div className="test-main-area">
        <div className="prog-row">
          <span className="prog-text">Progress</span>
          <span className="prog-count">{answeredCount} / {limit}</span>
        </div>
        <div className="prog-wrap">
          <div className="prog-fill prog-fill-pro" style={{ width:`${(answeredCount/limit)*100}%` }}/>
        </div>

        {!showResults && questions.map((q) => {
          const state = answers[q.n];
          const isAnswered = state !== undefined;
          const correct = state === q.ans;
          const cardCls = `q-card q-card-pro${isAnswered ? (correct ? " correct-card" : " wrong-card") : ""}`;
          return (
            <div key={q.n} className={cardCls} style={{ animationDelay:`${(q.n-1)*0.03}s` }}>
              <div className="q-head">
                <div className="q-num q-num-pro">{q.n}</div>
                <div className="q-meta">
                  <div className="q-cat q-cat-pro">{q.cat}</div>
                  <div className="q-text" dangerouslySetInnerHTML={{__html: q.text.replace(/\n/g,"<br/>")}} />
                </div>
              </div>
              <div className="options">
                {q.opts.map((opt, oi) => {
                  let cls = "opt";
                  if (isAnswered) {
                    cls += " opt-disabled";
                    if (oi === state) cls += (correct ? " opt-correct" : " opt-wrong");
                    else if (oi === q.ans && !correct) cls += " opt-reveal";
                  }
                  return (
                    <div key={oi} className={cls} onClick={() => !isAnswered && handleAnswer(q.n, oi)}>
                      <div className="opt-letter">{LETTERS[oi]}</div>
                      <span>{opt}</span>
                    </div>
                  );
                })}
              </div>
              {isAnswered && (
                <div className={`feedback ${correct ? "fb-ok" : "fb-err"}`}>
                  <strong>{correct ? "✓ Correct!" : "✗ Incorrect."}</strong> {q.explain}
                </div>
              )}
            </div>
          );
        })}

        {isDemoMode && !showResults && (
          <div className="demo-notice">
            <div style={{fontSize:"1.5rem",marginBottom:8}}>🔒</div>
            <div style={{fontFamily:"'Fraunces',serif",fontSize:"1.1rem",fontWeight:700,color:"var(--pro)",marginBottom:6}}>Questions 6–40 are Pro only</div>
            <div style={{fontSize:".85rem",color:"var(--muted)",marginBottom:16}}>Upgrade to access the full 40-question paper.</div>
            <button className="pw-btn-pro" style={{width:"auto",padding:"12px 28px"}} onClick={() => { upgradeToProFn(); setIsDemoMode(false); setIsFullMode(true); }}>⚡ Upgrade to Pro</button>
          </div>
        )}

        {!showResults && (
          <div className="test-foot" style={{textAlign:"center",marginTop:32}}>
            <button className="btn-submit-pro" onClick={handleSubmit}>Submit Test &amp; See Results</button>
          </div>
        )}

        {showResults && (
          <div className="results-panel" style={{marginTop:24}}>
            <div className="score-wrap">
              <svg className="score-svg" width="130" height="130" viewBox="0 0 130 130">
                <circle className="score-track" cx="65" cy="65" r="54"/>
                <circle className="score-arc" ref={arcRef} cx="65" cy="65" r="54"
                  style={{ stroke:"var(--pro)", strokeDashoffset: circumference }} />
              </svg>
              <div className="score-inner">
                <div className="score-num">{score}</div>
                <div className="score-den">/ {limit}</div>
              </div>
            </div>
            <h2>{pct >= .8 ? "🏆 Excellent work!" : pct >= .6 ? "👍 Good effort!" : "📚 Keep practising!"}</h2>
            <p>
              {pct >= .8 ? "Outstanding score! You're well prepared for the 11+." : "Review the questions you missed and try again."}
              {isDemoMode ? " Upgrade to Pro to attempt all 40 questions!" : ""}
            </p>
            <div className="results-stats">
              <div className="rstat"><div className="rstat-val">{score}</div><div className="rstat-lbl">Correct</div></div>
              <div className="rstat"><div className="rstat-val">{wrong}</div><div className="rstat-lbl">Wrong</div></div>
              <div className="rstat"><div className="rstat-val">{Math.round(pct*100)}%</div><div className="rstat-lbl">Score</div></div>
              <div className="rstat"><div className="rstat-val">{formatTime(elapsedSec)}</div><div className="rstat-lbl">Time used</div></div>
            </div>
            <div className="results-btns">
              <button className="btn-restart" onClick={() => { setAnswers({}); setShowResults(false); setTimerSec(45*60); setElapsedSec(0); setTimerRunning(false); setTimeout(startTimer, 100); }}>🔁 Retake Test</button>
              <button className="btn-outline-n" onClick={() => navigate("dashboard")}>🏠 Dashboard</button>
            </div>
            {pct >= .8 && <Confetti active />}
          </div>
        )}
      </div>

      <AppFooter />
    </>
  );
}
