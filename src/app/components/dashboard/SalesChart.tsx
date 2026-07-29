import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { salesData } from "../../../data/dashboard"

const SalesChart = () => {
    return (
        <ResponsiveContainer width="100%" height={200}>
            <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: number) => [`USD ${v.toLocaleString()}`, "Ventas"]} contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e7eb" }} />
                <Line type="monotone" dataKey="ventas" stroke="#e53935" strokeWidth={2.5} dot={false} activeDot={{ r: 4 }} />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default SalesChart