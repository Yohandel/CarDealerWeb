import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { dashboardStats, vehiculoTipo } from "../../../data/dashboard";
import DashboardCard from "./DashboardCard";
import SalesChart from "./SalesChart";
import VehiclePieChart from "./VehiclePieChart";

export default function Dashboard() {
    return (
        <div className="p-5 space-y-5">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {dashboardStats.map((stat) => (
                    <DashboardCard
                        key={stat.label}
                        {...stat}
                    />
                ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 bg-white rounded-lg p-4 shadow-sm border border-black/5">
                    <h3 className="text-sm font-semibold text-gray-700 mb-4">Ventas Anuales</h3>
                    <SalesChart />
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm border border-black/5">
                    <h3 className="text-sm font-semibold text-gray-700 mb-4">Vehículos por Tipo</h3>
                    <VehiclePieChart />
                </div>
            </div>
        </div>
    );
}