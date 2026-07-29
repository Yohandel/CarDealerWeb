import { VehicleTypeItem } from "../../../types";
import { DashboardStat } from "../DashboardStat";
import { MonthlySale } from "../MonthlySale";

export interface DashboardProps {
    dashboardStats: DashboardStat[];
    salesData: MonthlySale[];
    vehiculoTipo: VehicleTypeItem[];
}