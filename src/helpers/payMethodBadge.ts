import type { PayMethod } from "../types";

export function payMethodBadge(method: PayMethod) {
  const map: Record<PayMethod, string> = {
    efectivo: "bg-emerald-100 text-emerald-700",
    transferencia: "bg-blue-100 text-blue-700",
    cuotas: "bg-amber-100 text-amber-700",
    intercambio: "bg-purple-100 text-purple-700",
  };

  return map[method];
}