# DeDiT Dashboard Layout

## ASCII Layout Mockup

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                        │
│  ┌──────────┐                        VIAL TRACKING SYSTEM                             │
│  │  DeDiT   │                                                      [LOAD] [MINT] [WALLET] │
│  │ Dashboard│                                                                          │
│  └──────────┘                                                                          │
│  ┌──────────┐   ┌─────────────────────────────────────────────────────────────────────┤
│  │ DASHBOARD│   │                                                                     │
│  │TRACK VIAL│   │  ┌──────────────────────────┐    ┌──────────────────────────────┐  │
│  │ HISTORY  │   │  │  VACCINE BOTTLE DISPLAY  │    │    TEMPERATURE MODULE       │  │
│  │  ALERTS  │   │  │  ⚠ SPOILED VIAL          │    │         CURRENT: 50°C       │  │
│  │ SETTINGS │   │  │                          │    │                             │  │
│  │   DOCS   │   │  │        ▓▓▓▓▓▓▓           │    │      ┌──────────────────┐  │  │
│  │  ABOUT   │   │  │       ▓▓▓▓▓▓▓▓           │    │   60 │       ●          │  │  │
│  └──────────┘   │  │      ╔═══════╗           │    │      │     ●   ●        │  │  │
│  ┌──────────┐   │  │      ║       ║           │    │   45 │   ●       ●●     │  │  │
│  │  Search  │   │  │      ║ 🧪🧪  ║           │    │      │             ●    │  │  │
│  │  Vial    │   │  │      ║ VACCINE║           │    │   30 ╠─────────────────╢  │  │
│  └──────────┘   │  │      ║       ║           │    │      │       ●     ● ●  │  │  │
│  [Token ID]     │  │      ║       ║           │    │   15 │    ●             │  │  │
│                 │  │      ╚═══════╝           │    │      │  ●               │  │  │
│  Monitoring ●   │  │          ███             │    │    0 └──────────────────┘  │  │
│  Active         │  │                          │    │         14:51  14:52  14:53 │  │
│                 │  │   🔴 GLOWING BORDER      │    │                             │  │
│                 │  └──────────────────────────┘    │   [UPDATE TEMPERATURE BTN]  │  │
│                 │                                  └──────────────────────────────┘  │
│                 │                                                                     │
│                 │  ┌──────────────────────────┐    ┌──────────────────────────────┐  │
│                 │  │    VACCINE STATUS  ⚠     │    │   VIAL CONTROL PANEL        │  │
│                 │  │                          │    │                             │  │
│                 │  │  ┌──────┐   ┌──────┐    │    │  Token ID: 1                │  │
│                 │  │  │  🌡  │   │  💧  │    │    │  Potency: 0.0%              │  │
│                 │  │  │ 50°C │   │ 0.00%│    │    │  Temperature: 50°C          │  │
│                 │  │  │TEMP  │   │POTENCY│   │    │  ⚠ SPOILED                  │  │
│                 │  │  └──────┘   └──────┘    │    │                             │  │
│                 │  │  ┌──────┐   ┌──────┐    │    │  Manual Temp Update         │  │
│                 │  │  │  ⚠  │   │  🛡  │    │    │  [Enter temperature____]    │  │
│                 │  │  │ YES  │   │ 25°C │    │    │                             │  │
│                 │  │  │SPOILED│  │SAFE  │    │    │  [UPDATE TEMPERATURE]       │  │
│                 │  │  └──────┘   └──────┘    │    │  [REFRESH STATUS]           │  │
│                 │  │                          │    │                             │  │
│                 │  │  ●●●● Real-time Active   │    └──────────────────────────────┘  │
│                 │  └──────────────────────────┘                                      │
│                 │                                                                     │
│                 └─────────────────────────────────────────────────────────────────────┤
└────────────────────────────────────────────────────────────────────────────────────────┘
                                                        🔔 Toast notifications appear here
```

## Layout Breakdown

### 1. Left Sidebar (256px wide)
- **Logo Section**: "DeDiT Dashboard"
- **Navigation Menu**: 7 menu items with hover effects
  - Glowing indicator on hover
  - Smooth slide-right animation
- **Search Box**: Token ID input with focus ring
- **Status Indicator**: "Monitoring Active ●" with pulse

### 2. Top Bar (80px height)
- **Title**: "VIAL TRACKING SYSTEM"
- **Action Buttons** (right-aligned):
  - Load Vial (blue)
  - Mint Vial (green)
  - Connect Wallet (dark)
- All buttons have 3px black borders + shadows

### 3. Main Content Area

#### Row 1 (2 columns, 48px gap)

**Left: Vaccine Bottle Display**
- Large SVG vaccine bottle
- Shows liquid level
- "VACCINE" label
- When spoiled:
  - Red glowing border (animated)
  - "⚠ SPOILED VIAL" badge on top
  - Shake animation triggers
- Smooth color transitions

**Right: Temperature Module**
- Real-time Recharts line graph
- Current temperature display
- IST timestamp on X-axis
- Safe temperature reference line (dashed)
- Red data points with pop-in animation
- "Update Temperature Reading" button

#### Row 2 (2 columns, 48px gap)

**Left: Vaccine Stats**
- 4 stat cards in 2x2 grid
- Each card shows:
  - Colored icon background
  - Label (small caps)
  - Large value
- Temperature (red theme)
- Potency (blue theme) - pulses if <50%
- Spoiled (red/green based on status)
- Safe Value (green theme)
- Bottom: "Real-time monitoring active" with animated dots

**Right: Vial Control Panel**
- Top section: Key stats
  - Token ID
  - Potency (animated if low)
  - Temperature
  - Spoiled warning badge
- Manual temp update input
- Action buttons:
  - Update Temperature (red, primary action)
  - Refresh Status (blue)
  - Mint New Vial (green, if no vial)

### 4. Toast Notifications (bottom-right)
- Fixed position
- Stack vertically
- Auto-dismiss after 5 seconds
- Types: success (green), error (red), warning (orange), info (blue)
- Slide-in animation
- Close button (X)

## Spacing Guidelines

- **Outer padding**: 32px (2rem)
- **Component gap**: 32px (2rem)
- **Card padding**: 32px internal
- **Card gap**: 24px between stat cards
- **Border radius**: 16px for cards
- **Border width**: 3-4px black borders
- **Shadow**: Large drop shadows for depth

## Animation Triggers

1. **On Load**: All components fade-in with staggered delays
2. **Temperature Spike (>20°)**: Bottle shakes + warning toast
3. **Vial Spoiled**: Red glow animation + pulse badge
4. **Potency Low (<50%)**: Pulse animation on stat
5. **Monitoring Active**: Pulse animation on dot
6. **Hover**: Menu items slide right, buttons lift up
7. **Chart Updates**: New points pop in smoothly

## Responsive Behavior

- Desktop (1920px+): Full 2-column layout
- Laptop (1440px): Maintains 2-column, slightly tighter spacing
- Tablet (768-1024px): Stacks to single column
- Mobile (<768px): Full mobile stack with sidebar collapse

## Color Palette

```
Background:     #e8d4b8 (warm cream)
Card BG:        #f6efe6 (light cream)
Sidebar:        #2c2416 (dark brown)
Text Dark:      #2c2416
Text Muted:     #8a7a6a
Border:         #000000 (black)
Primary Blue:   #5a8ba8
Primary Green:  #7ba85a
Primary Red:    #e74c3c
Accent Orange:  #e8a87c
```

## Typography

- **Headings**: Bold, 20-24px
- **Body**: Medium, 14-16px
- **Labels**: Bold, 10-12px, uppercase
- **Values**: Bold, 24-32px
- **Font stack**: System fonts (optimized for performance)
