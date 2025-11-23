import { Thermometer, Droplet, AlertTriangle, ShieldCheck } from 'lucide-react';

interface VaccineStatsProps {
  temperature: number;
  potency: number;
  isSpoiled: boolean;
  safeTemp: number;
}

export default function VaccineStats({ temperature, potency, isSpoiled, safeTemp }: VaccineStatsProps) {
  const safeValue = Number(safeTemp ?? 0);

  const stats = [
    {
      icon: Thermometer,
      label: 'TEMPERATURE',
      value: `${temperature}°C`,
      color: 'bg-[#e74c3c]',
      textColor: 'text-[#e74c3c]',
    },
    {
      icon: Droplet,
      label: 'POTENCY',
      value: `${potency.toFixed(2)}%`,
      color: 'bg-[#5a8ba8]',
      textColor: 'text-[#5a8ba8]',
    },
    {
      icon: AlertTriangle,
      label: 'SPOILED',
      value: isSpoiled ? 'YES' : 'NO',
      color: isSpoiled ? 'bg-red-600' : 'bg-green-600',
      textColor: isSpoiled ? 'text-red-600' : 'text-green-600',
    },
    {
      icon: ShieldCheck,
      label: 'SAFE VALUE',
      value: `${safeValue}°C`,
      color: 'bg-[#7ba85a]',
      textColor: 'text-[#7ba85a]',
    },
  ];

  return (
    <div className="bg-[#f6efe6] border-4 border-black rounded-2xl p-8 shadow-2xl animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-xl font-bold text-[#2c2416]">VACCINE STATUS</h2>

        {isSpoiled && (
          <AlertTriangle className="w-6 h-6 text-red-600 animate-pulse-glow" />
        )}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="
                bg-white border-2 border-black rounded-xl p-6 
                shadow-lg hover:shadow-xl transition-all duration-200 
                hover:-translate-y-1 animate-slide-in
              "
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`p-3 ${stat.color} rounded-lg border-2 border-black`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Potency warning if <50% */}
                {stat.label === 'POTENCY' && potency < 50 && (
                  <AlertTriangle className="w-5 h-5 text-orange-500 animate-pulse-glow" />
                )}
              </div>

              <div className="text-xs font-bold text-[#8a7a6a] mb-2 uppercase tracking-wider">
                {stat.label}
              </div>

              <div className={`text-3xl font-bold ${stat.textColor}`}>
                {stat.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Monitoring indicator */}
      <div className="mt-6 flex items-center gap-2 text-xs text-[#8a7a6a] bg-white px-4 py-3 rounded-lg border-2 border-black">
        <div className="flex gap-1">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full bg-[#2c2416] ${i === 0 ? 'animate-pulse-glow' : ''}`}
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
        <span className="font-medium">Real-time monitoring active</span>
      </div>
    </div>
  );
}
