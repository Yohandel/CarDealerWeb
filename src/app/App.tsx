import { useState } from "react";
import type { UserI, Page } from "../types";

import Login from "./components/auth/Login";
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import Dashboard from "./components/dashboard/Dashboard";
import Empleados from "./components/Empleados/Empleados";
import Configuracion from "./components/Configuration/Configuracion";
import Vehiculos from "./components/Vehiculos/Vehiculos";
import Ventas from "./components/Ventas/Ventas";
import Users from "./components/Users/Users";
import { USERS } from "../data/auth";
import { empleados } from "../data/empleados";

const pageTitles: Record<Page, string> = {
  dashboard: "Dashboard",
  vehiculos: "Vehículos",
  empleados: "Empleados",
  ventas: "Ventas",
  usuarios: "Usuarios",
  configuracion: "Configuración",
};

export default function App() {
  const [user, setUser] = useState<UserI | null>(null);
  const [page, setPage] = useState<Page>("vehiculos");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [users, setUsers] = useState<UserI[]>(USERS);

  if (!user) return <Login onLogin={(u) => { setUser(u); setPage(u.role === "admin" ? "dashboard" : "vehiculos"); }} />;

  const marginLeft = sidebarOpen ? "ml-56" : "ml-0 lg:ml-14";

  return (
    <div className="h-screen flex overflow-hidden bg-[#f0f2f5]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Sidebar page={page} setPage={setPage} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} role={user.role} user={user} onLogout={() => setUser(null)} />
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${marginLeft}`}>
        <Topbar title={pageTitles[page]} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} user={user} />
        <main className="flex-1 overflow-y-auto">
          {page === "dashboard" && <Dashboard />}
          {page === "vehiculos" && <Vehiculos role={user.role} />}
          {page === "empleados" && <Empleados />}
          {page === "ventas" && <Ventas />}
          {page === "usuarios" && <Users/>}
          {page === "configuracion" && <Configuracion />}
        </main>
      </div>
    </div>
  );
}
