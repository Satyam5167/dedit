import { AlertTriangle } from 'lucide-react';

interface BottleDisplayProps {
  isSpoiled: boolean;
  temperature: number;
  safeTemp: number;
  shake: boolean;
}

export default function BottleDisplay({ isSpoiled, temperature, safeTemp, shake }: BottleDisplayProps) {
  const isOutOfRange = Math.abs(temperature - safeTemp) > 10;

  return (
    <div className="bg-[#f6efe6] border-4 border-black rounded-2xl p-8 shadow-2xl animate-fade-in">
      <h2 className="text-xl font-bold text-[#2c2416] mb-6 flex items-center gap-2">
        VACCINE BOTTLE DISPLAY
        {isSpoiled && <AlertTriangle className="w-5 h-5 text-red-600 animate-pulse-glow" />}
      </h2>

      <div className="flex items-center justify-center min-h-[400px] relative">
        {isSpoiled && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-sm animate-pulse-glow flex items-center gap-2 border-3 border-black shadow-lg z-10">
            <AlertTriangle className="w-4 h-4" />
            SPOILED VIAL
          </div>
        )}

        {isOutOfRange && !isSpoiled && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-4 py-2 rounded-lg font-medium text-sm animate-slide-in flex items-center gap-2 border-2 border-black shadow-lg z-10">
            Temperature Out of Range
          </div>
        )}

        <div
          className={`relative transition-all duration-500 ${shake ? 'animate-shake' : ''} ${
            isSpoiled ? 'animate-glow' : ''
          }`}
        >
          <svg
            width="280"
            height="420"
            viewBox="0 0 280 420"
            className="drop-shadow-2xl"
          >
            <rect
              x="80"
              y="40"
              width="120"
              height="30"
              rx="5"
              fill="#4a4a4a"
              stroke="#000"
              strokeWidth="4"
            />

            <rect
              x="70"
              y="70"
              width="140"
              height="310"
              rx="15"
              fill={isSpoiled ? '#e74c3c' : '#ecf0f1'}
              stroke="#000"
              strokeWidth="5"
            />

            <rect
              x="70"
              y="200"
              width="140"
              height="180"
              rx="0"
              fill={isSpoiled ? '#c0392b' : '#e74c3c'}
              stroke="#000"
              strokeWidth="4"
            />

            <rect
              x="90"
              y="240"
              width="100"
              height="100"
              rx="10"
              fill="#f6efe6"
              stroke="#000"
              strokeWidth="3"
            />

            <text
              x="140"
              y="280"
              textAnchor="middle"
              fill="#000"
              fontSize="16"
              fontWeight="bold"
            >
              VACCINE
            </text>

            <line
              x1="100"
              y1="260"
              x2="180"
              y2="260"
              stroke="#000"
              strokeWidth="3"
            />
            <line
              x1="100"
              y1="310"
              x2="180"
              y2="310"
              stroke="#000"
              strokeWidth="3"
            />

            {isSpoiled && (
              <g className="animate-pulse-glow">
                <text
                  x="140"
                  y="150"
                  textAnchor="middle"
                  fill="#8b0000"
                  fontSize="24"
                  fontWeight="bold"
                >
                  ⚠
                </text>
              </g>
            )}
          </svg>

          {isSpoiled && (
            <div className="absolute inset-0 border-4 border-red-600 rounded-3xl animate-glow"></div>
          )}
        </div>
      </div>
    </div>
  );
}
