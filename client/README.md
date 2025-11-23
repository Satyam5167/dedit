# DeDiT - Decentralized Digital Twin for Vial Tracking

A premium React dashboard for real-time vaccine vial monitoring with blockchain integration.

## Features

- **Real-time Temperature Monitoring**: Auto-updates every 10 seconds
- **Temperature History Graph**: Recharts-based visualization with IST timestamps
- **Vial Status Dashboard**: Displays potency, temperature, spoiled status
- **Interactive Bottle Display**: Visual indicators for spoiled vials
- **Manual Temperature Updates**: Update temperature via blockchain
- **NFT Minting**: Create new vial NFTs
- **Toast Notifications**: User-friendly feedback for all actions
- **Smooth Animations**: Pulse, shake, glow, and slide-in effects
- **Retro Medical Theme**: Vintage lab equipment aesthetic

## Tech Stack

- React 18 + TypeScript
- Tailwind CSS (custom animations)
- Recharts (temperature graphs)
- Lucide React (icons)
- Vite (build tool)

## Prerequisites

- Node.js 18+ or 20+
- npm or yarn
- Backend API running at http://localhost:5000

## Installation

```bash
# Clone the repository
git clone <your-repo>
cd project

# Install dependencies
npm install

# Start development server
npm run dev
```

## Backend API Endpoints

The frontend expects these endpoints:

### GET /vial/:id
Get vial data by token ID
```json
{
  "tokenId": 1,
  "potency": 85.5,
  "temperature": 25,
  "isSpoiled": false,
  "safeTemperature": 25,
  "timestamp": "2025-11-23T04:00:00Z"
}
```

### POST /update
Update vial temperature
```json
{
  "tokenId": 1,
  "temperature": 30
}
```

### POST /mint
Mint new vial NFT
```json
{
  "to": "0x...",
  "tokenId": 1
}
```

## Component Structure

```
src/
├── components/
│   ├── Sidebar.tsx          # Left navigation and search
│   ├── TopBar.tsx           # Wallet connection and actions
│   ├── BottleDisplay.tsx    # Animated vaccine bottle
│   ├── TemperatureChart.tsx # Real-time temperature graph
│   ├── VaccineStats.tsx     # Status cards
│   ├── ControlPanel.tsx     # Manual controls
│   └── Toast.tsx            # Notification system
├── hooks/
│   └── useVialData.ts       # API and state management
├── App.tsx                  # Main application
├── index.css                # Custom animations
└── main.tsx                 # Entry point
```

## Key Features

### 1. Animations

- **Pulse Glow**: Monitoring indicator, spoiled badges
- **Shake**: Temperature spike detection
- **Slide-in**: Component entry animations
- **Glow**: Spoiled vial border effect
- **Fade-in**: Smooth content loading
- **Pop-in**: Chart data points

### 2. Temperature Monitoring

- Auto-refresh every 10 seconds
- IST timezone for timestamps
- Safe temperature reference line
- Out-of-range detection
- Historical data (last 20 readings)

### 3. User Interactions

- Connect wallet (mock implementation)
- Load vial by token ID
- Mint new vial
- Update temperature manually
- Refresh vial status

### 4. Visual Indicators

- Red glowing border when spoiled
- Shake animation on temperature spikes
- Potency warning below 50%
- Temperature out-of-range badge
- Monitoring status indicator

## Color Scheme

- Background: `#e8d4b8` (warm cream)
- Cards: `#f6efe6` (soft cream)
- Sidebar: `#2c2416` (dark brown)
- Primary: `#5a8ba8` (muted blue)
- Accent: `#7ba85a` (muted green)
- Danger: `#e74c3c` (muted red)
- Warning: `#e8a87c` (soft orange)

## Toast Notifications

The application provides contextual feedback for:

- ✅ Vial loaded successfully
- ✅ Temperature updated on-chain
- ✅ Vial successfully minted
- ⚠️ Vial spoiled warning
- ⚠️ Temperature spike detected
- ❌ Token does not exist
- ❌ Update/mint failures

## Customization

### Adjust Auto-Refresh Interval

In `App.tsx`:
```typescript
const { vialData, temperatureHistory, ... } = useVialData(10000); // 10 seconds
```

### Change Temperature Spike Threshold

In `App.tsx`:
```typescript
if (tempDiff > 20) { // 20 degree threshold
  setShake(true);
  showToast('⚠️ Severe temperature spike detected!', 'warning');
}
```

### Modify Animation Durations

In `src/index.css`, adjust `@keyframes` timing.

## Development

```bash
# Start dev server
npm run dev

# Type check
npm run typecheck

# Build for production
npm run build

# Preview production build
npm run preview
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

MIT
