import { Wallet, Plus, Upload } from 'lucide-react';

interface TopBarProps {
  walletAddress: string;
  onConnect: () => void;
  onMint: () => void;
  onLoadVial: () => void;
}

export default function TopBar({
  walletAddress,
  onConnect,
  onMint,
  onLoadVial
}: TopBarProps) {
  const shortAddress = walletAddress
    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
    : "Connect Wallet";

  return (
    <div
      className="
        h-20 bg-[#f6efe6] border-b-4 border-black 
        flex items-center justify-between px-8
        shadow-[0_4px_15px_rgba(0,0,0,0.15)]
        animate-slide-in
      "
    >
      {/* LEFT TITLE */}
      <div className="text-2xl font-extrabold text-[#2c2416] tracking-tight select-none">
        VIAL TRACKING SYSTEM
      </div>

      {/* RIGHT ACTION BUTTONS */}
      <div className="flex items-center gap-4">

        {/* LOAD VIAL */}
        <button
          onClick={() => {
            const id = prompt("Enter Vial Token ID:");
            if (id) onLoadVial(id);
          }}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#5a8ba8] hover:bg-[#4a7b98] text-white font-medium rounded-lg border-3 border-black shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
        >
          <Upload className="w-4 h-4" />
          Load Vial
        </button>

      {/* MINT VIAL */}
      <button
        onClick={onMint}
        className="
            flex items-center gap-2 px-5 py-2.5
            bg-[#7ba85a] hover:bg-[#6b9848] text-white
            font-semibold rounded-lg border-3 border-black
            shadow-lg transition-all duration-200
            hover:shadow-xl hover:-translate-y-0.5 button-glow
          "
      >
        <Plus className="w-4 h-4" />
        Mint Vial
      </button>

      {/* CONNECT WALLET */}
      <button
        onClick={onConnect}
        className="
            flex items-center gap-2 px-5 py-2.5
            bg-[#2c2416] hover:bg-[#3d3222] text-[#f6efe6]
            font-semibold rounded-lg border-3 border-black
            shadow-lg transition-all duration-200
            hover:shadow-xl hover:-translate-y-0.5 
            button-glow 
          "
      >
        <Wallet className="w-4 h-4" />
        {shortAddress}
      </button>
    </div>
    </div >
  );
}
