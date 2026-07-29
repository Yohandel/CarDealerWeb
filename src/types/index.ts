import { CategoryDistribution } from "../app/Interfaces/CategoryDistribution";

export type Role = "admin" | "empleado";

export type Page =
  | "dashboard"
  | "vehiculos"
  | "empleados"
  | "ventas"
  | "usuarios"
  | "configuracion";

export type PayMethod =
  | "efectivo"
  | "transferencia"
  | "cuotas"
  | "intercambio";

export interface UserI {
  username: string;
  role: Role;
  displayName: string;
}
export type PayMethodItem = CategoryDistribution;
export type VehicleTypeItem = CategoryDistribution;