import { useState } from "react";
import { allPermisos, initialRoles, rolePermissions } from "../../../data/roles";
import { Check, Plus, Shield, Lock } from "lucide-react";

export default function Configuracion() {
  const [roles, setRoles] = useState(initialRoles);
  const [perms, setPerms] = useState(allPermisos);
  const [selectedRole, setSelectedRole] = useState(initialRoles[0]);
  const [rolePerms, setRolePerms] = useState<Record<number, number[]>>(rolePermissions);
  const [newRoleName, setNewRoleName] = useState("");
  const [newPermName, setNewPermName] = useState("");
  const [newPermModule, setNewPermModule] = useState("");
  const [showNewRole, setShowNewRole] = useState(false);
  const [showNewPerm, setShowNewPerm] = useState(false);

  const modules = [...new Set(perms.map((p) => p.modulo))];

  function togglePerm(permId: number) {
    setRolePerms((prev) => {
      const cur = prev[selectedRole.id] ?? [];
      return { ...prev, [selectedRole.id]: cur.includes(permId) ? cur.filter((x) => x !== permId) : [...cur, permId] };
    });
  }

  function addRole() {
    if (!newRoleName.trim()) return;
    const id = Date.now();
    setRoles((r) => [...r, { id, nombre: newRoleName.trim(), descripcion: "Nuevo rol personalizado", color: "#6b7280" }]);
    setRolePerms((p) => ({ ...p, [id]: [] }));
    setNewRoleName("");
    setShowNewRole(false);
  }

  function addPerm() {
    if (!newPermName.trim() || !newPermModule.trim()) return;
    setPerms((p) => [...p, { id: Date.now(), nombre: newPermName.trim(), modulo: newPermModule.trim() }]);
    setNewPermName("");
    setNewPermModule("");
    setShowNewPerm(false);
  }

  return (
    <div className="p-5 space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Roles list */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2"><Shield size={15} className="text-[#e53935]" /> Roles</h3>
            <button onClick={() => setShowNewRole(!showNewRole)} className="flex items-center gap-1 text-xs text-[#e53935] hover:underline font-medium">
              <Plus size={12} /> Nuevo rol
            </button>
          </div>

          {showNewRole && (
            <div className="bg-white rounded-lg border border-gray-200 p-3 space-y-2">
              <input type="text" placeholder="Nombre del rol" value={newRoleName} onChange={(e) => setNewRoleName(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e53935]/20 focus:border-[#e53935] transition-all" />
              <div className="flex gap-2">
                <button onClick={addRole} className="flex-1 py-1.5 text-xs font-semibold text-white bg-[#e53935] hover:bg-[#c62828] rounded-lg transition-colors">Agregar</button>
                <button onClick={() => setShowNewRole(false)} className="flex-1 py-1.5 text-xs text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">Cancelar</button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            {roles.map((r) => (
              <button key={r.id} onClick={() => setSelectedRole(r)}
                className={`w-full text-left p-3 rounded-lg border transition-all ${selectedRole.id === r.id ? "border-[#e53935] bg-red-50" : "border-gray-200 bg-white hover:border-gray-300"}`}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: r.color }} />
                  <span className="text-sm font-medium text-gray-800">{r.nombre}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1 ml-4">{r.descripcion}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Permissions */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <Lock size={15} className="text-[#e53935]" />
              Permisos — <span className="text-[#e53935]">{selectedRole.nombre}</span>
            </h3>
            <button onClick={() => setShowNewPerm(!showNewPerm)} className="flex items-center gap-1 text-xs text-[#e53935] hover:underline font-medium">
              <Plus size={12} /> Nuevo permiso
            </button>
          </div>

          {showNewPerm && (
            <div className="bg-white rounded-lg border border-gray-200 p-3 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <input type="text" placeholder="Nombre del permiso" value={newPermName} onChange={(e) => setNewPermName(e.target.value)}
                  className="px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e53935]/20 focus:border-[#e53935] transition-all" />
                <input type="text" placeholder="Módulo (ej: Ventas)" value={newPermModule} onChange={(e) => setNewPermModule(e.target.value)}
                  className="px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e53935]/20 focus:border-[#e53935] transition-all" />
              </div>
              <div className="flex gap-2">
                <button onClick={addPerm} className="flex-1 py-1.5 text-xs font-semibold text-white bg-[#e53935] hover:bg-[#c62828] rounded-lg transition-colors">Agregar</button>
                <button onClick={() => setShowNewPerm(false)} className="flex-1 py-1.5 text-xs text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">Cancelar</button>
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-sm border border-black/5 overflow-hidden">
            {modules.map((mod) => {
              const modPerms = perms.filter((p) => p.modulo === mod);
              const cur = rolePerms[selectedRole.id] ?? [];
              return (
                <div key={mod} className="border-b border-gray-50 last:border-b-0">
                  <div className="px-4 py-2 bg-gray-50">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">{mod}</span>
                  </div>
                  {modPerms.map((p) => {
                    const active = cur.includes(p.id);
                    return (
                      <div key={p.id} className="flex items-center justify-between px-4 py-2.5 hover:bg-gray-50/60 transition-colors">
                        <span className="text-sm text-gray-700">{p.nombre}</span>
                        <button onClick={() => togglePerm(p.id)}
                          className={`w-10 h-5 rounded-full transition-colors relative shrink-0 ${active ? "bg-[#e53935]" : "bg-gray-200"}`}>
                          <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${active ? "left-5" : "left-0.5"}`} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          <div className="flex justify-end">
            <button className="flex items-center gap-1.5 bg-[#e53935] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#c62828] transition-colors font-medium">
              <Check size={14} /> Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}