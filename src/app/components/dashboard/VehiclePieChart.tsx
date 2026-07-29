import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import { vehiculoTipo } from "../../../data/dashboard";

const VehiclePieChart = () => {
    return (
        <ResponsiveContainer width="100%" height={200}>
            <PieChart>
                <Pie data={vehiculoTipo} cx="50%" cy="45%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                    {vehiculoTipo.map((e) => <Cell key={e.name} fill={e.color} />)}
                </Pie>
                <Legend iconSize={8} formatter={(v) => <span style={{ fontSize: 11, color: "#6b7280" }}>{v}</span>} />
            </PieChart>
        </ResponsiveContainer>
    );
}

export default VehiclePieChart;