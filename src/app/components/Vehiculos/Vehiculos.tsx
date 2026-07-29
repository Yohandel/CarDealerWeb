import { useState } from "react";
import { vehiculos } from "../../../data/vehiculos";
import { Role } from "../../../types";
import VehiculoModal from "./VehiculoModal";
import { ChevronLeft, ChevronRight, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { estadoBadge } from "../../../helpers/estadoBadge";

export default function Vehiculos({ role }: { role: Role }) {
  const [lista, setLista] = useState(vehiculos);
  const [search, setSearch] = useState("");
  const [pg, setPg] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const perPage = 5;
  const filtered = lista.filter((v) =>
    [v.marca, v.modelo, v.placa].some((s) => s.toLowerCase().includes(search.toLowerCase()))
  );
  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice((pg - 1) * perPage, pg * perPage);

  return (
    <div className="p-5 space-y-4">
      {showModal && <VehiculoModal onClose={() => setShowModal(false)} onSave={(v) => setLista((l) => [v, ...l])} />}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Buscar vehículo..." value={search} onChange={(e) => { setSearch(e.target.value); setPg(1); }}
            className="pl-8 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e53935]/20 focus:border-[#e53935] transition-all w-64" />
        </div>
        {role === "admin" && (
          <button onClick={() => setShowModal(true)} className="flex items-center gap-1.5 bg-[#e53935] text-white text-sm px-3.5 py-2 rounded-lg hover:bg-[#c62828] transition-colors font-medium">
            <Plus size={14} /> Agregar Vehículo
          </button>
        )}
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-black/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {["#", "Imagen", "Marca", "Modelo", "Año", "Placa", "Precio", "Estado", "Acciones"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paged.map((v) => (
                <tr key={v.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="px-4 py-3 text-gray-400 text-xs">{v.id}</td>
                  <td className="px-4 py-3">
                    <img src={v.img} alt={`${v.marca} ${v.modelo}`} className="w-16 h-10 object-cover rounded-md bg-gray-100" />
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800">{v.marca}</td>
                  <td className="px-4 py-3 text-gray-600">{v.modelo}</td>
                  <td className="px-4 py-3 text-gray-600">{v.ano}</td>
                  <td className="px-4 py-3 text-gray-500 font-mono text-xs">{v.placa}</td>
                  <td className="px-4 py-3 font-semibold text-gray-700">{v.precio}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${estadoBadge(v.estado)}`}>{v.estado}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <button className="p-1.5 text-blue-500 hover:bg-blue-50 rounded transition-colors"><Pencil size={13} /></button>
                      {role === "admin" && <button onClick={() => setLista((l) => l.filter((x) => x.id !== v.id))} className="p-1.5 text-red-400 hover:bg-red-50 rounded transition-colors"><Trash2 size={13} /></button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <span>Mostrando {Math.min((pg - 1) * perPage + 1, filtered.length)}–{Math.min(pg * perPage, filtered.length)} de {filtered.length}</span>
          <div className="flex items-center gap-1">
            <button onClick={() => setPg((p) => Math.max(1, p - 1))} disabled={pg === 1} className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30 transition-colors"><ChevronLeft size={14} /></button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} onClick={() => setPg(i + 1)} className={`w-7 h-7 rounded text-xs font-medium transition-colors ${pg === i + 1 ? "bg-[#e53935] text-white" : "hover:bg-gray-100 text-gray-600"}`}>{i + 1}</button>
            ))}
            <button onClick={() => setPg((p) => Math.min(totalPages, p + 1))} disabled={pg === totalPages} className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30 transition-colors"><ChevronRight size={14} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
