import { PayMethod } from "../types";

export const initialVentas = [
    { id: 1, vehiculo: "Toyota Tacoma 2023", cliente: "Carlos Méndez", empleado: "Diego Alvarado", fecha: "28/06/2024", monto: 38500, metodoPago: "efectivo" as PayMethod, estado: "Completada", referencia: "", cuotas: 0, cuotaMonto: 0, vehiculoIntercambio: "" },
    { id: 2, vehiculo: "Honda Civic 2022", cliente: "Ana Rodríguez", empleado: "Patricia Luna", fecha: "25/06/2024", monto: 24900, metodoPago: "transferencia" as PayMethod, estado: "Completada", referencia: "TRF-001-2024", cuotas: 0, cuotaMonto: 0, vehiculoIntercambio: "" },
    { id: 3, vehiculo: "Ford F-150 2022", cliente: "Jorge Flores", empleado: "Sergio Morales", fecha: "20/06/2024", monto: 52000, metodoPago: "cuotas" as PayMethod, estado: "Pendiente", referencia: "", cuotas: 48, cuotaMonto: 1083, vehiculoIntercambio: "" },
    { id: 4, vehiculo: "Hyundai Tucson 2023", cliente: "Roberto Paz", empleado: "Diego Alvarado", fecha: "15/06/2024", monto: 31200, metodoPago: "intercambio" as PayMethod, estado: "Completada", referencia: "", cuotas: 0, cuotaMonto: 0, vehiculoIntercambio: "Honda CR-V 2019" },
    { id: 5, vehiculo: "Nissan Frontier 2021", cliente: "Lucía Torres", empleado: "Patricia Luna", fecha: "10/06/2024", monto: 41000, metodoPago: "efectivo" as PayMethod, estado: "Completada", referencia: "", cuotas: 0, cuotaMonto: 0, vehiculoIntercambio: "" },
    { id: 6, vehiculo: "Chevrolet Spark 2020", cliente: "Manuel García", empleado: "Sergio Morales", fecha: "05/06/2024", monto: 16700, metodoPago: "cuotas" as PayMethod, estado: "Completada", referencia: "", cuotas: 24, cuotaMonto: 695, vehiculoIntercambio: "" },
];