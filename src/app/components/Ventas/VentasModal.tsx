import { useState } from "react";
import { initialVentas } from "../../../data/ventas";
import { PayMethod } from "../../../types";
import { empleados } from "../../../data/empleados";
import { ArrowLeftRight, Banknote, ChevronDown, CreditCard, DollarSign, X } from "lucide-react";
import { vehiculos } from "../../../data/vehiculos";

export default function VentasModal({ onClose, onSave }: {
  onClose: () => void;
  onSave: (venta: typeof initialVentas[0]) => void;
}) {
  const [method, setMethod] = useState<PayMethod>("efectivo");
  const [form, setForm] = useState({
    vehiculo: "", cliente: "", empleado: empleados[0].nombre,
    monto: "", referencia: "", cuotas: "", cuotaMonto: "", vehiculoIntercambio: "",
  });

  const methods: { id: PayMethod; label: string; icon: React.ReactNode }[] = [
    { id: "efectivo", label: "Efectivo", icon: <Banknote size={15} /> },
    { id: "transferencia", label: "Transferencia", icon: <ArrowLeftRight size={15} /> },
    { id: "cuotas", label: "Cuotas", icon: <CreditCard size={15} /> },
    { id: "intercambio", label: "Intercambio", icon: <DollarSign size={15} /> },
  ];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const id = Date.now();
    onSave({
      id, vehiculo: form.vehiculo, cliente: form.cliente, empleado: form.empleado,
      fecha: new Date().toLocaleDateString("es-HN"),
      monto: Number(form.monto),
      metodoPago: method, estado: "Pendiente",
      referencia: form.referencia, cuotas: Number(form.cuotas),
      cuotaMonto: Number(form.cuotaMonto), vehiculoIntercambio: form.vehiculoIntercambio,
    });
    onClose();
  }

  const field = (label: string, key: keyof typeof form, placeholder?: string, type = "text") => (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>
      <input type={type} placeholder={placeholder} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e53935]/20 focus:border-[#e53935] transition-all" required />
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-800">Registrar Venta</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors"><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Vehicle select */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Vehículo</label>
            <div className="relative">
              <select value={form.vehiculo} onChange={(e) => setForm({ ...form, vehiculo: e.target.value })} required
                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e53935]/20 focus:border-[#e53935] appearance-none transition-all">
                <option value="">Seleccionar vehículo...</option>
                {vehiculos.filter((v) => v.estado === "Disponible").map((v) => (
                  <option key={v.id} value={`${v.marca} ${v.modelo} ${v.ano}`}>{v.marca} {v.modelo} {v.ano} — {v.precio}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {field("Cliente", "cliente", "Nombre del cliente")}

          {/* Employee select */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Empleado</label>
            <div className="relative">
              <select value={form.empleado} onChange={(e) => setForm({ ...form, empleado: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e53935]/20 focus:border-[#e53935] appearance-none transition-all">
                {empleados.filter((e) => e.estado === "Activo").map((e) => (
                  <option key={e.id} value={e.nombre}>{e.nombre} — {e.cargo}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {field("Monto Total (USD)", "monto", "Ej: 38500", "number")}

          {/* Payment method */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2">Método de Pago</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {methods.map((m) => (
                <button key={m.id} type="button" onClick={() => setMethod(m.id)}
                  className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-lg border-2 text-xs font-medium transition-all ${method === m.id ? "border-[#e53935] bg-red-50 text-[#e53935]" : "border-gray-200 text-gray-500 hover:border-gray-300"
                    }`}>
                  {m.icon}
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Conditional fields */}
          {method === "transferencia" && field("N° de Referencia", "referencia", "TRF-001-2024")}
          {method === "cuotas" && (
            <div className="grid grid-cols-2 gap-3">
              {field("N° de Cuotas", "cuotas", "Ej: 48", "number")}
              {field("Monto por Cuota (USD)", "cuotaMonto", "Ej: 1083", "number")}
            </div>
          )}
          {method === "intercambio" && field("Vehículo en Intercambio", "vehiculoIntercambio", "Ej: Honda CR-V 2019")}

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              Cancelar
            </button>
            <button type="submit" className="flex-1 py-2.5 text-sm font-semibold text-white bg-[#e53935] hover:bg-[#c62828] rounded-lg transition-colors">
              Registrar Venta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
