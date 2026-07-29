import type { PayMethod } from "../types";

export function payMethodLabel(method: PayMethod) {
  const map = {
    efectivo: "Efectivo",
    transferencia: "Transferencia",
    cuotas: "Cuotas",
    intercambio: "Intercambio",
  };

  return map[method];
}