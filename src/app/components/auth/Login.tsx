import { useState } from "react";
import { UserI } from "../../../types";
import { PASSWORDS, USERS } from "../../../data/auth";
import { AlertCircle, Car, Check, ChevronLeft, Eye, EyeOff } from "lucide-react";

export default function Login({ onLogin }: { onLogin: (user: UserI) => void }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState("");
    const [forgotMode, setForgotMode] = useState(false);
    const [forgotSent, setForgotSent] = useState(false);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const user = USERS.find((u) => u.username === username);
        if (!user || PASSWORDS[username] !== password) {
            setError("Usuario o contraseña incorrectos.");
            return;
        }
        setError("");
        onLogin(user);
    }

    function handleForgot(e: React.FormEvent) {
        e.preventDefault();
        setForgotSent(true);
    }

    return (
        <div className="h-screen flex overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
            {/* Left — car image */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&h=900&fit=crop&auto=format"
                    alt="Vehículo de lujo"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#111827]/90 via-[#111827]/60 to-transparent" />
                <div className="relative z-10 flex flex-col justify-end p-12 text-white">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-9 h-9 bg-[#e53935] rounded flex items-center justify-center">
                            <Car size={18} className="text-white" />
                        </div>
                        <div>
                            <div className="text-xl font-bold">Auto<span className="text-[#e53935]">Veritas</span></div>
                            <div className="text-xs text-gray-400">Concesionario</div>
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold leading-tight mb-3">
                        Gestiona tu concesionario<br />desde un solo lugar
                    </h2>
                    <p className="text-gray-300 text-sm max-w-xs">
                        Inventario, ventas, empleados y reportes integrados en una plataforma moderna y fácil de usar.
                    </p>
                </div>
            </div>

            {/* Right — form */}
            <div className="flex-1 flex items-center justify-center bg-[#f0f2f5] p-8">
                <div className="w-full max-w-sm">
                    {/* Mobile logo */}
                    <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
                        <div className="w-8 h-8 bg-[#e53935] rounded flex items-center justify-center">
                            <Car size={16} className="text-white" />
                        </div>
                        <div className="text-lg font-bold text-gray-900">Auto<span className="text-[#e53935]">Veritas</span></div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-black/5 p-8">
                        {!forgotMode ? (
                            <>
                                <h1 className="text-xl font-bold text-gray-900 mb-1">Iniciar sesión</h1>
                                <p className="text-sm text-gray-500 mb-6">Ingresa tus credenciales para continuar</p>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Usuario</label>
                                        <input
                                            type="text"
                                            value={username}
                                            onChange={(e) => { setUsername(e.target.value); setError(""); }}
                                            placeholder="Ej: Admin"
                                            className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e53935]/20 focus:border-[#e53935] transition-all"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Contraseña</label>
                                        <div className="relative">
                                            <input
                                                type={showPass ? "text" : "password"}
                                                value={password}
                                                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                                                placeholder="••••••••"
                                                className="w-full px-3 py-2.5 pr-10 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e53935]/20 focus:border-[#e53935] transition-all"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPass(!showPass)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                            >
                                                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                                            </button>
                                        </div>
                                    </div>

                                    {error && (
                                        <div className="flex items-center gap-2 text-red-600 text-xs bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                                            <AlertCircle size={13} />
                                            {error}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        className="w-full bg-[#e53935] hover:bg-[#c62828] text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
                                    >
                                        Ingresar
                                    </button>
                                </form>

                                <button
                                    onClick={() => setForgotMode(true)}
                                    className="mt-4 w-full text-center text-xs text-[#e53935] hover:underline transition-all"
                                >
                                    Olvidé mi contraseña
                                </button>

                                <div className="mt-6 pt-4 border-t border-gray-100">
                                    <p className="text-xs text-gray-400 text-center mb-2">Credenciales de prueba:</p>
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        <div className="bg-gray-50 rounded p-2 text-center">
                                            <div className="font-semibold text-gray-700">Admin</div>
                                            <div className="text-gray-400">admin@123</div>
                                        </div>
                                        <div className="bg-gray-50 rounded p-2 text-center">
                                            <div className="font-semibold text-gray-700">Empleado</div>
                                            <div className="text-gray-400">empleado@123</div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <button onClick={() => { setForgotMode(false); setForgotSent(false); }} className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 mb-5 transition-colors">
                                    <ChevronLeft size={13} /> Volver
                                </button>
                                <h1 className="text-xl font-bold text-gray-900 mb-1">Recuperar contraseña</h1>
                                <p className="text-sm text-gray-500 mb-6">Te enviaremos un enlace de recuperación</p>
                                {!forgotSent ? (
                                    <form onSubmit={handleForgot} className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Correo electrónico</label>
                                            <input
                                                type="email"
                                                placeholder="correo@autoveritas.com"
                                                className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e53935]/20 focus:border-[#e53935] transition-all"
                                                required
                                            />
                                        </div>
                                        <button type="submit" className="w-full bg-[#e53935] hover:bg-[#c62828] text-white text-sm font-semibold py-2.5 rounded-lg transition-colors">
                                            Enviar enlace
                                        </button>
                                    </form>
                                ) : (
                                    <div className="text-center py-4">
                                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <Check size={22} className="text-emerald-600" />
                                        </div>
                                        <p className="text-sm font-medium text-gray-700 mb-1">Enlace enviado</p>
                                        <p className="text-xs text-gray-400">Revisa tu bandeja de entrada y sigue las instrucciones.</p>
                                        <button onClick={() => { setForgotMode(false); setForgotSent(false); }} className="mt-4 text-xs text-[#e53935] hover:underline">
                                            Volver al login
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}