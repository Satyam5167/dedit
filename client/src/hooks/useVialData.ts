import { useState, useEffect, useCallback } from "react";
import API_BASE from "../apiBase";

interface VialData {
  tokenId: number;
  potency: number;
  temperature: number;
  isSpoiled: boolean;
  safeTemperature: number;
  timestamp: string;
}

interface TemperatureHistory {
  timestamp: string;
  temperature: number;
  time: string;
}



export function useVialData(autoRefreshInterval: number = 4000) {
  const [vialData, setVialData] = useState<VialData | null>(null);
  const [temperatureHistory, setTemperatureHistory] = useState<TemperatureHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /** Format timestamp to IST */
  const formatTimeIST = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    });
  };

  /** ----------------------------------------
   * Fetch vial from backend + update history
   * (History stops if spoiled)
   ---------------------------------------- */
  const fetchVialData = useCallback(async (tokenId: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/vial/${tokenId}`);
      if (!response.ok) throw new Error("Token does not exist");

      const data = await response.json();

      const timestamp = data.timestamp ?? new Date().toISOString();

      const formatted: VialData = {
        tokenId: data.tokenId,
        potency: Number(data.potency),
        temperature: Number(data.temperature),
        isSpoiled: Boolean(data.spoiled),
        safeTemperature: 25,
        timestamp,
      };

      setVialData(formatted);

      /** Do NOT push new history if spoiled */
      if (formatted.isSpoiled) return formatted;

      setTemperatureHistory(prev => {
        const last = prev[prev.length - 1];

        if (last && last.temperature === formatted.temperature) return prev;

        return [
          ...prev.slice(-19),
          {
            timestamp,
            temperature: formatted.temperature,
            time: formatTimeIST(timestamp),
          },
        ];
      });

      return formatted;

    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch vial data");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /** ----------------------------------------
   * Update temperature on-chain
   ---------------------------------------- */
  const updateTemperature = useCallback(
    async (tokenId: number, temperature: number) => {
      const response = await fetch(`${API_BASE}/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tokenId, temperature }),
      });

      if (!response.ok) throw new Error("Failed to update temperature");

      await response.json();
      await fetchVialData(tokenId);
    },
    [fetchVialData]
  );

  /** ----------------------------------------
   * Mint vial
   ---------------------------------------- */
  const mintVial = useCallback(async (to: string, tokenId: number) => {
    const response = await fetch(`${API_BASE}/mint`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to, tokenId }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message ?? "Mint failed");
    }

    return await response.json();
  }, []);

  /** ----------------------------------------
   * AUTO-REFRESH GRAPH
   * (Stops refreshing if spoiled)
   ---------------------------------------- */
  useEffect(() => {
    if (!vialData?.tokenId) return;

    if (vialData.isSpoiled) {
      console.warn("Auto-refresh STOPPED → vial is spoiled");
      return;
    }

    const interval = setInterval(() => {
      fetchVialData(vialData.tokenId);
    }, autoRefreshInterval);

    return () => clearInterval(interval);
  }, [vialData?.tokenId, vialData?.isSpoiled, autoRefreshInterval, fetchVialData]);

  /** ----------------------------------------
   * AUTO TEMPERATURE SIMULATION
   * Every 5s → stops if spoiled
   ---------------------------------------- */
  useEffect(() => {
    if (!vialData?.tokenId) return;

    if (vialData.isSpoiled) {
      console.warn("Temperature simulation STOPPED → vial is spoiled");
      return;
    }

    const interval = setInterval(() => {
      const randomTemp = Math.floor(Math.random() * 51); // 0–50°C
      updateTemperature(vialData.tokenId, randomTemp);
    }, 5000);

    return () => clearInterval(interval);
  }, [vialData?.tokenId, vialData?.isSpoiled, updateTemperature]);

  return {
    vialData,
    temperatureHistory,
    loading,
    error,
    fetchVialData,
    updateTemperature,
    mintVial,
  };
}
