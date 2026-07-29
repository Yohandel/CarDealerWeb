import type { UserI } from "../types";

export const USERS: UserI[] = [
  {
    username: "Admin",
    role: "admin",
    displayName: "Administrador",
  },
  {
    username: "Empleado",
    role: "empleado",
    displayName: "Empleado",
  },
];

export const PASSWORDS: Record<string, string> = {
  Admin: "admin@123",
  Empleado: "empleado@123",
};