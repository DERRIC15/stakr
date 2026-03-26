import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useMemo } from "react";
import AppShell from "./components/layout/AppShell";
import DashboardPage from "./pages/DashboardPage";
import LiveMonitoringPage from "./pages/LiveMonitoringPage";
import MapEvacuationPage from "./pages/MapEvacuationPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import AdminPage from "./pages/AdminPage";
import LoadingScreen from "./components/common/LoadingScreen";
import AlertOverlay from "./components/common/AlertOverlay";
import { useRealtimeData } from "./hooks/useRealtimeData";
import { useAlertTone } from "./hooks/useAlertTone";
import { useSpeechAlerts } from "./hooks/useSpeechAlerts";
import { useLocalStorage } from "./hooks/useLocalStorage";
import i18n from "./i18n";

const defaultAuth = { loggedIn: false, username: "" };

export default function App() {
  const [theme, setTheme] = useLocalStorage("stampede-theme", "dark");
  const [language, setLanguage] = useLocalStorage("stampede-language", "en");
  const [auth, setAuth] = useLocalStorage("stampede-auth", defaultAuth);
  const realtime = useRealtimeData(language);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  useSpeechAlerts({
    language,
    status: realtime.data?.status,
    exit: realtime.data?.exit,
    enabled: true,
  });
  useAlertTone(realtime.data?.status);

  const contextValue = useMemo(
    () => ({
      theme,
      setTheme,
      language,
      setLanguage,
      auth,
      setAuth,
      realtime,
    }),
    [theme, setTheme, language, setLanguage, auth, setAuth, realtime],
  );

  if (realtime.initialLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <AlertOverlay status={realtime.data?.status} exit={realtime.data?.exit} />
      <AppShell context={contextValue}>
        <Routes>
          <Route path="/" element={<DashboardPage context={contextValue} />} />
          <Route path="/monitoring" element={<LiveMonitoringPage context={contextValue} />} />
          <Route path="/map" element={<MapEvacuationPage context={contextValue} />} />
          <Route path="/analytics" element={<AnalyticsPage context={contextValue} />} />
          <Route
            path="/admin"
            element={
              auth.loggedIn ? (
                <AdminPage context={contextValue} />
              ) : (
                <AdminPage context={contextValue} requireLogin />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppShell>
    </>
  );
}
