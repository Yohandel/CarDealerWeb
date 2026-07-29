import { useState } from "react";
import { UserI } from "../../../types";
import { Bell, Menu, TrendingUp, X } from "lucide-react";
import { notifications } from "../../../data/notifications";
import { TopbarProps } from "../../Interfaces/Props/TopbarProps";




export default function Topbar({ title, sidebarOpen, setSidebarOpen, user }: TopbarProps) {
  const [showNotifs, setShowNotifs] = useState(false);

  return (
    <header className="h-14 bg-[#111827] flex items-center justify-between px-4 shrink-0 relative z-40">
      <div className="flex items-center gap-3">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white transition-colors">
          {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
        <span className="text-white font-medium text-sm">{title}</span>
      </div>
      <div className="flex items-center gap-3">
        {/* Bell with dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifs((v) => !v)}
            className="relative text-gray-400 hover:text-white transition-colors p-1"
          >
            <Bell size={16} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-[#e53935] rounded-full" />
          </button>

          {showNotifs && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setShowNotifs(false)} />
              <div className="absolute right-0 top-9 z-40 w-80 bg-white rounded-xl shadow-xl border border-black/5 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-800">Notificaciones</span>
                  <span className="text-xs bg-[#e53935] text-white px-2 py-0.5 rounded-full font-semibold">3</span>
                </div>
                {notifications.map((n) => (
                  <div key={n.id} className="px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <TrendingUp size={13} className="text-emerald-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-gray-700 leading-snug">
                          <span className="font-semibold">{n.empleado}</span> realizó una venta de{" "}
                          <span className="font-semibold">{n.vehiculo}</span> por{" "}
                          <span className="text-[#e53935] font-semibold">{n.monto}</span>
                        </p>
                        <p className="text-[10px] text-gray-400 mt-1">{n.tiempo}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="px-4 py-2.5 text-center">
                  <button className="text-xs text-[#e53935] hover:underline font-medium">Ver todas las notificaciones</button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* User pill */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#e53935] rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
            {user.displayName.charAt(0)}
          </div>
          <div className="hidden sm:block text-right">
            <div className="text-white text-xs font-semibold leading-none">{user.displayName}</div>
            <div className="text-gray-400 text-[10px] mt-0.5">{user.role === "admin" ? "Administrador" : "Empleado"}</div>
          </div>
        </div>
      </div>
    </header>
  );
}