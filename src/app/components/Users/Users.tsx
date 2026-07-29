import { useState } from "react";
import { USERS } from "../../../data/auth";
import { empleados } from "../../../data/empleados";
import UserModal from "./UserModal";

import {
    Pencil,
    Plus,
    Search,
    Trash2,
} from "lucide-react";

import { initials } from "../../../helpers/initials";
import { avatarColors } from "../../../data/avatarColors";

export default function Usuarios() {
    const [lista, setLista] = useState(USERS);

    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);

    const filtered = lista.filter((u) =>
        [
            u.displayName,
            u.username,
            u.role,
        ].some((s) =>
            s.toLowerCase().includes(search.toLowerCase())
        )
    );

    return (
        <div className="p-5 space-y-4">

            {showModal && (
                <UserModal
                    empleados={empleados}
                    onClose={() => setShowModal(false)}
                    onSave={(user) =>
                        setLista((l) => [user, ...l])
                    }
                />
            )}

            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">

                <div className="relative">
                    <Search
                        size={14}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="text"
                        placeholder="Buscar usuario..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className="pl-8 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e53935]/20 focus:border-[#e53935] transition-all w-64"
                    />
                </div>

                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-1.5 bg-[#e53935] text-white text-sm px-3.5 py-2 rounded-lg hover:bg-[#c62828] transition-colors font-medium"
                >
                    <Plus size={14} />
                    Agregar Usuario
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-black/5 overflow-hidden">

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">

                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">

                                {[
                                    "Usuario",
                                    "Nombre",
                                    "Rol",
                                    "Acciones",
                                ].map((h) => (
                                    <th
                                        key={h}
                                        className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide"
                                    >
                                        {h}
                                    </th>
                                ))}

                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-50">

                            {filtered.map((u, i) => (
                                <tr
                                    key={u.username}
                                    className="hover:bg-gray-50/70 transition-colors"
                                >

                                    <td className="px-4 py-3 text-xs font-medium text-gray-700">
                                        {u.username}
                                    </td>

                                    <td className="px-4 py-3">

                                        <div className="flex items-center gap-3">

                                            <div
                                                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                                                style={{
                                                    backgroundColor:
                                                        avatarColors[
                                                        i % avatarColors.length
                                                        ],
                                                }}
                                            >
                                                {initials(u.displayName)}
                                            </div>

                                            <div>
                                                <div className="font-medium text-gray-800 text-xs">
                                                    {u.displayName}
                                                </div>
                                            </div>

                                        </div>

                                    </td>

                                    <td className="px-4 py-3">

                                        <span
                                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${u.role === "admin"
                                                    ? "bg-purple-100 text-purple-700"
                                                    : "bg-blue-100 text-blue-700"
                                                }`}
                                        >
                                            {u.role === "admin"
                                                ? "Administrador"
                                                : "Empleado"}
                                        </span>

                                    </td>

                                    <td className="px-4 py-3">

                                        <div className="flex gap-1.5">

                                            <button  onClick={() => setShowModal(true)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded transition-colors">
                                                <Pencil size={13} />
                                            </button>

                                            <button
                                                onClick={() =>
                                                    setLista((l) =>
                                                        l.filter(
                                                            (x) =>
                                                                x.username !==
                                                                u.username
                                                        )
                                                    )
                                                }
                                                className="p-1.5 text-red-400 hover:bg-red-50 rounded transition-colors"
                                            >
                                                <Trash2 size={13} />
                                            </button>

                                        </div>

                                    </td>

                                </tr>
                            ))}

                        </tbody>

                    </table>
                </div>

                <div className="px-4 py-2.5 border-t border-gray-100 text-xs text-gray-400">
                    {filtered.length} usuario
                    {filtered.length !== 1 ? "s" : ""}
                    {" "}
                    encontrado
                    {filtered.length !== 1 ? "s" : ""}
                </div>

            </div>
        </div>
    );
}