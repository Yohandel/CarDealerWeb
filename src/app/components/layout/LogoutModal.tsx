import { LogOut } from "lucide-react";

export default function LogoutModal({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
          <LogOut size={20} className="text-[#e53935]" />
        </div>
        <h2 className="text-base font-bold text-gray-800 text-center mb-1">¿Cerrar sesión?</h2>
        <p className="text-sm text-gray-500 text-center mb-6">¿Estás seguro de que deseas cerrar tu sesión actual?</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            Cancelar
          </button>
          <button onClick={onConfirm} className="flex-1 py-2.5 text-sm font-semibold text-white bg-[#e53935] hover:bg-[#c62828] rounded-lg transition-colors">
            Sí, cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}