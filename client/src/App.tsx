import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Manifesto from "./pages/Manifesto";
import NordesteEstrategico from "./pages/NordesteEstrategico";
import Login from "./pages/auth/Login";
import RegisterParceiro from "./pages/auth/RegisterParceiro";
import RegisterProprietario from "./pages/auth/RegisterProprietario";
import RegisterEmpresario from "./pages/auth/RegisterEmpresario";
import Dashboard from "./pages/Dashboard";
import DashboardEmbaixador from "./pages/DashboardEmbaixador";
import DashboardParceiro from "./pages/DashboardParceiro";
import DashboardProprietario from "./pages/DashboardProprietario";
import DashboardEmpresario from "./pages/DashboardEmpresario";
import DashboardAdmin from "./pages/DashboardAdmin";
import Settings from "./pages/Settings";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/manifesto"} component={Manifesto} />
      <Route path={"/nordeste-estrategico"} component={NordesteEstrategico} />
      <Route path={"/auth/login"} component={Login} />
      <Route path={"/auth/register/parceiro"} component={RegisterParceiro} />
      <Route path={"/auth/register/proprietario"} component={RegisterProprietario} />
      <Route path={"/auth/register/empresario"} component={RegisterEmpresario} />
      <Route path={"/dashboard"} component={Dashboard} />
      <Route path={"/dashboard/embaixador"} component={DashboardEmbaixador} />
      <Route path={"/dashboard/parceiro"} component={DashboardParceiro} />
      <Route path={"/dashboard/proprietario"} component={DashboardProprietario} />
      <Route path={"/dashboard/empresario"} component={DashboardEmpresario} />
      <Route path={"/dashboard/admin"} component={DashboardAdmin} />
      <Route path={"/:path/settings"} component={Settings} />
      <Route path={"/settings/:userType"} component={Settings} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
