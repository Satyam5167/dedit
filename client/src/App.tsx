import { useState, useEffect, useRef } from "react";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import BottleDisplay from "./components/BottleDisplay";
import TemperatureChart from "./components/TemperatureChart";
import VaccineStats from "./components/VaccineStats";
import ControlPanel from "./components/ControlPanel";
import Toast, { ToastType } from "./components/Toast";
import { useVialData } from "./hooks/useVialData";

interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
}

function App() {
  // Stores search input for vial ID
  const [searchVial, setSearchVial] = useState("");

  // Stores connected wallet address
  const [walletAddress, setWalletAddress] = useState("");

  // Stores manually entered temperature
  const [manualTemp, setManualTemp] = useState("");

  // Stores toast messages
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Shows a loading state when updating temperature
  const [updating, setUpdating] = useState(false);

  // Controls shake animation when temperature spikes
  const [shake, setShake] = useState(false);

  // Stores previous temperature to detect spikes
  const prevTempRef = useRef<number | null>(null);

  // Custom hook to fetch vial data
  const {
    vialData,
    temperatureHistory,
    loading,
    fetchVialData,
    updateTemperature,
    mintVial,
  } = useVialData(4000);

  // Function to show toast messages
  const showToast = (message: string, type: ToastType) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  // Function to remove toast messages
  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Simulates wallet connection and generates a random address
  const handleConnectWallet = () => {
    const addr = "0x" + Math.random().toString(16).substring(2, 42);
    setWalletAddress(addr);
    showToast("Wallet connected successfully!", "success");
  };

  const handleLoadVial = async (id?: string | number) => {
    // Only use searchVial when id is not provided
    const tokenId =
      id !== undefined && id !== null && id !== ""
        ? parseInt(id.toString())
        : parseInt(searchVial);

    if (isNaN(tokenId)) {
      showToast("Please enter a valid token ID", "error");
      return;
    }

    try {
      await fetchVialData(tokenId);
      showToast(`Loaded vial #${tokenId}`, "success");
      setSearchVial("");
    } catch {
      showToast("Token does not exist", "error");
    }
  };

  const handleMint = async () => {
    // Asks user for wallet to mint vial to
    const address = prompt("Enter address to mint the vial to:");
    if (!address) return showToast("Mint cancelled", "info");

    // Asks user for token ID
    const tokenStr = prompt("Enter token ID:");
    if (!tokenStr) return showToast("Mint cancelled", "info");

    const tokenId = parseInt(tokenStr);
    if (isNaN(tokenId)) return showToast("Invalid token ID", "error");

    try {
      await mintVial(address, tokenId);
      showToast("Vial minted!", "success");
      await fetchVialData(tokenId);
    } catch (e: any) {
      const msg = e.message ?? "";
      showToast(
        msg.includes("exists")
          ? "This vial already exists."
          : `Mint failed: ${msg}`,
        msg.includes("exists") ? "warning" : "error"
      );
    }
  };

  const handleUpdateTemp = async () => {
    // Checks if vial is loaded
    if (!vialData) return showToast("Load a vial first", "warning");

    // Checks input temperature
    if (!manualTemp) return showToast("Enter a temperature", "warning");

    const temp = parseFloat(manualTemp);
    if (isNaN(temp)) return showToast("Invalid temperature", "error");

    setUpdating(true);
    try {
      await updateTemperature(vialData.tokenId, temp);
      showToast("Temperature updated", "success");
      setManualTemp("");
    } catch {
      showToast("Failed to update temperature", "error");
    } finally {
      setUpdating(false);
    }
  };

  const handleRefresh = async () => {
    // Refreshes the latest data from the blockchain
    if (!vialData) return showToast("Load a vial first", "warning");
    try {
      await fetchVialData(vialData.tokenId);
      showToast("Status refreshed", "success");
    } catch {
      showToast("Failed to refresh", "error");
    }
  };

  // Detects sudden temperature spike
  useEffect(() => {
    if (!vialData) return;

    const prev = prevTempRef.current;

    if (prev !== null) {
      const diff = Math.abs(vialData.temperature - prev);

      // Spike means sudden large temperature change
      if (diff > 20) {
        setShake(true);
        showToast("Severe temperature spike detected!", "warning");
        setTimeout(() => setShake(false), 500);
      }
    }

    prevTempRef.current = vialData.temperature;
  }, [vialData]);

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-[#e8d4b8]">

      {/* SIDEBAR SECTION */}
      <Sidebar
        searchVial={searchVial}
        setSearchVial={setSearchVial}
        onLoadVial={handleLoadVial}
        isMonitoring={!!vialData}
      />

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col h-full">
        <TopBar
          walletAddress={walletAddress}
          onConnect={handleConnectWallet}
          onMint={handleMint}
          onLoadVial={() => {
            const id = prompt("Enter vial token ID:");
            if (id) handleLoadVial(id);
          }}
        />

        {/* SCROLLABLE CONTENT AREA */}
        <div className="flex-1 p-8 overflow-y-auto">

          {!vialData ? (
            // If no vial is loaded
            <div className="h-full flex items-center justify-center">
              <div className="text-center animate-fade-in">
                <div className="text-6xl mb-4"></div>
                <h2 className="text-2xl font-bold text-[#2c2416] mb-3">
                  No Vial Loaded
                </h2>
                <button
                  onClick={handleMint}
                  className="px-6 py-3 bg-[#7ba85a] hover:bg-[#6b9848] text-white font-bold rounded-lg border-3 border-black shadow-lg"
                >
                  Mint Your First Vial
                </button>
              </div>
            </div>
          ) : (
            // If vial is loaded
            <div className="space-y-8">
              {/* DISPLAY SECTION */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <BottleDisplay
                  isSpoiled={vialData.isSpoiled}
                  temperature={vialData.temperature}
                  safeTemp={vialData.safeTemperature}
                  shake={shake}
                />

                <TemperatureChart
                  data={temperatureHistory}
                  safeTemp={vialData.safeTemperature}
                  onUpdate={handleRefresh}
                  updating={loading}
                />
              </div>

              {/* STATS + ACTION PANEL */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <VaccineStats
                  temperature={vialData.temperature}
                  potency={vialData.potency}
                  isSpoiled={vialData.isSpoiled}
                  safeTemp={vialData.safeTemperature}
                />

                <ControlPanel
                  tokenId={vialData.tokenId}
                  potency={vialData.potency}
                  temperature={vialData.temperature}
                  isSpoiled={vialData.isSpoiled}
                  manualTemp={manualTemp}
                  setManualTemp={setManualTemp}
                  onUpdateTemp={handleUpdateTemp}
                  onRefresh={handleRefresh}
                  onMint={handleMint}
                  updating={updating}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* TOAST MESSAGES SECTION */}
      <div className="fixed bottom-6 right-6 space-y-3 z-50">
        {toasts.map((t) => (
          <Toast
            key={t.id}
            message={t.message}
            type={t.type}
            onClose={() => removeToast(t.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
