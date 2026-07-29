import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import type { UserI, Role } from "../../../types";
import { PASSWORDS } from "../../../data/auth";

interface Empleado {
  id: number;
  nombre: string;
}

interface UserModalProps {
  empleados: Empleado[];
  onClose: () => void;
  onSave: (user: UserI) => void;
}

export default function UserModal({
  empleados,
  onClose,
  onSave,
}: UserModalProps) {
  const [form, setForm] = useState({
    empleadoId: "",
    username: "",
    password: "",
    role: "empleado" as Role,
  });

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();

    const empleado = empleados.find(
      (e) => e.id === Number(form.empleadoId)
    );

    if (!empleado) return;

    onSave({
      username: form.username,
      role: form.role,
      displayName: empleado.nombre,
    });

    PASSWORDS[form.username] = form.password;

    onClose();
  }

  const field = (
    label: string,
    key: "username" | "password",
    placeholder: string,
    type = "text"
  ) => (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        value={form[key]}
        onChange={(e) =>
          setForm({
            ...form,
            [key]: e.target.value,
          })
        }
        className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e53935]/20 focus:border-[#e53935] transition-all"
        required
      />
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">

        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-800">
            Agregar Usuario
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-4"
        >
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              Empleado
            </label>

            <div className="relative">
              <select
                value={form.empleadoId}
                onChange={(e) =>
                  setForm({
                    ...form,
                    empleadoId: e.target.value,
                  })
                }
                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e53935]/20 focus:border-[#e53935] appearance-none transition-all"
                required
              >
                <option value="">
                  Seleccione un empleado
                </option>

                {empleados.map((emp) => (
                  <option
                    key={emp.id}
                    value={emp.id}
                  >
                    {emp.nombre}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>

          {field(
            "Nombre de usuario",
            "username",
            "Ej: jperez"
          )}

          {field(
            "Contraseña",
            "password",
            "********",
            "password"
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              Rol
            </label>

            <div className="relative">
              <select
                value={form.role}
                onChange={(e) =>
                  setForm({
                    ...form,
                    role: e.target.value as Role,
                  })
                }
                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e53935]/20 focus:border-[#e53935] appearance-none transition-all"
              >
                <option value="admin">
                  Administrador
                </option>

                <option value="empleado">
                  Empleado
                </option>
              </select>

              <ChevronDown
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="flex-1 py-2.5 text-sm font-semibold text-white bg-[#e53935] hover:bg-[#c62828] rounded-lg transition-colors"
            >
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}