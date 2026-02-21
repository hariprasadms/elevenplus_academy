import { AppProvider, useApp } from "./AppContext";
import globalCss from "./styles";
import { Toast } from "./SharedComponents";
import LoginPage from "./LoginPage";
import DashboardPage from "./DashboardPage";
import PracticePage from "./PracticePage";
import TestPage from "./TestPage";

function AppInner() {
  const { page } = useApp();

  return (
    <div>
      <style>{globalCss}</style>
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
