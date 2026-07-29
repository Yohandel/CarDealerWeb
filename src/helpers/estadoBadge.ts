export function estadoBadge(estado: string) {
  const map: Record<string, string> = {
    Disponible: "bg-emerald-100 text-emerald-700",
    Vendido: "bg-red-100 text-red-700",
    Reservado: "bg-amber-100 text-amber-700",
    Activo: "bg-emerald-100 text-emerald-700",
    Inactivo: "bg-gray-100 text-gray-500",
    Completada: "bg-emerald-100 text-emerald-700",
    Pendiente: "bg-amber-100 text-amber-700",
  };

  return map[estado] ?? "bg-gray-100 text-gray-500";
}