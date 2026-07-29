export const initialRoles = [
  { id: 1, nombre: "Administrador", descripcion: "Acceso completo al sistema", color: "#e53935" },
  { id: 2, nombre: "Gerente de Ventas", descripcion: "Gestión de ventas y equipo", color: "#3b82f6" },
  { id: 3, nombre: "Vendedor", descripcion: "Registro y seguimiento de ventas", color: "#10b981" },
  { id: 4, nombre: "Recepcionista", descripcion: "Atención al cliente y citas", color: "#f59e0b" },
];

export const allPermisos = [
  { id: 1, nombre: "Ver Dashboard", modulo: "Dashboard" },
  { id: 2, nombre: "Ver Vehículos", modulo: "Vehículos" },
  { id: 3, nombre: "Agregar Vehículos", modulo: "Vehículos" },
  { id: 4, nombre: "Editar Vehículos", modulo: "Vehículos" },
  { id: 5, nombre: "Eliminar Vehículos", modulo: "Vehículos" },
  { id: 6, nombre: "Ver Ventas", modulo: "Ventas" },
  { id: 7, nombre: "Registrar Venta", modulo: "Ventas" },
  { id: 8, nombre: "Ver Empleados", modulo: "Empleados" },
  { id: 9, nombre: "Gestionar Empleados", modulo: "Empleados" },
  { id: 10, nombre: "Gestionar Configuración", modulo: "Configuración" },
];

export const rolePermissions: Record<number, number[]> = {
  1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  2: [1, 2, 3, 4, 6, 7, 8],
  3: [2, 6, 7],
  4: [2, 6],
};