import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";
import { RefreshCw } from "lucide-react";

interface TemperatureData {
  timestamp: string;
  temperature: number;
  time: string;
}

interface TemperatureChartProps {
  data: TemperatureData[];
  safeTemp: number;
  onUpdate: () => void;
  updating: boolean;
}

export default function TemperatureChart({
  data,
  safeTemp,
  onUpdate,
  updating
}: TemperatureChartProps) {
  const currentTemp =
    data.length > 0 ? data[data.length - 1].temperature : 0;

  return (
    <div className="bg-[#f6efe6] border-4 border-black rounded-2xl p-8 shadow-2xl animate-fade-in">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#2c2416]">TEMPERATURE MODULE</h2>

        <div
          className={`
            text-lg font-bold text-[#2c2416] 
            bg-white px-5 py-2 rounded-lg border-3 border-black shadow 
            transition-all duration-300
            ${currentTemp > safeTemp + 10 ? "animate-pulse-glow" : ""}
          `}
        >
          {currentTemp}°C
        </div>
      </div>

      {/* CHART CONTAINER */}
      <div className="bg-white border-3 border-black rounded-xl p-4 mb-4 shadow-inner">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="5 5" stroke="#d4c4b0" />

            {/* X-axis with IST time */}
            <XAxis
              dataKey="timestamp"
              stroke="#2c2416"
              tick={{ fill: "#2c2416", fontSize: 11 }}
              tickLine={{ stroke: "#2c2416" }}
              tickFormatter={(ts: string) => {
                const date = new Date(ts);
                return date.toLocaleTimeString("en-IN", {
                  hour12: false,
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  timeZone: "Asia/Kolkata"
                });
              }}
            />

            {/* Y-axis */}
            <YAxis
              stroke="#2c2416"
              tick={{ fill: "#2c2416", fontSize: 12 }}
              tickLine={{ stroke: "#2c2416" }}
              label={{
                value: "°C",
                angle: -90,
                position: "insideLeft",
                fill: "#2c2416"
              }}
            />

            {/* TOOLTIP */}
            <Tooltip
              contentStyle={{
                backgroundColor: "#f6efe6",
                border: "3px solid #000",
                borderRadius: "8px",
                fontWeight: "bold"
              }}
              formatter={(value) => [`${value}°C`, "Temperature"]}
              labelFormatter={(ts) =>
                new Date(ts).toLocaleTimeString("en-IN", {
                  hour12: false,
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  timeZone: "Asia/Kolkata"
                })
              }
            />

            {/* Safe line */}
            <ReferenceLine
              y={safeTemp}
              stroke="#5a8ba8"
              strokeDasharray="8 8"
              strokeWidth={2}
              label={{
                value: "SAFE",
                fill: "#5a8ba8",
                fontSize: 12,
                fontWeight: "bold",
                position: "right"
              }}
            />

            {/* Temperature Curve */}
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#e74c3c"
              strokeWidth={3}
              dot={{
                r: 5,
                fill: "#e74c3c",
                stroke: "#000",
                strokeWidth: 2,
                className: "animate-pop-in"
              }}
              activeDot={{
                r: 7,
                fill: "#c0392b",
                stroke: "#000"
              }}
              animationDuration={600}
              animationEasing="ease-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* REFRESH BUTTON */}
      <button
        onClick={onUpdate}
        disabled={updating}
        className="
          w-full flex items-center justify-center gap-2 px-6 py-3
          bg-[#5a8ba8] hover:bg-[#4a7b98] disabled:bg-gray-400
          text-white font-bold rounded-lg border-3 border-black shadow-lg
          transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5
          disabled:cursor-not-allowed
        "
      >
        <RefreshCw className={`w-5 h-5 ${updating ? "animate-spin" : ""}`} />
        {updating ? "Updating Temperature..." : "Update Temperature Reading"}
      </button>

    </div>
  );
}
