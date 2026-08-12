# Feather Tab

A lightweight minimalist ahh new tab page /w glassmorphism design live clock and customizable shortcuts(trash new page trust)

## Features

### **Live Clock**
- Real-time display with day, date, and time (mond clock ahh wannabe💀)
- Customizable text color (5 preset colors + custom hex picker)
- Opacity control for visual flexibility (idk why i add it)

### **Search Bar**
- Multiple search engine support: Google, Brave, DuckDuckGo, Bing (uh idk wat search engine to add)
- Engine picker with visual icons (da picker aint supporting blur effect😭)
- Customizable appearance & transparency (or pvp boss)

### **Top Sites**
- Quick shortcuts to your favorite websites (hidden at the bottom btw, hover to reveal it xd)
- Add/edit/remove shortcuts via modal dialog
- Persistent storage using Chrome's storage API (idk it will save da shortcut ahh icon maybe)
- Clean grid layout (dont be jackass adding 50 topsites💀)

### **Settings**
Four-tab settings panel (trash design fr):

**Appearance**
- Dark/Light theme toggle (tbh light theme is buns🥀)
- Glassmorphism toggle (blur effect for da aesthetik)
- Wallpaper upload (any kind of pics but not heavy asses gif💀)
- Transparency slider (idk)

**Search Bar**
- Search engine color customization (why did i add ts at first)
- Appearance fine-tuning (idk either)

**Clock**
- Text color picker (yes)
- Opacity slider (dont eat nuclear bomb(optional))

**Advanced**
- Custom tab title (67 42 name it u want xd)
- Favicon URL or upload (idk i use ai to add ts feature)
- Reset to defaults (yeet every type shi to default)

## Installation

### From Source (Development)

1. **Clone or download this repository(if you have Git installed)**
   ```bash
   git clone <repo-url>
   cd extension
   ```

2. **Open Browser Extensions Page**
   - Navigate to `chrome://extensions/`, `edge://extensions/`, `brave://extensions/`, `about:addons` or.. basically extensions page
   - Enable **Developer mode** (toggle in top-right corner idk)

3. **Load Unpacked**
   - Click **Load unpacked**
   - Select the `extension` folder
   - Done

## Project Structure

```
extension/
├── manifest.json           # Chrome extension manifest
├── newtab.html            # Main HTML structure
├── css/
│   └── style.css          # All styling & animations
├── js/
│   ├── core/
│   │   ├── startup.js     # Initialization & theme loading
│   │   ├── settings.js    # Settings modal logic
│   │   ├── search.js      # Search bar & engine picker
│   │   └── topsite.js     # Shortcuts CRUD operations
│   └── widgets/
│       └── clock.js       # Real-time clock widget
└── assets/
    ├── background/        # Feather-themed wallpapers (dark/light)
    ├── icon/             # Search engine icons & extension icon
    └── fonts/            # Custom fonts (Anurati, Quicksand)
```

## How It Works

### Initialization (`startup.js`)
- Loads saved theme preference
- Restores custom tab title & favicon
- Applies saved wallpaper
- Ensures visual consistency on browser startup

### Clock Widget (`clock.js`)
- Updates every 1000ms
- Formats day, date (ordinal), and time
- Applies stored color & opacity settings

### Search (`search.js`)
- Listens for engine selection
- Constructs search URLs based on selected engine
- Handles form submission & keyboard shortcuts

### Top Sites (`topsite.js`)
- Loads shortcuts from Chrome storage
- Adds/deletes shortcuts via modal
- Re-renders grid on changes

### Settings (`settings.js`)
- Tab-based modal UI
- Real-time preview of color changes
- Wallpaper upload with GIF confirmation
- Settings persistence via Chrome storage API

## Browser Support

- **Chrome** 90+ (Manifest V3)
- **Edge** 90+ (Chromium-based)
- **Brave** (full compatibility)

## Technical Details

### APIs Used
- **Chrome Storage API** — keeps your garbage organized
- **Chrome Permissions** — just `storage`, im trash at cookie logging or sum hacking type shi
- **File API** — wallpaper upload via `FileReader`
- **DOM APIs** — `<dialog>` elements, `requestAnimationFrame` for clock

### Performance
- Minimal JavaScript (yes my 4gb ram low end ass laptop cant handle such lag)
- WebP images for faster load (or at least *faster*, maybe-)
- CSS animations via `transform` & `opacity` (my gpu sucks)
- Clock updates throttled to 1000ms intervals (can anyone buy me a new laptop plss)

### Security
- No external CDN dependencies (no surprises here)
- All assets bundled locally (trust issues? i gotchu)
- No CSP violations (surprisingly responsible for trash software)
- Safe data-URI storage for wallpapers (def safe)

## Obvious Limitations

- Wallpaper GIF playback may tank your fps on potato devices (pls dont do the same like i do on my laptop)
- Custom fonts must be .otf/.woff format (or .ttf if u wanna tweak on js and css idk)
- Shortcuts limited by Chrome storage quota (ye)

## Future Ideas

- [ ] Sync settings across devices (maybe one day lol)
- [ ] Custom clock formats (12h/24h toggle for the pedantic)
- [ ] Lunar calendar integration (aesthetic points)
- [ ] Music player widget (scope creep moment)
- [ ] Drag-to-reorder shortcuts (too lazy rn)
- [ ] Preset theme bundles (copium)

## License

MIT (do whatever idc)

---

**Made with spite for minimalist browsing**
