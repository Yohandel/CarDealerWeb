import { useState } from "react";
import { Page, Role, UserI } from "../../../types";
import { Car, LayoutDashboard, LogOut, Settings, TrendingUp, User, Users } from "lucide-react";
import LogoutModal from "./LogoutModal";
import { SidebarProps } from "../../Interfaces/Props/SidebarProps";


export default function Sidebar({ page, setPage, sidebarOpen, setSidebarOpen, role, user, onLogout }: SidebarProps) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const allNav: { id: Page; label: string; icon: React.ReactNode; adminOnly?: boolean }[] = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={16} />, adminOnly: true },
    { id: "vehiculos", label: "Vehículos", icon: <Car size={16} /> },
    { id: "empleados", label: "Empleados", icon: <User size={16} />, adminOnly: true },
    { id: "usuarios", label: "Usuarios", icon: <Users size={16} />, adminOnly: true },
    { id: "ventas", label: "Ventas", icon: <TrendingUp size={16} /> },
    { id: "configuracion", label: "Configuración", icon: <Settings size={16} />, adminOnly: true },
  ];
  const navItems = allNav.filter((n) => !n.adminOnly || role === "admin");

  return (
    <>
      {showLogoutModal && (
        <LogoutModal
          onConfirm={() => { setShowLogoutModal(false); onLogout(); }}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <aside className={`fixed top-0 left-0 h-full z-30 flex flex-col transition-all duration-300 ${sidebarOpen ? "w-56" : "w-0 lg:w-14"} bg-[#111827] overflow-hidden`}>
        <div className="flex items-center gap-2.5 px-4 py-5 border-b border-white/5 shrink-0">
          <div className="w-7 h-7 bg-[#e53935] rounded flex items-center justify-center shrink-0">
            <Car size={14} className="text-white" />
          </div>
          <div className={`transition-opacity duration-200 ${sidebarOpen ? "opacity-100" : "opacity-0 lg:hidden"}`}>
            <div className="text-white font-bold text-sm leading-none">Auto<span className="text-[#e53935]">Veritas</span></div>
            <div className="text-gray-400 text-[10px] mt-0.5">Concesionario</div>
          </div>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setPage(item.id); if (window.innerWidth < 1024) setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-150 relative ${page === item.id ? "text-white bg-[#1f2937]" : "text-gray-400 hover:text-white hover:bg-[#1f2937]/60"
                }`}
            >
              {page === item.id && <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#e53935]" />}
              <span className="shrink-0">{item.icon}</span>
              <span className={`whitespace-nowrap transition-opacity duration-200 ${sidebarOpen ? "opacity-100" : "opacity-0 lg:hidden"}`}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        {/* User info at bottom of sidebar */}
        <div className={`px-4 py-3 border-t border-white/5 shrink-0 ${sidebarOpen ? "opacity-100" : "opacity-0 lg:hidden"}`}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#e53935] rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
              {user?.displayName.charAt(0)}
            </div>
            <div className="min-w-0">
              <div className="text-white text-xs font-medium truncate">{user?.displayName}</div>
              <div className="text-gray-500 text-[10px]">{role === "admin" ? "Administrador" : "Empleado"}</div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowLogoutModal(true)}
          className="flex items-center gap-3 px-4 py-4 text-sm text-gray-400 hover:text-white border-t border-white/5 transition-colors shrink-0"
        >
          <LogOut size={16} className="shrink-0" />
          <span className={`whitespace-nowrap transition-opacity duration-200 ${sidebarOpen ? "opacity-100" : "opacity-0 lg:hidden"}`}>Cerrar sesión</span>
        </button>
      </aside>
    </>
  );
}
