import {
  Home,
  Activity,
  History,
  Bell,
  Settings,
  FileText,
  Info,
  Search
} from "lucide-react";

interface SidebarProps {
  searchVial: string;
  setSearchVial: (value: string) => void;
  onLoadVial: () => void;
  isMonitoring: boolean;
}

export default function Sidebar({
  searchVial,
  setSearchVial,
  onLoadVial,
  isMonitoring
}: SidebarProps) {
  const menuItems = [
    { icon: Home, label: "DASHBOARD" },
    { icon: Activity, label: "TRACK VIAL" },
    { icon: History, label: "HISTORY" },
    { icon: Bell, label: "ALERTS" },
    { icon: Settings, label: "SETTINGS" },
    { icon: FileText, label: "DOCS" },
    { icon: Info, label: "ABOUT" }
  ];

  const safeLoad = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onLoadVial();
  };

  return (
    <div className="
      w-64 bg-[#2c2416] border-r-4 border-black flex flex-col p-6 animate-slide-in shadow-xl
      h-full min-h-screen overflow-y-auto
      scrollbar-thin scrollbar-thumb-[#4d4232] scrollbar-track-[#2c2416]
    ">
      
      {/* HEADER */}
      <div className="mb-12">
        <h1 className="text-3xl font-extrabold text-[#f6efe6] mb-1 tracking-wide">
          DeDiT
        </h1>
        <p className="text-xs text-[#a89a8a] uppercase tracking-widest">
          Dashboard
        </p>
      </div>

      {/* MENU ITEMS */}
      <nav className="flex-1 space-y-1 mb-8">
        {menuItems.map((item, index) => (
          <button
            key={item.label}
            className="
              w-full flex items-center gap-3 px-4 py-3 rounded-lg
              text-[#d4c4b0] hover:bg-[#3d3222]
              transition-all duration-200 group
              focus:outline-none focus:ring-2 focus:ring-[#e8a87c]/40
              relative
            "
            style={{ animationDelay: `${index * 0.06}s` }}
          >
            <item.icon className="w-5 h-5 group-hover:text-[#e8d4b8]" />

            <span className="text-sm font-semibold group-hover:text-[#f6efe6] tracking-wide">
              {item.label}
            </span>

            <div
              className="
                ml-auto h-0 w-0 rounded-full bg-[#e8a87c]
                group-hover:w-1 group-hover:h-6
                transition-all duration-200
              "
            ></div>
          </button>
        ))}
      </nav>

      {/* SEARCH SECTION */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a89a8a]" />
          <input
            type="text"
            placeholder="Search Vial"
            value={searchVial}
            onChange={(e) => setSearchVial(e.target.value)}
            onKeyDown={safeLoad}
            className="
              w-full pl-10 pr-4 py-3 bg-[#3d3222] text-sm
              border-2 border-[#4d4232] rounded-lg text-[#f6efe6]
              placeholder-[#a89a8a]
              focus:outline-none focus:border-[#e8a87c] focus:ring-2 focus:ring-[#e8a87c]/40
              transition-all
            "
          />
        </div>

        {/* MONITORING STATUS */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-[#d4c4b0]">Monitoring Status</span>
          <div
            className={`
              w-2.5 h-2.5 rounded-full shadow-md
              ${isMonitoring ? "bg-green-500 animate-pulse-glow" : "bg-red-500"}
            `}
          ></div>
        </div>
      </div>
    </div>
  );
}
