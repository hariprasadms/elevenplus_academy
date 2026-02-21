import { useState } from "react";
import { useApp } from "./AppContext";

/* ═══════════════════════════════════════════════════════════
   LOGIN PAGE
═══════════════════════════════════════════════════════════ */
const DEMO_EMAIL = "demo@elevenplus.ac.uk";
const DEMO_PASS = "Demo1234";

export default function LoginPage() {
  const { navigate } = useApp();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [remember, setRemember] = useState(false);

  const doLogin = () => {
    setError(""); setSuccess(false);
    if (!email || !pass) { setError("Please enter both email and password."); return; }
    setLoading(true);
    setTimeout(() => {
      if (email.toLowerCase() === DEMO_EMAIL && pass === DEMO_PASS) {
        setSuccess(true);
        setTimeout(() => navigate("dashboard"), 1200);
      } else {
        setLoading(false);
        setError(email.toLowerCase() !== DEMO_EMAIL ? "Email not found. Use the demo credentials above." : "Incorrect password. Use the demo credentials above.");
      }
    }, 900);
  };

  return (
    <div style={{ minHeight:"calc(100vh - 64px)", display:"flex", flexDirection:"column" }}>
      <div className="login-wrap" style={{ flex:1 }}>
        <div className="panel-left">
          <div className="orb" style={{ width:300, height:300, background:"var(--gold)", top:-80, right:-60 }}/>
          <div className="orb" style={{ width:220, height:220, background:"#2a7ad4", bottom:-50, left:-40 }}/>
          <div className="panel-inner">
            <div className="eyebrow">🎓 UK 11+ Preparation</div>
            <h2>Welcome back to<br/><em>ElevenPlus Academy</em></h2>
            <p>Pick up right where you left off. Your practice sets, XP and progress are all waiting.</p>
            <div className="perks">
              {[["📝","80+ CGP-style practice questions"],["⚡","Instant marking & detailed explanations"],["🏆","XP rewards & streak tracking"],["📄","Downloadable PDF practice papers"]].map(([icon,text]) => (
                <div key={text} className="perk"><div className="perk-icon">{icon}</div>{text}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="panel-right">
          <div className="login-card">
            <h1>Log in</h1>
            <p className="login-subtitle">Enter your details to access your dashboard.</p>

            <div className="demo-box">
              <div className="demo-title">💡 Demo credentials — click Fill to auto-fill</div>
              <div className="demo-row">
                <span className="demo-lbl">Email</span>
                <span className="demo-val">{DEMO_EMAIL}</span>
                <button className="fill-btn" onClick={() => setEmail(DEMO_EMAIL)}>Fill</button>
              </div>
              <div className="demo-row">
                <span className="demo-lbl">Password</span>
                <span className="demo-val">{DEMO_PASS}</span>
                <button className="fill-btn" onClick={() => setPass(DEMO_PASS)}>Fill</button>
              </div>
            </div>

            {error && <div className="alert alert-err">⚠️ {error}</div>}
            {success && <div className="alert alert-ok">✅ Login successful! Redirecting…</div>}

            <div className="field">
              <label>Email address</label>
              <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && doLogin()} />
            </div>
            <div className="field">
              <label>Password</label>
              <div className="pw-wrap">
                <input type={showPass ? "text" : "password"} placeholder="Enter your password" value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === "Enter" && doLogin()} />
                <button className="pw-eye" onClick={() => setShowPass(v => !v)}>
                  {showPass ? "🙈" : "👁"}
                </button>
              </div>
            </div>
            <div className="form-opts">
              <label className="remember"><input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} /> Remember me</label>
              <span className="forgot">Forgot password?</span>
            </div>

            <button className="btn-submit-login" onClick={doLogin} disabled={loading || success}>
              {loading && <div className="spinner-sm"/>}
              {success ? "Success! ✓" : loading ? "Logging in…" : "Log in to my account"}
            </button>
            <div className="divider-row">or</div>
            <button className="btn-register">Create a free account</button>
            <p className="terms">By logging in you agree to our <span>Terms of Service</span> and <span>Privacy Policy</span>.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
