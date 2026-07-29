import { useState } from "react";
import { empleados } from "../../../data/empleados";
import EmpleadoModal from "./EmpleadoModal";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { initials } from "../../../helpers/initials";
import { estadoBadge } from "../../../helpers/estadoBadge";
import { avatarColors } from "../../../data/avatarColors";

export default function Empleados() {
  const [lista, setLista] = useState(empleados);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const filtered = lista.filter((e) =>
    [e.nombre, e.email, e.cargo].some((s) => s.toLowerCase().includes(search.toLowerCase()))
  );
  return (
    <div className="p-5 space-y-4">
      {showModal && <EmpleadoModal onClose={() => setShowModal(false)} onSave={(e) => setLista((l) => [e, ...l])} />}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Buscar empleado..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e53935]/20 focus:border-[#e53935] transition-all w-64" />
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-1.5 bg-[#e53935] text-white text-sm px-3.5 py-2 rounded-lg hover:bg-[#c62828] transition-colors font-medium">
          <Plus size={14} /> Agregar Empleado
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-black/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {["Empleado", "Teléfono", "Cargo", "Estado", "Acciones"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((e, i) => (
                <tr key={e.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ backgroundColor: avatarColors[i % avatarColors.length] }}>
                        {initials(e.nombre)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-800 text-xs">{e.nombre}</div>
                        <div className="text-gray-400 text-xs">{e.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{e.telefono}</td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{e.cargo}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${estadoBadge(e.estado)}`}>{e.estado}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <button className="p-1.5 text-blue-500 hover:bg-blue-50 rounded transition-colors"><Pencil size={13} /></button>
                      <button onClick={() => setLista((l) => l.filter((x) => x.id !== e.id))} className="p-1.5 text-red-400 hover:bg-red-50 rounded transition-colors"><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2.5 border-t border-gray-100 text-xs text-gray-400">
          {filtered.length} empleado{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
        </div>
      </div>
    </div>
  );
}
