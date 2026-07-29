import { useState } from "react";
import { initialVentas } from "../../../data/ventas";
import VentasModal from "./VentasModal";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { dailySales, payMethodData, salesData } from "../../../data/dashboard";
import { Plus, Search } from "lucide-react";
import { avatarColors } from "../../../data/avatarColors";
import { payMethodLabel } from "../../../helpers/payMethodLabel";

import { payMethodBadge } from "../../../helpers/payMethodBadge";
import { empleados } from "../../../data/empleados";
import { initials } from "../../../helpers/initials";
import { estadoBadge } from "../../../helpers/estadoBadge";

export default function Ventas() {
  const [ventas, setVentas] = useState(initialVentas);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = ventas.filter((v) =>
    [v.vehiculo, v.cliente, v.empleado].some((s) => s.toLowerCase().includes(search.toLowerCase()))
  );

  const totalMes = ventas.reduce((a, v) => a + v.monto, 0);
  const totalHoy = ventas.slice(0, 2).reduce((a, v) => a + v.monto, 0);
  const completadas = ventas.filter((v) => v.estado === "Completada").length;

  return (
    <div className="p-5 space-y-5">
      {showModal && (
        <VentasModal onClose={() => setShowModal(false)} onSave={(v) => setVentas((prev) => [v, ...prev])} />
      )}

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Ventas del Mes", value: `USD ${totalMes.toLocaleString()}`, sub: `${ventas.length} transacciones`, color: "text-[#e53935]" },
          { label: "Ventas del Día", value: `USD ${totalHoy.toLocaleString()}`, sub: "2 ventas hoy", color: "text-blue-500" },
          { label: "Ventas Completadas", value: `${completadas}`, sub: `de ${ventas.length} en el mes`, color: "text-emerald-500" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-lg p-4 shadow-sm border border-black/5">
            <div className="text-xs text-gray-500 font-medium mb-1">{s.label}</div>
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-gray-400 mt-1">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 bg-white rounded-lg p-4 shadow-sm border border-black/5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Ventas del Mes</h3>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="mes" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip formatter={(v: number) => [`$${(v / 1000).toFixed(0)}k`, "Ventas"]} contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #e5e7eb" }} />
              <Line type="monotone" dataKey="ventas" stroke="#e53935" strokeWidth={2} dot={false} activeDot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-1 bg-white rounded-lg p-4 shadow-sm border border-black/5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Ventas por Día (semana)</h3>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={dailySales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="dia" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip formatter={(v: number) => [`$${(v / 1000).toFixed(1)}k`, "Ventas"]} contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #e5e7eb" }} />
              <Bar dataKey="ventas" fill="#e53935" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-1 bg-white rounded-lg p-4 shadow-sm border border-black/5">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Métodos de Pago</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={payMethodData} cx="50%" cy="50%" innerRadius={40} outerRadius={62} paddingAngle={3} dataKey="value">
                {payMethodData.map((e) => <Cell key={e.name} fill={e.color} />)}
              </Pie>
              <Legend iconSize={7} formatter={(v) => <span style={{ fontSize: 10, color: "#6b7280" }}>{v}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-black/5 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-gray-700">Todas las Ventas</h3>
          <div className="flex gap-3 items-center">
            <div className="relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Buscar..." value={search} onChange={(e) => setSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e53935]/20 focus:border-[#e53935] transition-all w-48" />
            </div>
            <button onClick={() => setShowModal(true)}
              className="flex items-center gap-1.5 bg-[#e53935] text-white text-sm px-3 py-1.5 rounded-lg hover:bg-[#c62828] transition-colors font-medium whitespace-nowrap">
              <Plus size={13} /> Nueva Venta
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {["Vehículo", "Cliente", "Empleado", "Fecha", "Monto", "Método de Pago", "Detalle", "Estado"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((v) => (
                <tr key={v.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-800 text-xs whitespace-nowrap">{v.vehiculo}</td>
                  <td className="px-4 py-3 text-gray-600 text-xs whitespace-nowrap">{v.cliente}</td>
                  <td className="px-4 py-3 text-xs whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0" style={{ backgroundColor: avatarColors[empleados.findIndex((e) => e.nombre === v.empleado) % avatarColors.length] }}>
                        {initials(v.empleado)}
                      </div>
                      <span className="text-gray-600">{v.empleado}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">{v.fecha}</td>
                  <td className="px-4 py-3 font-semibold text-gray-800 text-xs whitespace-nowrap">USD {v.monto.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${payMethodBadge(v.metodoPago)}`}>{payMethodLabel(v.metodoPago)}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                    {v.metodoPago === "transferencia" && v.referencia && <span>Ref: {v.referencia}</span>}
                    {v.metodoPago === "cuotas" && v.cuotas > 0 && <span>{v.cuotas} cuotas de ${v.cuotaMonto}</span>}
                    {v.metodoPago === "intercambio" && v.vehiculoIntercambio && <span>{v.vehiculoIntercambio}</span>}
                    {v.metodoPago === "efectivo" && <span>—</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${estadoBadge(v.estado)}`}>{v.estado}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2.5 border-t border-gray-100 text-xs text-gray-400">
          {filtered.length} venta{filtered.length !== 1 ? "s" : ""} encontrada{filtered.length !== 1 ? "s" : ""}
        </div>
      </div>
    </div>
  );
}
