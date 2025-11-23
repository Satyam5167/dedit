import { Thermometer, RefreshCw, Plus } from "lucide-react";

interface ControlPanelProps {
  tokenId: number | null;
  potency: number;
  temperature: number;
  isSpoiled: boolean;
  manualTemp: string;
  setManualTemp: (value: string) => void;
  onUpdateTemp: () => void;
  onRefresh: () => void;
  onMint: () => void;
  updating: boolean;
}

export default function ControlPanel({
  tokenId,
  potency,
  temperature,
  isSpoiled,
  manualTemp,
  setManualTemp,
  onUpdateTemp,
  onRefresh,
  onMint,
  updating
}: ControlPanelProps) {
  const showMintButton = tokenId === null || tokenId === undefined;

  return (
    <div className="bg-[#f6efe6] border-4 border-black rounded-2xl p-8 shadow-2xl animate-fade-in">

      <h2 className="text-xl font-bold text-[#2c2416] mb-6">
        VIAL CONTROL PANEL
      </h2>

      <div className="space-y-6">

        {/* --- INFO BOX --- */}
        <div className="bg-white border-3 border-black rounded-xl p-5">
          <div className="grid grid-cols-2 gap-4 text-sm">

            <div>
              <div className="text-xs font-bold text-[#8a7a6a] mb-1 uppercase">
                Token ID
              </div>
              <div className="text-2xl font-bold text-[#2c2416]">
                {tokenId ?? "—"}
              </div>
            </div>

            <div>
              <div className="text-xs font-bold text-[#8a7a6a] mb-1 uppercase">
                Potency
              </div>
              <div
                className={`text-2xl font-bold ${
                  potency < 50
                    ? "text-orange-500 animate-pulse-glow"
                    : "text-[#5a8ba8]"
                }`}
              >
                {potency.toFixed(1)}%
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t-2 border-[#d4c4b0]">
            <div className="text-xs font-bold text-[#8a7a6a] mb-1 uppercase">
              Temperature
            </div>
            <div className="text-2xl font-bold text-[#e74c3c]">
              {temperature}°C
            </div>
          </div>

          {isSpoiled && (
            <div className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 animate-pulse-glow border-2 border-black">
              ⚠ SPOILED
            </div>
          )}
        </div>

        {/* --- MANUAL TEMP UPDATE BOX --- */}
        <div className="bg-white border-3 border-black rounded-xl p-5">
          <div className="text-sm font-bold text-[#2c2416] mb-3">
            Manual Temp Update
          </div>

          <input
            type="number"
            placeholder="Enter temperature"
            value={manualTemp}
            onChange={(e) => setManualTemp(e.target.value)}
            className="
              w-full px-4 py-2.5 bg-[#f6efe6] 
              border-2 border-[#d4c4b0] rounded-lg 
              text-[#2c2416] placeholder-[#a89a8a]
              focus:outline-none focus:border-[#5a8ba8] focus:ring-2 focus:ring-[#5a8ba8]/30
              transition-all font-medium
            "
          />
        </div>

        {/* --- ACTION BUTTONS --- */}
        <div className="space-y-3">

          {/* UPDATE TEMP */}
          <button
            onClick={onUpdateTemp}
            disabled={updating || !manualTemp}
            className="
              w-full flex items-center justify-center gap-2 
              px-6 py-3.5 bg-[#e74c3c] hover:bg-[#c0392b]
              disabled:bg-[#a89a8a] text-white font-bold 
              rounded-lg border-3 border-black shadow-lg 
              transition-all duration-200 hover:shadow-xl 
              hover:-translate-y-0.5 disabled:cursor-not-allowed
            "
          >
            <Thermometer className="w-5 h-5" />
            Update Temperature
          </button>

          {/* REFRESH */}
          <button
            onClick={onRefresh}
            className="
              w-full flex items-center justify-center gap-2 
              px-6 py-3.5 bg-[#5a8ba8] hover:bg-[#4a7b98]
              text-white font-bold rounded-lg border-3 border-black 
              shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5
            "
          >
            <RefreshCw className="w-5 h-5" />
            Refresh Status
          </button>

          {/* MINT (SHOW WHEN NO VIAL IS LOADED) */}
          {showMintButton && (
            <button
              onClick={onMint}
              className="
                w-full flex items-center justify-center gap-2 
                px-6 py-3.5 bg-[#7ba85a] hover:bg-[#6b9848]
                text-white font-bold rounded-lg border-3 border-black 
                shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5
              "
            >
              <Plus className="w-5 h-5" />
              Mint New Vial
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
