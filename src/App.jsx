import { AppProvider, useApp } from "./AppContext";
import globalCss from "./styles";
import { Toast } from "./SharedComponents";
import LandingPage from "./LandingPage";
import LoginPage from "./LoginPage";
import DashboardPage from "./DashboardPage";
import PracticePage from "./PracticePage";
import TestPage from "./TestPage";

function SiteBanner() {
  return (
    <div className="site-banner">
      <span className="site-banner-icon">🚧</span>
      <span>ElevenPlus Academy is currently in <strong>Beta</strong> — some features are still being built. We{"'"}d love your feedback!</span>
    </div>
  );
}

function AppInner() {
  const { page } = useApp();

  return (
    <div>
      <style>{globalCss}</style>
      <SiteBanner />
      {page === "landing" && <LandingPage />}
      {page === "login" && <LoginPage />}
      {page === "dashboard" && <DashboardPage />}
      {page === "practice" && <PracticePage />}
      {page === "test" && <TestPage />}
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}
