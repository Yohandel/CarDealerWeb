import { useState } from "react";
import { empleados } from "../../../data/empleados";
import { ChevronDown, X } from "lucide-react";

export default function EmpleadoModal({ onClose, onSave }: { onClose: () => void; onSave: (e: typeof empleados[0]) => void }) {
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", cargo: "Vendedor", estado: "Activo" });

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    onSave({ id: Date.now(), ...form });
    onClose();
  }

  const field = (label: string, key: keyof typeof form, placeholder: string, type = "text") => (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>
      <input type={type} placeholder={placeholder} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e53935]/20 focus:border-[#e53935] transition-all" required />
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-800">Agregar Empleado</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors"><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {field("Nombre completo", "nombre", "Ej: Juan Pérez")}
          {field("Correo electrónico", "email", "correo@autoveritas.com", "email")}
          {field("Teléfono", "telefono", "+504 9999-0000")}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Cargo</label>
            <div className="relative">
              <select value={form.cargo} onChange={(e) => setForm({ ...form, cargo: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e53935]/20 focus:border-[#e53935] appearance-none transition-all">
                <option>Gerente de Ventas</option>
                <option>Vendedor</option>
                <option>Recepcionista</option>
                <option>Mecánico</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Estado</label>
            <div className="relative">
              <select value={form.estado} onChange={(e) => setForm({ ...form, estado: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e53935]/20 focus:border-[#e53935] appearance-none transition-all">
                <option>Activo</option>
                <option>Inactivo</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">Cancelar</button>
            <button type="submit" className="flex-1 py-2.5 text-sm font-semibold text-white bg-[#e53935] hover:bg-[#c62828] rounded-lg transition-colors">Agregar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
