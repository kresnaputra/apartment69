# Visual Novel Engine - Tauri Desktop App

This visual novel engine has been configured as a Tauri desktop application, allowing it to run as a native desktop app on macOS, Windows, and Linux.

## Prerequisites

Before running the Tauri app, ensure you have the following installed:

### macOS
- Xcode Command Line Tools: `xcode-select --install`
- Rust: `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`

### Windows
- Microsoft Visual Studio C++ Build Tools
- WebView2 (usually pre-installed on Windows 10/11)
- Rust: Download from https://rustup.rs/

### Linux
- Development dependencies:
  ```bash
  sudo apt update
  sudo apt install libwebkit2gtk-4.1-dev \
    build-essential \
    curl \
    wget \
    file \
    libxdo-dev \
    libssl-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev
  ```
- Rust: `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`

## Available Scripts

### Development Mode
Run the app in development mode with hot-reload:
```bash
bun run tauri:dev
```

This will:
1. Start the Vite dev server on `http://localhost:5173`
2. Launch the Tauri desktop window
3. Enable hot-reload for both frontend and Rust changes

### Build Production App
Create a production build and package the app:
```bash
bun run tauri:build
```

The built application will be available in:
- **macOS**: `src-tauri/target/release/bundle/dmg/`
- **Windows**: `src-tauri/target/release/bundle/msi/`
- **Linux**: `src-tauri/target/release/bundle/deb/` or `appimage/`

### Web Development (without Tauri)
You can still run the web version:
```bash
bun run dev
```

## Window Configuration

The Tauri app is configured with the following window settings:
- **Default Size**: 1280x720 (16:9 aspect ratio, ideal for visual novels)
- **Minimum Size**: 1024x576
- **Resizable**: Yes
- **Centered**: Yes on launch

## Project Structure

```
visual-novel-engine/
├── src/                    # React frontend source
├── src-tauri/             # Tauri backend
│   ├── src/               # Rust source files
│   ├── icons/             # App icons
│   ├── Cargo.toml         # Rust dependencies
│   └── tauri.conf.json    # Tauri configuration
├── dist/                  # Built frontend (generated)
└── package.json           # Node dependencies
```

## Features

- **Native Performance**: Runs as a native desktop application
- **Cross-Platform**: Build for macOS, Windows, and Linux from a single codebase
- **Small Bundle Size**: Tauri apps are significantly smaller than Electron
- **Secure**: Built with Rust for memory safety and security
- **System Integration**: Access to native file system, notifications, and more

## Troubleshooting

### Rust Not Found
If you get a "cargo not found" error:
```bash
source $HOME/.cargo/env
```

### Port Already in Use
If port 5173 is already in use, the dev server will fail. Stop any other Vite processes or change the port in `vite.config.ts`.

### Build Errors on macOS
Ensure Xcode Command Line Tools are installed:
```bash
xcode-select --install
```

## Next Steps

1. Customize the app icon in `src-tauri/icons/`
2. Update the app identifier in `src-tauri/tauri.conf.json`
3. Configure additional Tauri features as needed
4. Add native menus, system tray, or other desktop features

For more information, visit the [Tauri Documentation](https://tauri.app).
