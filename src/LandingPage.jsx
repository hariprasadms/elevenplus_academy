import { useState } from "react";
import { useApp } from "./AppContext";

/* ═══════════════════════════════════════════════════════════
   LANDING PAGE
═══════════════════════════════════════════════════════════ */
export default function LandingPage() {
  const { navigate } = useApp();
  const [mobOpen, setMobOpen] = useState(false);
  const [yearly, setYearly] = useState(false);

  const p2 = yearly ? "7" : "9";
  const p2n = yearly ? "£84 billed yearly" : "Billed monthly · Cancel any time";
  const p3 = yearly ? "12" : "15";
  const p3n = yearly ? "£144 billed yearly" : "Billed monthly · Cancel any time";

  const features = [
    { icon:"📖", cls:"fi-gold", title:"Authentic Practice Tests", desc:"80+ questions modelled on real CGP and GL Assessment style papers — exactly what your child will see on exam day." },
    { icon:"⚡", cls:"fi-blue", title:"Instant Feedback", desc:"Every answer is marked immediately with a clear explanation, helping children understand mistakes and learn faster." },
    { icon:"🏆", cls:"fi-purple", title:"XP & Streak Rewards", desc:"Gamified learning keeps children motivated. Earn XP for correct answers and build streaks that encourage daily practice." },
    { icon:"🎯", cls:"fi-green", title:"3 Difficulty Sets", desc:"Start with Core Foundations, progress through CGP Assessment, then master the Mixed Challenge set as confidence grows." },
    { icon:"📊", cls:"fi-teal", title:"Progress Tracking", desc:"Subject-by-subject performance breakdowns let you spot weak areas and focus revision exactly where it's needed most." },
    { icon:"📄", cls:"fi-red", title:"PDF Paper Download", desc:"Print professional practice papers with full answer keys — perfect for timed exam simulation at the kitchen table." },
  ];

  const subjects = [
    { cls:"sA", emoji:"✏️", title:"Mathematics", desc:"Speed, fractions, percentages, ratios, geometry, algebra, sequences, word problems and more — all at 11+ level.", tagCls:"tagA", tag:"Core · CGP · Mixed" },
    { cls:"sB", emoji:"📖", title:"English", desc:"Vocabulary, grammar, punctuation, comprehension, similes, metaphors, and creative writing techniques.", tagCls:"tagB", tag:"Core · Mixed" },
    { cls:"sC", emoji:"🤔", title:"Verbal Reasoning", desc:"Word analogies, codes, letter sequences, odd-one-out, word connections and logic challenges.", tagCls:"tagC", tag:"Core · Mixed" },
    { cls:"sD", emoji:"🔷", title:"Non-Verbal Reasoning", desc:"3D shapes, symmetry, rotations, reflections, nets, surface area, patterns and spatial reasoning.", tagCls:"tagD", tag:"Core · Mixed" },
  ];

  const testimonials = [
    { init:"SR", name:"Sarah R.", role:"Parent · Birmingham", text:'\u201cMy daughter went from dreading maths to asking for extra practice sessions. The XP system is genuinely brilliant \u2014 she treats it like a game.\u201d' },
    { init:"MK", name:"Michael K.", role:"Parent · London", text:'\u201cThe question quality is excellent \u2014 clearly written by people who know the 11+ inside and out. The explanations are really clear too.\u201d' },
    { init:"JP", name:"Jenny P.", role:"Parent · Manchester", text:'\u201cBrilliant value. We\u2019ve tried three other platforms and this has the best questions by far. My son passed his grammar school entrance \u2014 I\u2019m certain this helped.\u201d' },
  ];

  const freeFeats  = [["ok","10 questions per session"],["ok","Set A: Core Foundations"],["ok","Instant feedback"],["ok","XP & streaks"],["no","Verbal & Non-Verbal Reasoning"],["no","PDF download"],["no","All 3 question sets"]];
  const examFeats  = [["ok","Everything in Starter"],["ok","All 3 question sets (80+ Qs)"],["ok","All 4 subjects"],["ok","PDF paper download"],["ok","Shuffle & randomise"],["ok","Detailed explanations"],["no","Progress analytics"]];
  const proFeats   = [["ok","Everything in Exam Prep"],["ok","Progress analytics"],["ok","Parent dashboard"],["ok","Subject breakdown reports"],["ok","Weakness identification"],["ok","Printable progress reports"],["ok","Priority support"]];

  return (
    <>
      {/* ── HEADER ────────────────────────────────────────── */}
      <header className="header">
        <div className="hdr">
          <div className="logo" onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}>
            ElevenPlus<em> Academy</em><span className="beta-tag">Beta</span>
          </div>
          <nav className={`nav-pub${mobOpen ? " open" : ""}`}>
            <a className="nav-link active" href="#features" onClick={() => setMobOpen(false)}>Features</a>
            <a className="nav-link" href="#how" onClick={() => setMobOpen(false)}>How it works</a>
            <a className="nav-link" href="#pricing" onClick={() => setMobOpen(false)}>Pricing</a>
            <button className="nav-ghost" onClick={() => navigate("login")}>Log in</button>
            <button className="nav-cta" onClick={() => navigate("login")}>Start Free Trial</button>
          </nav>
          <button className="mob-btn" onClick={() => setMobOpen(o => !o)} aria-label="Toggle menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
      </header>

      {/* ── HERO ──────────────────────────────────────────── */}
      <div className="land-hero">
        <div className="orb orb1"/>
        <div className="orb orb2"/>
        <div className="hero-inner">
          <div className="hero-eyebrow">🏆 Trusted by 2,000+ UK Families</div>
          <h1>The smarter way to<br/>pass the <em>11 Plus.</em></h1>
          <p className="hero-sub">Authentic CGP-style practice tests, instant feedback, XP rewards, and everything your child needs to walk into the exam with confidence.</p>
          <div className="hero-btns">
            <button className="btn-hero-primary" onClick={() => navigate("login")}>Start Free Trial — No Card Needed</button>
            <a className="btn-hero-secondary" href="#how">See how it works</a>
          </div>
          <div className="hero-stats">
            <div className="hstat"><div className="hstat-num">80+</div><div className="hstat-lbl">Practice Questions</div></div>
            <div className="hero-divider"/>
            <div className="hstat"><div className="hstat-num">4</div><div className="hstat-lbl">Exam Subjects</div></div>
            <div className="hero-divider"/>
            <div className="hstat"><div className="hstat-num">3</div><div className="hstat-lbl">Difficulty Sets</div></div>
            <div className="hero-divider"/>
            <div className="hstat"><div className="hstat-num">100%</div><div className="hstat-lbl">UK Curriculum</div></div>
          </div>
        </div>
      </div>

      {/* ── TRUST BAR ─────────────────────────────────────── */}
      <div className="trust-bar">
        <div className="trust-inner">
          {[["✅","No credit card required"],["🔓","Cancel any time"],["📋","CGP-style questions"],["⚡","Instant feedback & XP"],["🏫","Grammar school focused"]].map(([icon,text]) => (
            <div key={text} className="trust-item"><span className="trust-icon">{icon}</span>{text}</div>
          ))}
        </div>
      </div>

      {/* ── FEATURES ──────────────────────────────────────── */}
      <section className="land-section features-bg" id="features">
        <div className="section-inner">
          <div className="section-eyebrow text-center">Why ElevenPlus Academy</div>
          <h2 className="section-title text-center">Everything your child needs<br/>to succeed</h2>
          <p className="section-sub centered">Built by 11+ experts and parents. Every feature is designed around how children actually learn best.</p>
          <div className="features-grid">
            {features.map(f => (
              <div key={f.title} className="feat-card">
                <div className={`feat-icon ${f.cls}`}>{f.icon}</div>
                <div className="feat-title">{f.title}</div>
                <div className="feat-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────── */}
      <section className="land-section how-bg" id="how">
        <div className="section-inner">
          <div className="section-eyebrow text-center">Simple to get started</div>
          <h2 className="section-title text-center">Up and running in minutes</h2>
          <p className="section-sub centered">No setup required. Just sign up and your child can start their first practice test immediately.</p>
          <div className="steps">
            {[
              { n:"1", title:"Create your free account", desc:"Sign up in seconds — no credit card needed. Start exploring straight away." },
              { n:"2", title:"Choose a practice set", desc:"Pick Set A, B or C based on your child's current level and the exam they're preparing for." },
              { n:"3", title:"Track & improve", desc:"Review results, read explanations, earn XP, and watch scores climb week by week." },
            ].map(s => (
              <div key={s.n} className="step">
                <div className="step-num">{s.n}</div>
                <div className="step-title">{s.title}</div>
                <div className="step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUBJECTS ──────────────────────────────────────── */}
      <section className="land-section subjects-bg">
        <div className="section-inner">
          <div className="section-eyebrow text-center">Curriculum coverage</div>
          <h2 className="section-title text-center">All four 11+ subjects covered</h2>
          <p className="section-sub centered">ElevenPlus Academy covers every subject tested in UK grammar school entrance exams.</p>
          <div className="subjects-grid">
            {subjects.map(s => (
              <div key={s.title} className={`subj-card ${s.cls}`}>
                <div className="subj-emoji">{s.emoji}</div>
                <div>
                  <div className="subj-title">{s.title}</div>
                  <div className="subj-desc">{s.desc}</div>
                  <span className={`subj-tag ${s.tagCls}`}>{s.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────── */}
      <div className="testi-bg">
        <div className="section-inner">
          <div className="section-eyebrow text-center" style={{color:"var(--gold-l)"}}>What parents say</div>
          <h2 className="section-title text-center" style={{color:"#fff",marginBottom:"36px"}}>Families love ElevenPlus Academy</h2>
          <div className="testi-grid">
            {testimonials.map(t => (
              <div key={t.name} className="testi-card">
                <div className="testi-stars">★★★★★</div>
                <div className="testi-text">{t.text}</div>
                <div className="testi-author">
                  <div className="testi-avatar">{t.init}</div>
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PRICING ───────────────────────────────────────── */}
      <section className="land-section pricing-bg" id="pricing">
        <div className="section-inner">
          <div className="section-eyebrow text-center">Simple pricing</div>
          <h2 className="section-title text-center">Start free. Upgrade when ready.</h2>
          <p className="section-sub centered">Every plan includes a free trial. No hidden fees, no long-term contracts.</p>

          <div className="billing-toggle">
            <span className={`toggle-lbl${!yearly ? " on" : ""}`}>Monthly</span>
            <div className={`tog-track${yearly ? " active" : ""}`} onClick={() => setYearly(y => !y)} role="switch" aria-checked={yearly}>
              <div className="tog-thumb"/>
            </div>
            <span className={`toggle-lbl${yearly ? " on" : ""}`}>Yearly</span>
            {yearly && <span className="save-pill">Save 20%</span>}
          </div>

          <div className="pricing-grid">
            {/* STARTER */}
            <div className="p-card">
              <div className="p-accent acc-free"/>
              <div className="p-body">
                <div className="p-icon">🆓</div>
                <div className="p-name">Starter</div>
                <div className="p-desc">Try the platform at no cost. Perfect for getting a feel for the 11+.</div>
                <div className="p-price"><span className="p-curr">£</span><span className="p-amt">0</span><span className="p-per">/ mo</span></div>
                <div className="p-note">Free forever · No card needed</div>
                <button className="p-cta cta-free" onClick={() => navigate("login")}>Get started free</button>
                <ul className="p-features">
                  {freeFeats.map(([t,txt]) => <li key={txt}><span className={`fchk f${t}`}>{t==="ok"?"✓":"✗"}</span>{txt}</li>)}
                </ul>
              </div>
            </div>

            {/* EXAM PREP */}
            <div className="p-card popular">
              <div className="p-accent acc-pop"/>
              <span className="p-pop-badge">⭐ Most Popular</span>
              <div className="p-body">
                <div className="p-icon">🎯</div>
                <div className="p-name">Exam Prep</div>
                <div className="p-desc">Complete 11+ preparation across all four key subjects.</div>
                <div className="p-price"><span className="p-curr">£</span><span className="p-amt">{p2}</span><span className="p-per">/ mo</span></div>
                <div className="p-note">{p2n}</div>
                {yearly && <div className="p-save">💰 Save £21.60 per year</div>}
                <button className="p-cta cta-pop" onClick={() => navigate("login")}>Start free trial</button>
                <ul className="p-features">
                  {examFeats.map(([t,txt]) => <li key={txt}><span className={`fchk f${t}`}>{t==="ok"?"✓":"✗"}</span>{txt}</li>)}
                </ul>
              </div>
            </div>

            {/* PRO */}
            <div className="p-card">
              <div className="p-accent acc-pro"/>
              <div className="p-body">
                <div className="p-icon">🚀</div>
                <div className="p-name">Pro</div>
                <div className="p-desc">Full suite with analytics and parent dashboard for serious prep.</div>
                <div className="p-price"><span className="p-curr">£</span><span className="p-amt">{p3}</span><span className="p-per">/ mo</span></div>
                <div className="p-note">{p3n}</div>
                {yearly && <div className="p-save">💰 Save £36 per year</div>}
                <button className="p-cta cta-pro" onClick={() => navigate("login")}>Start free trial</button>
                <ul className="p-features">
                  {proFeats.map(([t,txt]) => <li key={txt}><span className={`fchk f${t}`}>{t==="ok"?"✓":"✗"}</span>{txt}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BAND ──────────────────────────────────────── */}
      <div className="cta-band">
        <h2>Ready to give your child the<br/><em style={{fontStyle:"normal",background:"linear-gradient(135deg,var(--gold),var(--gold-l))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>best chance?</em></h2>
        <p>Join thousands of UK families already using ElevenPlus Academy to prepare for grammar school success.</p>
        <div className="cta-band-btns">
          <button className="btn-white" onClick={() => navigate("login")}>Start Free Trial</button>
          <button className="btn-ghost-white" onClick={() => navigate("login")}>Log in</button>
        </div>
      </div>

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer className="site-footer">
        <div className="foot-inner">
          <div className="foot-brand">
            <div className="logo" style={{cursor:"pointer"}} onClick={() => window.scrollTo({top:0,behavior:"smooth"})}>ElevenPlus<em> Academy</em></div>
            <p>UK 11+ exam preparation — Maths, English, Verbal &amp; Non-Verbal Reasoning.</p>
          </div>
          <div className="foot-col">
            <div className="foot-head">Practice</div>
            <a onClick={() => navigate("login")}>Dashboard</a>
            <a onClick={() => navigate("login")}>Practice Sets</a>
            <a href="#pricing">Upgrade to Pro</a>
          </div>
          <div className="foot-col">
            <div className="foot-head">Product</div>
            <a href="#features">Features</a>
            <a href="#how">How it works</a>
            <a href="#pricing">Pricing</a>
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
    </>
  );
}
