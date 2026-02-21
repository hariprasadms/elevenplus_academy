// All global CSS — injected once in App.jsx via <style>{globalCss}</style>
const globalCss = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;0,9..144,900;1,9..144,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --navy: #0a1628; --royal: #12265e; --mid: #1e3a7a;
    --gold: #d4912a; --gold-l: #f5c842; --gold-dim: #7a5010;
    --cream: #faf7f0; --soft: #f0ebe0; --border: #e2d9c8;
    --text: #1a1612; --muted: #7a7060; --faint: #b0a898;
    --ok: #1e7a4a; --ok-bg: #edf8f2;
    --err: #b02020; --err-bg: #fdf0f0;
    --pro: #7c3aed; --pro-bg: #f3e8ff;
    --a: #d4912a; --a-bg: #fef3c7;
    --b: #2563eb; --b-bg: #dbeafe;
    --c: #7c3aed; --c-bg: #ede9fe;
    --r: 12px;
    --shadow-sm: 0 1px 3px rgba(0,0,0,.07);
    --shadow-md: 0 4px 16px rgba(0,0,0,.09);
    --shadow-lg: 0 12px 40px rgba(0,0,0,.13);
  }
  html { font-size: 16px; -webkit-font-smoothing: antialiased; }
  body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--cream); color: var(--text); min-height: 100vh; }
  a { text-decoration: none; color: inherit; }
  button { font-family: inherit; }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--soft); }
  ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }

  @keyframes cardIn { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:none; } }
  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
  @keyframes slideUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:none; } }
  @keyframes bounceIn { 0%{transform:scale(.95)} 60%{transform:scale(1.03)} 100%{transform:scale(1)} }
  @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }
  @keyframes xpFloat { 0%{opacity:1;transform:translateY(0) scale(1)} 100%{opacity:0;transform:translateY(-60px) scale(.8)} }
  @keyframes confettiFall { 0%{transform:translateY(0) rotate(0deg);opacity:1} 100%{transform:translateY(110vh) rotate(720deg);opacity:0} }
  @keyframes spin { to { transform:rotate(360deg); } }
  @keyframes ddPop { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:none} }
  @keyframes pwIn { from{opacity:0;transform:translateY(20px) scale(.96)} to{opacity:1;transform:none} }
  @keyframes timerPulse { 0%,100%{opacity:1} 50%{opacity:.55} }
  @keyframes progressFill { from { width: 0%; } }
  @keyframes arcDraw { to { stroke-dashoffset: var(--target-offset); } }

  .toast {
    position: fixed; bottom: 24px; left: 50%;
    transform: translateX(-50%) translateY(70px);
    background: var(--navy); color: #fff;
    padding: 11px 24px; border-radius: 10px;
    font-size: .84rem; font-weight: 600;
    box-shadow: 0 4px 20px rgba(0,0,0,.25);
    transition: transform .32s, opacity .32s;
    opacity: 0; pointer-events: none; z-index: 9999;
    white-space: nowrap; max-width: 90vw; text-align: center;
  }
  .toast.show { transform: translateX(-50%) translateY(0); opacity: 1; }

  .xp-pop {
    position: fixed; pointer-events: none; z-index: 9999;
    font-family: 'Fraunces', serif; font-size: 1.1rem; font-weight: 700;
    color: var(--gold-l); text-shadow: 0 2px 8px rgba(0,0,0,.3);
    animation: xpFloat 1.2s ease forwards;
  }

  .confetti-piece {
    position: fixed; top: -10px; z-index: 1000;
    pointer-events: none; border-radius: 2px;
    animation: confettiFall linear forwards;
  }

  .header {
    background: var(--navy); position: sticky; top: 0; z-index: 200;
    box-shadow: 0 1px 0 rgba(255,255,255,.06), 0 4px 20px rgba(0,0,0,.38);
  }
  .hdr {
    max-width: 1160px; margin: 0 auto;
    padding: 0 clamp(16px,3vw,40px); height: 64px;
    display: flex; align-items: center; justify-content: space-between; gap: 16px;
  }
  .logo {
    font-family: 'Fraunces', serif; font-size: clamp(1rem,2.5vw,1.3rem);
    font-weight: 900; letter-spacing: -.3px; color: var(--gold-l); cursor: pointer;
  }
  .logo em { color: rgba(255,255,255,.55); font-style: normal; font-weight: 400; }
  .nav-app { display: flex; align-items: center; gap: 14px; }
  .nav-stat { display:flex; align-items:center; gap:5px; font-size:.76rem; font-weight:600; color:rgba(255,255,255,.5); }
  .nav-stat b { font-family:'Fraunces',serif; font-size:.93rem; font-weight:700; color:var(--gold-l); }
  .nav-xp { width:54px; height:5px; background:rgba(255,255,255,.12); border-radius:3px; overflow:hidden; }
  .nav-xp-f { height:100%; background:linear-gradient(90deg,var(--gold),var(--gold-l)); border-radius:3px; transition:width .6s; }
  .nav-back {
    display:inline-flex; align-items:center; gap:5px; font-size:.78rem; font-weight:600;
    color:rgba(255,255,255,.58); padding:6px 12px; border:1px solid rgba(255,255,255,.14);
    border-radius:8px; transition:all .15s; cursor:pointer; background:transparent;
  }
  .nav-back:hover { color:#fff; border-color:rgba(255,255,255,.4); background:rgba(255,255,255,.06); }
  .nav-avatar-wrap { position:relative; }
  .nav-avatar {
    width:34px; height:34px; border-radius:50%;
    background:linear-gradient(135deg,#92400e,var(--gold));
    display:flex; align-items:center; justify-content:center;
    font-family:'Fraunces',serif; font-weight:700; font-size:.85rem; color:#fff;
    border:2px solid rgba(255,255,255,.15); cursor:pointer; flex-shrink:0;
  }
  .nav-avatar:hover { border-color:rgba(255,255,255,.4); }
  .nav-dd {
    position:absolute; top:calc(100% + 10px); right:0;
    background:#fff; border:1.5px solid var(--border);
    border-radius:12px; box-shadow:0 10px 36px rgba(0,0,0,.14);
    min-width:186px; overflow:hidden; z-index:300;
    animation:ddPop .16s ease;
  }
  .nav-dd-head { padding:11px 15px; border-bottom:1.5px solid var(--border); }
  .nav-dd-head .dd-name { font-size:.84rem; font-weight:700; color:var(--text); }
  .nav-dd-head .dd-email { font-size:.72rem; color:var(--faint); }
  .nav-dd-item {
    display:flex; align-items:center; gap:9px; padding:10px 15px;
    font-size:.83rem; color:var(--text); cursor:pointer; transition:background .12s;
    border:none; background:none; width:100%; text-align:left;
  }
  .nav-dd-item:hover { background:var(--soft); }
  .nav-dd-item.red { color:#c0200a; }
  .nav-dd-div { height:1.5px; background:var(--border); }
  .nav-timer {
    font-family:'Fraunces',serif; font-size:1rem; font-weight:700; color:#fff;
    background:rgba(255,255,255,.1); border:1px solid rgba(255,255,255,.18);
    border-radius:8px; padding:5px 14px; min-width:72px; text-align:center;
  }
  .nav-timer.warn { color:#ff9f4a; border-color:rgba(255,159,74,.4); }
  .nav-timer.urgent { color:#ff5a5a; border-color:rgba(255,90,90,.4); animation:timerPulse 1s ease infinite; }

  .site-footer { background:var(--navy); color:rgba(255,255,255,.45); padding:clamp(36px,5vw,56px) clamp(16px,3vw,40px) 0; }
  .foot-inner { max-width:1160px; margin:0 auto; display:grid; grid-template-columns:1.8fr 1fr 1fr 1fr; gap:32px; padding-bottom:36px; border-bottom:1px solid rgba(255,255,255,.08); }
  .foot-brand p { font-size:.8rem; line-height:1.65; margin-top:10px; color:rgba(255,255,255,.38); max-width:260px; }
  .foot-head { font-size:.7rem; font-weight:700; letter-spacing:1.4px; text-transform:uppercase; color:rgba(255,255,255,.3); margin-bottom:12px; }
  .foot-col a { display:block; font-size:.83rem; color:rgba(255,255,255,.5); text-decoration:none; margin-bottom:8px; transition:color .15s; cursor:pointer; }
  .foot-col a:hover { color:var(--gold-l); }
  .foot-bar { max-width:1160px; margin:0 auto; display:flex; justify-content:space-between; gap:12px; flex-wrap:wrap; padding:16px 0; font-size:.73rem; color:rgba(255,255,255,.28); }
  @media(max-width:700px){.foot-inner{grid-template-columns:1fr 1fr}}
  @media(max-width:420px){.foot-inner{grid-template-columns:1fr}.foot-bar{flex-direction:column;gap:4px}}

  .login-wrap { flex:1; display:grid; grid-template-columns:1fr 1fr; min-height:calc(100vh - 64px); }
  @media(max-width:760px){.login-wrap{grid-template-columns:1fr}}
  .panel-left {
    background:linear-gradient(135deg,var(--navy) 0%,var(--royal) 55%,var(--mid) 100%);
    color:#fff; padding:clamp(40px,6vw,70px) clamp(28px,5vw,64px);
    display:flex; flex-direction:column; justify-content:center;
    position:relative; overflow:hidden;
  }
  .panel-left::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 20% 80%,rgba(212,145,42,.18),transparent 55%),radial-gradient(ellipse at 85% 15%,rgba(245,200,66,.09),transparent 50%); pointer-events:none; }
  .orb { position:absolute; border-radius:50%; filter:blur(55px); pointer-events:none; opacity:.15; }
  .panel-inner { position:relative; }
  .eyebrow { font-size:.7rem; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:var(--gold-l); margin-bottom:16px; }
  .panel-inner h2 { font-family:'Fraunces',serif; font-size:clamp(1.8rem,3.5vw,2.6rem); font-weight:900; line-height:1.12; margin-bottom:16px; }
  .panel-inner h2 em { font-style:normal; background:linear-gradient(135deg,var(--gold),var(--gold-l)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .panel-inner p { color:rgba(255,255,255,.65); font-size:.9rem; line-height:1.7; margin-bottom:28px; max-width:340px; }
  .perks { display:flex; flex-direction:column; gap:12px; }
  .perk { display:flex; align-items:center; gap:12px; font-size:.85rem; color:rgba(255,255,255,.8); }
  .perk-icon { width:34px; height:34px; border-radius:10px; background:rgba(255,255,255,.1); border:1px solid rgba(255,255,255,.15); display:flex; align-items:center; justify-content:center; font-size:1rem; flex-shrink:0; }
  @media(max-width:760px){.panel-left{display:none}}
  .panel-right { background:#fff; display:flex; align-items:center; justify-content:center; padding:clamp(28px,5vw,60px) clamp(20px,5vw,60px); }
  .login-card { width:100%; max-width:420px; }
  .login-card h1 { font-family:'Fraunces',serif; font-size:clamp(1.5rem,3vw,2rem); font-weight:900; color:var(--navy); margin-bottom:6px; }
  .login-subtitle { font-size:.88rem; color:var(--muted); margin-bottom:26px; line-height:1.5; }
  .demo-box { background:#fffcf0; border:1.5px solid #e8cc7a; border-radius:12px; padding:14px 16px; margin-bottom:24px; }
  .demo-title { font-size:.78rem; font-weight:700; color:#7a5010; margin-bottom:10px; display:flex; align-items:center; gap:6px; }
  .demo-row { display:flex; align-items:center; gap:8px; margin-bottom:7px; }
  .demo-row:last-child { margin-bottom:0; }
  .demo-lbl { font-size:.76rem; font-weight:600; color:#7a5010; width:62px; flex-shrink:0; }
  .demo-val { font-family:monospace; font-size:.83rem; color:#5a3800; flex:1; }
  .fill-btn { background:var(--gold); color:#fff; border:none; border-radius:6px; font-size:.72rem; font-weight:700; padding:5px 12px; cursor:pointer; transition:filter .15s; flex-shrink:0; }
  .fill-btn:hover { filter:brightness(1.12); }
  .alert { display:flex; align-items:flex-start; gap:8px; border-radius:8px; padding:11px 14px; font-size:.83rem; line-height:1.5; margin-bottom:18px; border-left:3px solid; }
  .alert-err { background:var(--err-bg); color:var(--err); border-color:var(--err); }
  .alert-ok { background:var(--ok-bg); color:var(--ok); border-color:var(--ok); }
  .field { margin-bottom:18px; }
  .field label { display:block; font-size:.8rem; font-weight:700; color:var(--navy); margin-bottom:6px; }
  .field input { width:100%; padding:13px 14px; border:1.5px solid var(--border); border-radius:10px; font-family:'Plus Jakarta Sans',sans-serif; font-size:.95rem; color:var(--text); background:var(--cream); outline:none; transition:border-color .18s,box-shadow .18s; }
  .field input:focus { border-color:var(--gold); box-shadow:0 0 0 3px rgba(212,145,42,.15); background:#fff; }
  .field input::placeholder { color:var(--faint); }
  .pw-wrap { position:relative; }
  .pw-wrap input { padding-right:44px; }
  .pw-eye { position:absolute; right:12px; top:50%; transform:translateY(-50%); background:none; border:none; cursor:pointer; color:var(--faint); padding:4px; }
  .form-opts { display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; }
  .remember { display:flex; align-items:center; gap:7px; font-size:.82rem; color:var(--muted); cursor:pointer; }
  .remember input { accent-color:var(--gold); }
  .forgot { font-size:.82rem; color:var(--gold); font-weight:600; cursor:pointer; }
  .btn-submit-login {
    width:100%; padding:15px; border:none; border-radius:10px;
    background:linear-gradient(135deg,var(--gold),#e8a030);
    color:var(--navy); font-family:inherit; font-size:1rem; font-weight:700; cursor:pointer;
    box-shadow:0 3px 14px rgba(212,145,42,.3); transition:all .2s;
    display:flex; align-items:center; justify-content:center; gap:8px;
  }
  .btn-submit-login:hover { transform:translateY(-1px); box-shadow:0 6px 22px rgba(212,145,42,.42); }
  .btn-submit-login:disabled { opacity:.7; cursor:not-allowed; transform:none; }
  .spinner-sm { width:18px; height:18px; border:2.5px solid rgba(0,0,0,.18); border-top-color:var(--navy); border-radius:50%; animation:spin .7s linear infinite; }
  .divider-row { display:flex; align-items:center; gap:12px; margin:22px 0; color:var(--faint); font-size:.78rem; }
  .divider-row::before,.divider-row::after { content:''; flex:1; height:1px; background:var(--border); }
  .btn-register { display:block; width:100%; padding:13px; border-radius:10px; border:1.5px solid var(--border); background:transparent; color:var(--navy); font-family:inherit; font-size:.92rem; font-weight:600; cursor:pointer; text-align:center; transition:all .18s; }
  .btn-register:hover { border-color:var(--navy); background:var(--soft); }
  .terms { text-align:center; font-size:.75rem; color:var(--faint); margin-top:18px; line-height:1.6; }
  .terms span { color:var(--gold); font-weight:600; cursor:pointer; }

  .welcome { background:linear-gradient(135deg,var(--navy) 0%,#1a3460 60%,#1e4080 100%); padding:clamp(24px,4vw,44px) clamp(16px,3vw,40px); position:relative; overflow:hidden; }
  .welcome::after { content:''; position:absolute; inset:0; pointer-events:none; background:radial-gradient(ellipse 600px 400px at 90% 50%,rgba(245,200,66,.07),transparent); }
  .welcome-inner { max-width:1160px; margin:0 auto; display:flex; align-items:center; justify-content:space-between; gap:20px; flex-wrap:wrap; position:relative; }
  .welcome-text h1 { font-family:'Fraunces',serif; font-size:clamp(1.3rem,3vw,1.9rem); font-weight:800; color:#fff; margin-bottom:4px; }
  .welcome-text h1 em { font-style:normal; background:linear-gradient(90deg,var(--gold),var(--gold-l)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .welcome-text p { font-size:.88rem; color:rgba(255,255,255,.55); line-height:1.6; }
  .w-stats { display:flex; gap:10px; flex-wrap:wrap; }
  .wstat { background:rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.1); border-radius:10px; padding:12px 16px; text-align:center; min-width:80px; }
  .wstat-v { font-family:'Fraunces',serif; font-size:1.6rem; font-weight:900; color:var(--gold-l); line-height:1; }
  .wstat-l { font-size:.67rem; font-weight:600; text-transform:uppercase; letter-spacing:.5px; color:rgba(255,255,255,.38); margin-top:3px; }

  .dash-body { max-width:1160px; margin:0 auto; padding:clamp(24px,3vw,36px) clamp(16px,3vw,40px) 80px; display:grid; grid-template-columns:1fr 288px; gap:24px; align-items:start; }
  @media(max-width:880px){.dash-body{grid-template-columns:1fr}}
  .section { margin-bottom:32px; }
  .section-head { display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; }
  .section-title { font-family:'Fraunces',serif; font-size:1.05rem; font-weight:700; color:var(--text); }
  .section-link { font-size:.78rem; font-weight:600; color:var(--gold); cursor:pointer; }
  .section-link:hover { text-decoration:underline; }

  .set-list { display:flex; flex-direction:column; gap:10px; }
  .set-card {
    display:grid; grid-template-columns:52px 1fr auto; align-items:center; gap:16px;
    padding:16px 20px; background:#fff; border:1px solid var(--border); border-radius:var(--r);
    box-shadow:var(--shadow-sm); transition:box-shadow .18s,transform .18s; cursor:pointer; text-decoration:none; color:inherit;
  }
  .set-card:hover { box-shadow:var(--shadow-md); transform:translateY(-1px); }
  .sc-icon { width:52px; height:52px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:1.4rem; flex-shrink:0; }
  .sc-icon-a { background:var(--a-bg); }
  .sc-icon-b { background:var(--b-bg); }
  .sc-icon-c { background:var(--c-bg); }
  .sc-mid { min-width:0; }
  .sc-top { display:flex; align-items:baseline; gap:8px; margin-bottom:3px; }
  .sc-badge { font-size:.62rem; font-weight:700; letter-spacing:1.2px; text-transform:uppercase; padding:2px 7px; border-radius:4px; flex-shrink:0; }
  .sc-badge-a { background:var(--a-bg); color:var(--a); }
  .sc-badge-b { background:var(--b-bg); color:var(--b); }
  .sc-badge-c { background:var(--c-bg); color:var(--c); }
  .sc-name { font-family:'Fraunces',serif; font-size:1rem; font-weight:700; color:var(--text); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .sc-desc { font-size:.78rem; color:var(--muted); line-height:1.5; margin-bottom:10px; }
  .sc-prog { display:flex; align-items:center; gap:10px; }
  .sc-bar-wrap { flex:1; height:5px; background:var(--border); border-radius:3px; overflow:hidden; min-width:0; }
  .sc-bar-fill { height:100%; border-radius:3px; transition:width .5s ease; }
  .sc-bar-a { background:linear-gradient(90deg,var(--a),#FBBF24); }
  .sc-bar-b { background:linear-gradient(90deg,var(--b),#60A5FA); }
  .sc-bar-c { background:linear-gradient(90deg,var(--c),#A78BFA); }
  .sc-prog-text { font-size:.72rem; font-weight:600; color:var(--muted); white-space:nowrap; flex-shrink:0; }
  .sc-btn { display:inline-flex; align-items:center; gap:5px; padding:9px 16px; border-radius:8px; font-family:inherit; font-size:.82rem; font-weight:600; border:none; cursor:pointer; white-space:nowrap; transition:filter .15s,transform .15s; }
  .sc-btn-a { background:var(--a); color:#fff; }
  .sc-btn-b { background:var(--b); color:#fff; }
  .sc-btn-c { background:var(--c); color:#fff; }
  .sc-btn:hover { filter:brightness(1.1); transform:translateY(-1px); }
  @media(max-width:560px){.set-card{grid-template-columns:44px 1fr;grid-template-rows:auto auto;gap:12px;padding:14px 16px}.sc-btn{width:100%;justify-content:center}.sc-right{grid-column:1/-1}}

  .premium-section { margin-bottom:32px; }
  .premium-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:14px; }
  .premium-title-wrap { display:flex; align-items:center; gap:10px; }
  .prem-badge { display:inline-flex; align-items:center; gap:5px; background:linear-gradient(135deg,#7c3aed,#9f5cf5); color:#fff; font-size:.62rem; font-weight:700; letter-spacing:1.2px; text-transform:uppercase; padding:3px 9px; border-radius:20px; }
  .paper-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
  @media(max-width:640px){.paper-grid{grid-template-columns:1fr}}
  .paper-card { position:relative; overflow:hidden; background:#fff; border:1px solid var(--border); border-radius:var(--r); padding:16px 18px; box-shadow:var(--shadow-sm); cursor:pointer; transition:all .2s ease; display:flex; flex-direction:column; gap:10px; color:inherit; }
  .paper-card:hover { box-shadow:var(--shadow-md); transform:translateY(-2px); }
  .paper-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,#7c3aed,#a78bfa); }
  .paper-card.maths::before { background:linear-gradient(90deg,#2563eb,#60a5fa); }
  .paper-card.english::before { background:linear-gradient(90deg,#059669,#34d399); }
  .pc-top { display:flex; align-items:flex-start; justify-content:space-between; gap:8px; }
  .pc-tags { display:flex; gap:5px; flex-wrap:wrap; }
  .pc-tag { font-size:.6rem; font-weight:700; letter-spacing:.8px; text-transform:uppercase; padding:2px 7px; border-radius:4px; }
  .pc-tag-maths { background:#eff6ff; color:#1d4ed8; }
  .pc-tag-english { background:#ecfdf5; color:#065f46; }
  .pc-tag-verbal { background:#fef3c7; color:#92400e; }
  .pc-tag-yr { background:var(--soft); color:var(--muted); }
  .pc-lock { width:26px; height:26px; border-radius:50%; background:linear-gradient(135deg,#7c3aed,#9f5cf5); color:#fff; font-size:.8rem; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .pc-lock.open { background:linear-gradient(135deg,#059669,#34d399); font-size:.7rem; }
  .pc-name { font-family:'Fraunces',serif; font-size:.95rem; font-weight:700; color:var(--text); line-height:1.25; }
  .pc-meta { display:flex; gap:12px; flex-wrap:wrap; }
  .pc-m { font-size:.72rem; font-weight:600; color:var(--muted); }
  .pc-foot { display:flex; align-items:center; justify-content:space-between; margin-top:2px; }
  .pc-score-pill { font-size:.68rem; font-weight:700; padding:2px 8px; border-radius:10px; background:var(--soft); color:var(--muted); }
  .pc-action { font-size:.75rem; font-weight:700; display:flex; align-items:center; gap:4px; color:#7c3aed; }
  .upgrade-banner { background:linear-gradient(135deg,#1e1245,#3b1d8c,#4c1d95); border-radius:var(--r); padding:20px 22px; display:flex; align-items:center; gap:16px; box-shadow:0 4px 20px rgba(124,58,237,.25); margin-top:12px; }
  .ub-icon { font-size:2rem; flex-shrink:0; }
  .ub-text { flex:1; min-width:0; }
  .ub-text h4 { font-family:'Fraunces',serif; font-size:.95rem; font-weight:700; color:#fff; margin-bottom:3px; }
  .ub-text p { font-size:.75rem; color:rgba(255,255,255,.55); line-height:1.5; }
  .ub-btn { flex-shrink:0; padding:10px 18px; background:linear-gradient(135deg,#f5c842,#d4912a); color:#1e1245; font-family:inherit; font-size:.8rem; font-weight:700; border:none; border-radius:8px; cursor:pointer; transition:all .18s; }
  .ub-btn:hover { filter:brightness(1.08); transform:translateY(-1px); }
  @media(max-width:480px){.upgrade-banner{flex-direction:column;text-align:center}.ub-btn{width:100%}}

  .act-list { display:flex; flex-direction:column; gap:8px; }
  .act-row { display:flex; align-items:center; gap:12px; background:#fff; border:1px solid var(--border); border-radius:var(--r); padding:12px 16px; box-shadow:var(--shadow-sm); }
  .act-icon { width:34px; height:34px; border-radius:8px; background:var(--a-bg); display:flex; align-items:center; justify-content:center; font-size:1rem; flex-shrink:0; }
  .act-info { flex:1; min-width:0; }
  .act-name { font-size:.84rem; font-weight:600; color:var(--text); margin-bottom:1px; }
  .act-meta { font-size:.72rem; color:var(--faint); }
  .act-score { font-family:'Fraunces',serif; font-size:.95rem; font-weight:700; }
  .score-ok { color:var(--ok); }
  .score-mid { color:#d97706; }
  .score-bad { color:var(--err); }

  .sidebar { display:flex; flex-direction:column; gap:14px; }
  .card { background:#fff; border:1px solid var(--border); border-radius:var(--r); padding:18px 20px; box-shadow:var(--shadow-sm); }
  .card-title { font-family:'Fraunces',serif; font-size:.92rem; font-weight:700; color:var(--text); margin-bottom:14px; }
  .xp-card { background:var(--navy); border-color:transparent; }
  .xp-card .card-title { color:var(--gold-l); }
  .xp-lv { display:flex; align-items:baseline; gap:6px; margin-bottom:4px; }
  .xp-lv-n { font-family:'Fraunces',serif; font-size:1.9rem; font-weight:900; color:var(--gold-l); }
  .xp-lv-l { font-size:.74rem; color:rgba(255,255,255,.38); }
  .xp-bar { height:6px; background:rgba(255,255,255,.1); border-radius:3px; overflow:hidden; margin-bottom:5px; }
  .xp-bar-f { height:100%; background:linear-gradient(90deg,#B45309,var(--gold-l)); border-radius:3px; transition:width .6s; }
  .xp-note { font-size:.71rem; color:rgba(255,255,255,.32); }
  .streak-card { background:linear-gradient(135deg,#92400E,var(--gold)); border-color:transparent; }
  .streak-card .card-title { color:#fff; }
  .streak-n { font-family:'Fraunces',serif; font-size:2.8rem; font-weight:900; color:#fff; line-height:1; margin-bottom:2px; }
  .streak-sub { font-size:.77rem; color:rgba(255,255,255,.7); margin-bottom:12px; }
  .streak-days { display:flex; gap:5px; }
  .sd { flex:1; height:28px; border-radius:6px; display:flex; align-items:center; justify-content:center; font-size:.6rem; font-weight:700; background:rgba(255,255,255,.15); color:rgba(255,255,255,.5); }
  .sd.done { background:rgba(255,255,255,.88); color:#92400E; }
  .sd.today { background:#fff; color:#92400E; box-shadow:0 2px 6px rgba(0,0,0,.12); }
  .bk-rows { display:flex; flex-direction:column; gap:9px; }
  .bk-row { display:flex; align-items:center; gap:10px; }
  .bk-l { font-size:.73rem; font-weight:600; color:var(--muted); width:74px; flex-shrink:0; }
  .bk-track { flex:1; height:5px; background:var(--border); border-radius:3px; overflow:hidden; }
  .bk-fill { height:100%; border-radius:3px; transition:width .6s; }
  .up-card { background:linear-gradient(135deg,#1E3A8A,#2563EB); border-color:transparent; text-align:center; }
  .up-card .card-title { color:var(--gold-l); }
  .up-card p { font-size:.79rem; color:rgba(255,255,255,.55); line-height:1.6; margin-bottom:14px; }
  .up-btn { display:block; background:linear-gradient(135deg,var(--gold),#FBBF24); color:var(--navy); font-family:inherit; font-weight:700; font-size:.84rem; padding:10px; border-radius:8px; transition:filter .15s; cursor:pointer; border:none; width:100%; }
  .up-btn:hover { filter:brightness(1.07); }

  .paywall-overlay { position:fixed; inset:0; z-index:800; display:flex; align-items:center; justify-content:center; padding:20px; background:rgba(10,22,40,.72); backdrop-filter:blur(6px); }
  .paywall-card { background:#fff; border-radius:20px; max-width:480px; width:100%; padding:clamp(28px,5vw,44px) clamp(20px,4vw,36px); text-align:center; box-shadow:0 24px 80px rgba(0,0,0,.32); animation:pwIn .32s cubic-bezier(.22,1,.36,1); }
  .pw-badge { display:inline-flex; align-items:center; gap:6px; background:linear-gradient(135deg,#7c3aed,#9f5cf5); color:#fff; font-size:.68rem; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; padding:4px 14px; border-radius:20px; margin-bottom:18px; }
  .paywall-card h2 { font-family:'Fraunces',serif; font-size:clamp(1.3rem,4vw,1.7rem); font-weight:900; color:var(--navy); margin-bottom:10px; line-height:1.2; }
  .paywall-card p { font-size:.88rem; color:var(--muted); line-height:1.7; margin-bottom:22px; }
  .pw-features { display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:24px; text-align:left; }
  .pw-feat { display:flex; align-items:center; gap:8px; font-size:.8rem; color:var(--text); background:var(--cream); border-radius:8px; padding:9px 12px; }
  .pw-btn-pro { display:block; width:100%; padding:15px; background:linear-gradient(135deg,#7c3aed,#9f5cf5); color:#fff; font-family:inherit; font-size:1rem; font-weight:700; border:none; border-radius:10px; cursor:pointer; box-shadow:0 4px 18px rgba(124,58,237,.35); margin-bottom:10px; transition:all .2s; }
  .pw-btn-pro:hover { filter:brightness(1.08); transform:translateY(-1px); }
  .pw-btn-cancel { display:block; width:100%; padding:12px; background:transparent; color:var(--navy); font-family:inherit; font-size:.88rem; font-weight:600; border:2px solid var(--border); border-radius:10px; cursor:pointer; transition:all .18s; }
  .pw-btn-cancel:hover { border-color:var(--navy); }
  .pw-note { font-size:.7rem; color:var(--faint); margin-top:12px; }

  .practice-hero { background:linear-gradient(135deg,var(--navy) 0%,var(--royal) 55%,var(--mid) 100%); color:#fff; padding:clamp(40px,7vw,80px) clamp(16px,5vw,48px) clamp(36px,6vw,70px); text-align:center; position:relative; overflow:hidden; }
  .practice-hero::after { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 30% 70%,rgba(212,145,42,.14),transparent 60%),radial-gradient(ellipse at 75% 20%,rgba(245,200,66,.08),transparent 55%); pointer-events:none; }
  .hero-eyebrow { display:inline-flex; align-items:center; gap:8px; border:1px solid rgba(212,145,42,.4); color:var(--gold-l); font-size:.72rem; font-weight:700; letter-spacing:2px; text-transform:uppercase; padding:5px 16px; border-radius:30px; margin-bottom:20px; position:relative; }
  .practice-hero h1 { font-family:'Fraunces',serif; font-size:clamp(2rem,7vw,4rem); font-weight:900; line-height:1.1; margin-bottom:14px; position:relative; }
  .practice-hero h1 em { font-style:normal; background:linear-gradient(135deg,var(--gold),var(--gold-l)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .practice-hero p { font-size:clamp(.88rem,2vw,1.05rem); color:rgba(255,255,255,.72); max-width:520px; margin:0 auto 36px; line-height:1.75; position:relative; }
  .hero-pills { display:flex; justify-content:center; flex-wrap:wrap; gap:10px; position:relative; }
  .pill { background:rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.14); color:rgba(255,255,255,.8); font-size:.78rem; font-weight:600; padding:7px 16px; border-radius:30px; }
  .pill strong { color:var(--gold-l); }

  .set-selector { max-width:1160px; margin:0 auto; padding:36px clamp(14px,3vw,32px) 0; }
  .set-tabs { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; }
  .set-tab { background:#fff; border:2px solid var(--border); border-radius:var(--r); padding:clamp(14px,3vw,24px) clamp(12px,2vw,20px); cursor:pointer; transition:all .22s ease; text-align:left; position:relative; overflow:hidden; }
  .set-tab::before { content:''; position:absolute; top:0; left:0; right:0; height:4px; border-radius:var(--r) var(--r) 0 0; }
  .set-tab.tab-a::before { background:var(--a); }
  .set-tab.tab-b::before { background:var(--b); }
  .set-tab.tab-c::before { background:var(--c); }
  .set-tab:hover { transform:translateY(-3px); box-shadow:0 8px 28px rgba(0,0,0,.1); }
  .set-tab.active-a { border-color:var(--a); box-shadow:0 0 0 3px rgba(212,145,42,.18),0 8px 28px rgba(0,0,0,.1); }
  .set-tab.active-b { border-color:var(--b); box-shadow:0 0 0 3px rgba(37,99,235,.18),0 8px 28px rgba(0,0,0,.1); }
  .set-tab.active-c { border-color:var(--c); box-shadow:0 0 0 3px rgba(124,58,237,.18),0 8px 28px rgba(0,0,0,.1); }
  .set-label-tab { font-size:.68rem; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; margin-bottom:6px; }
  .label-a { color:var(--a); } .label-b { color:var(--b); } .label-c { color:var(--c); }
  .set-name-tab { font-family:'Fraunces',serif; font-size:clamp(1rem,2.5vw,1.25rem); font-weight:700; color:var(--navy); margin-bottom:4px; }
  .set-desc-tab { font-size:.78rem; color:var(--muted); line-height:1.5; }
  .set-meta-tab { display:flex; flex-wrap:wrap; gap:8px; margin-top:10px; }
  .set-chip { font-size:.68rem; font-weight:600; padding:3px 9px; border-radius:20px; }
  .chip-a { background:#fff4e5; color:#7a4a00; }
  .chip-b { background:#e5f0ff; color:#0a3070; }
  .chip-c { background:#f3e5ff; color:#4a0070; }
  .start-badge { position:absolute; top:12px; right:12px; font-size:.62rem; font-weight:700; letter-spacing:.8px; text-transform:uppercase; padding:3px 8px; border-radius:12px; background:var(--gold); color:var(--navy); }
  @media(max-width:600px){.set-tabs{grid-template-columns:1fr}}

  .test-main { max-width:900px; margin:0 auto; padding:28px clamp(14px,3vw,24px) 100px; }
  .test-toolbar { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px; margin-bottom:20px; }
  .toolbar-left { display:flex; flex-direction:column; gap:4px; }
  .toolbar-set-label { font-size:.7rem; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; }
  .toolbar-title { font-family:'Fraunces',serif; font-size:clamp(1.1rem,3vw,1.5rem); font-weight:700; color:var(--navy); }
  .toolbar-right { display:flex; gap:8px; flex-wrap:wrap; }
  .btn { display:inline-flex; align-items:center; gap:7px; border:none; border-radius:8px; font-family:inherit; font-size:.85rem; font-weight:700; cursor:pointer; transition:all .18s; min-height:42px; padding:10px 16px; white-space:nowrap; }
  .btn-navy { background:var(--navy); color:#fff; }
  .btn-navy:hover { background:var(--royal); transform:translateY(-1px); }
  .btn-ghost-btn { background:rgba(0,0,0,.04); color:var(--muted); border:1px solid var(--border); }
  .btn-ghost-btn:hover { background:rgba(0,0,0,.08); color:var(--text); }
  .btn-gold { background:linear-gradient(135deg,var(--gold),#e8a830); color:var(--navy); box-shadow:0 3px 14px rgba(212,145,42,.35); }
  .btn-gold:hover { transform:translateY(-2px); box-shadow:0 6px 20px rgba(212,145,42,.45); }
  .btn-shuffle-on { background:linear-gradient(135deg,var(--gold-dim),var(--gold)); color:#fff; }
  .btn:disabled { opacity:.4; cursor:default; transform:none !important; box-shadow:none !important; }

  .prog-row { display:flex; align-items:center; justify-content:space-between; margin-bottom:8px; }
  .prog-text { font-size:.78rem; font-weight:600; color:var(--muted); }
  .prog-count { font-family:'Fraunces',serif; font-size:.95rem; font-weight:700; color:var(--navy); }
  .prog-wrap { background:var(--soft); border-radius:6px; height:8px; margin-bottom:28px; overflow:hidden; }
  .prog-fill { height:100%; border-radius:6px; transition:width .45s cubic-bezier(.34,1.2,.64,1); }
  .prog-fill-a { background:linear-gradient(90deg,var(--a),var(--gold-l)); }
  .prog-fill-b { background:linear-gradient(90deg,var(--b),#60a8f8); }
  .prog-fill-c { background:linear-gradient(90deg,var(--c),#c060f8); }

  .q-card { background:#fff; border-radius:16px; padding:clamp(18px,4vw,32px); margin-bottom:13px; box-shadow:0 2px 12px rgba(0,0,0,.05); border:1.5px solid transparent; transition:border-color .28s,box-shadow .28s; animation:cardIn .32s cubic-bezier(.22,1,.36,1) both; position:relative; overflow:hidden; }
  .q-card::before { content:''; position:absolute; top:0; left:0; width:4px; height:100%; border-radius:4px 0 0 4px; transition:background .28s; }
  .q-card-a::before { background:var(--a); }
  .q-card-b::before { background:var(--b); }
  .q-card-c::before { background:var(--c); }
  .q-card.correct-card { border-color:var(--ok); box-shadow:0 2px 12px rgba(30,122,74,.1); }
  .q-card.correct-card::before { background:var(--ok); }
  .q-card.wrong-card { border-color:var(--err); box-shadow:0 2px 12px rgba(176,32,32,.1); }
  .q-card.wrong-card::before { background:var(--err); }
  .q-head { display:flex; align-items:flex-start; gap:13px; margin-bottom:16px; }
  .q-num { width:32px; height:32px; border-radius:50%; color:var(--gold-l); font-family:'Fraunces',serif; font-size:.88rem; font-weight:700; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-top:1px; }
  .q-num-a { background:var(--a); }
  .q-num-b { background:var(--b); }
  .q-num-c { background:var(--c); }
  .q-meta { flex:1; min-width:0; }
  .q-cat { font-size:.67rem; font-weight:700; letter-spacing:1.3px; text-transform:uppercase; margin-bottom:5px; }
  .q-cat-a { color:var(--a); } .q-cat-b { color:var(--b); } .q-cat-c { color:var(--c); }
  .q-text { font-size:clamp(.9rem,2.3vw,1.02rem); font-weight:500; line-height:1.65; color:var(--navy); }
  .options { display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-top:4px; }
  @media(max-width:540px){.options{grid-template-columns:1fr}}
  .opt { display:flex; align-items:center; gap:10px; padding:11px 14px; border:1.5px solid var(--border); border-radius:10px; cursor:pointer; transition:all .16s; font-size:clamp(.82rem,2vw,.93rem); color:var(--text); background:var(--cream); user-select:none; min-height:44px; }
  .opt:hover:not(.opt-disabled) { border-color:var(--gold); background:#fffcf3; transform:translateX(3px); }
  .opt.opt-correct { background:var(--ok-bg); border-color:var(--ok); color:var(--ok); font-weight:600; animation:bounceIn .25s ease; }
  .opt.opt-wrong { background:var(--err-bg); border-color:var(--err); color:var(--err); font-weight:600; animation:shake .3s ease; }
  .opt.opt-reveal { background:var(--ok-bg); border-color:var(--ok); color:var(--ok); font-weight:600; }
  .opt.opt-disabled { cursor:default; }
  .opt-letter { width:24px; height:24px; border-radius:50%; background:#fff; border:1.5px solid #ccc; display:flex; align-items:center; justify-content:center; font-size:.71rem; font-weight:700; flex-shrink:0; transition:all .16s; }
  .opt-correct .opt-letter { background:var(--ok); border-color:var(--ok); color:#fff; }
  .opt-wrong .opt-letter { background:var(--err); border-color:var(--err); color:#fff; }
  .opt-reveal .opt-letter { background:var(--ok); border-color:var(--ok); color:#fff; }
  .feedback { margin-top:12px; padding:10px 14px; border-radius:8px; font-size:.84rem; line-height:1.55; animation:fadeIn .2s ease; }
  .fb-ok { background:var(--ok-bg); color:var(--ok); border-left:3px solid var(--ok); }
  .fb-err { background:var(--err-bg); color:var(--err); border-left:3px solid var(--err); }
  .test-foot { display:flex; align-items:center; justify-content:center; gap:14px; margin-top:28px; flex-wrap:wrap; }
  .btn-submit-test { padding:15px clamp(28px,8vw,52px); font-size:clamp(.9rem,2.5vw,1.05rem); min-height:52px; border-radius:10px; width:100%; max-width:320px; }

  .results-panel { background:#fff; border-radius:18px; padding:clamp(28px,6vw,52px) clamp(18px,5vw,42px); text-align:center; box-shadow:0 6px 40px rgba(0,0,0,.1); margin-top:24px; animation:cardIn .5s ease; border:1.5px solid var(--border); }
  .score-wrap { position:relative; width:130px; height:130px; margin:0 auto 24px; }
  .score-svg { transform:rotate(-90deg); }
  .score-svg circle { fill:none; stroke-width:8; stroke-linecap:round; }
  .score-track { stroke:var(--soft); }
  .score-arc { stroke:var(--gold); stroke-dasharray:339.3; transition:stroke-dashoffset 1s cubic-bezier(.22,1,.36,1) .3s; }
  .score-inner { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; }
  .score-num { font-family:'Fraunces',serif; font-size:2.4rem; font-weight:900; color:var(--navy); line-height:1; }
  .score-den { font-size:.8rem; color:var(--faint); margin-top:2px; }
  .results-panel h2 { font-family:'Fraunces',serif; font-size:clamp(1.2rem,4vw,1.65rem); color:var(--navy); margin-bottom:10px; }
  .results-panel p { color:var(--muted); font-size:.92rem; line-height:1.65; max-width:400px; margin:0 auto 24px; }
  .results-stats { display:flex; justify-content:center; gap:24px; margin-bottom:28px; flex-wrap:wrap; }
  .rstat { text-align:center; }
  .rstat-val { font-family:'Fraunces',serif; font-size:1.6rem; font-weight:700; color:var(--navy); }
  .rstat-lbl { font-size:.72rem; color:var(--faint); text-transform:uppercase; letter-spacing:.8px; margin-top:2px; }
  .results-btns { display:flex; justify-content:center; gap:10px; flex-wrap:wrap; }
  .breakdown-section { margin-bottom:24px; text-align:left; }
  .breakdown-section h3 { font-family:'Fraunces',serif; font-size:1rem; color:var(--navy); margin-bottom:12px; }
  .bk-bd-row { display:flex; align-items:center; gap:10px; margin-bottom:8px; }
  .bk-bd-label { font-size:.78rem; font-weight:600; color:var(--muted); width:150px; text-align:right; flex-shrink:0; }
  .bk-bd-bar-wrap { flex:1; height:8px; background:var(--soft); border-radius:4px; overflow:hidden; }
  .bk-bd-bar { height:100%; border-radius:4px; transition:width 1s ease .5s; }
  .bk-bd-score { font-size:.78rem; font-weight:700; color:var(--navy); width:32px; flex-shrink:0; }

  .streak-banner { background:linear-gradient(135deg,var(--gold-dim),var(--gold)); color:#fff; border-radius:10px; padding:14px 20px; display:flex; align-items:center; gap:12px; margin-bottom:20px; box-shadow:0 3px 16px rgba(212,145,42,.3); animation:cardIn .4s ease; }

  .test-banner { background:linear-gradient(135deg,var(--navy) 0%,#1a3466 60%,#1e4080 100%); color:#fff; padding:clamp(24px,4vw,40px) clamp(16px,4vw,40px); position:relative; overflow:hidden; }
  .test-banner::after { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 80% 50%,rgba(245,200,66,.07),transparent 60%); pointer-events:none; }
  .banner-inner { max-width:860px; margin:0 auto; position:relative; }
  .banner-tags { display:flex; gap:8px; margin-bottom:12px; flex-wrap:wrap; }
  .btag { font-size:.65rem; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; padding:3px 10px; border-radius:20px; border:1px solid; }
  .btag-pro { border-color:rgba(167,139,250,.5); color:rgb(200,180,255); background:rgba(124,58,237,.2); }
  .btag-sub { border-color:rgba(212,145,42,.4); color:var(--gold-l); background:rgba(212,145,42,.1); }
  .banner-inner h1 { font-family:'Fraunces',serif; font-size:clamp(1.3rem,3.5vw,1.9rem); font-weight:900; margin-bottom:8px; line-height:1.15; }
  .banner-inner p { font-size:.88rem; color:rgba(255,255,255,.65); margin-bottom:16px; line-height:1.6; }
  .banner-meta { display:flex; gap:20px; flex-wrap:wrap; }
  .bmeta { font-size:.78rem; font-weight:600; color:rgba(255,255,255,.55); display:flex; align-items:center; gap:5px; }
  .bmeta strong { color:#fff; }
  .test-main-area { max-width:860px; margin:0 auto; padding:24px clamp(14px,3vw,24px) 80px; }
  .q-card-pro::before { background:var(--pro); }
  .q-cat-pro { color:var(--pro); }
  .q-num-pro { background:var(--pro); }
  .prog-fill-pro { background:linear-gradient(90deg,var(--pro),#a78bfa); }
  .q-diagram { margin:14px 0; display:flex; justify-content:center; align-items:center; background:var(--cream); border:1px solid var(--border); border-radius:10px; padding:16px; overflow:auto; }
  .tbl-diagram { border-collapse:collapse; font-size:.83rem; margin:0 auto; }
  .tbl-diagram th { background:var(--navy); color:#fff; padding:7px 14px; font-size:.78rem; font-weight:700; }
  .tbl-diagram td { border:1px solid #ccc; padding:6px 14px; text-align:center; }
  .tbl-diagram td:first-child { background:var(--soft); font-weight:700; text-align:left; border-right:2px solid #aaa; }
  .tbl-diagram tr:nth-child(even) td { background:#f8f8f5; }
  .demo-notice { background:var(--pro-bg); border:1.5px solid rgba(124,58,237,.3); border-radius:12px; padding:20px 24px; text-align:center; margin:16px 0; }
  .btn-submit-pro { padding:15px 48px; background:linear-gradient(135deg,var(--pro),#9f5cf5); color:#fff; font-family:inherit; font-size:1rem; font-weight:700; border:none; border-radius:10px; cursor:pointer; box-shadow:0 4px 18px rgba(124,58,237,.3); transition:all .2s; min-height:52px; }
  .btn-submit-pro:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(124,58,237,.4); }
  .btn-restart { padding:13px 28px; background:var(--navy); color:#fff; font-family:inherit; font-size:.9rem; font-weight:700; border:none; border-radius:10px; cursor:pointer; transition:all .18s; }
  .btn-restart:hover { background:var(--royal); transform:translateY(-1px); }
  .btn-outline-n { padding:13px 28px; background:transparent; color:var(--navy); font-family:inherit; font-size:.9rem; font-weight:700; border:2px solid var(--border); border-radius:10px; cursor:pointer; transition:all .18s; }
  .btn-outline-n:hover { border-color:var(--navy); }
`;

export default globalCss;
