# OpsTrack Cockpit

A Linux hardening and DevOps lab dashboard, built with Tauri 2, React, and
TypeScript.

OpsTrack Cockpit is the desktop control surface for a 47-week, 231-session
hands-on curriculum. It is designed to sit on top of an existing lab runner:
the CLI remains the source of truth, while the app gives learners a clear view
of sessions, verification results, and environment health.

> **Status: Phase 0 scaffold.** The desktop shell, typed Rust bridge, and
> dashboard UI are in place. Session execution and content browsing are the next
> milestones. This is not yet a replacement for the lab CLI.

## Why this exists

DevOps labs usually fail in one of two ways: the instructions drift away from a
working environment, or the dashboard claims success without proving it. This
project takes a different position:

- labs run against real local services, not mocks;
- every completion is backed by the same verifier used from the terminal;
- the UI never gets more optimistic than the verifier;
- mutating actions are serialized and recorded.

## Architecture

```text
┌──────────────────────────────┐
│ React + TypeScript UI        │
│ typed views, no shell access │
└──────────────┬───────────────┘
               │ Tauri IPC
┌──────────────▼───────────────┐
│ Rust host                    │
│ validation, job queue, audit │
└──────────────┬───────────────┘
               │ narrow, typed commands
┌──────────────▼───────────────┐
│ Lab CLI / services           │
│ LocalStack · Podman · gh     │
└──────────────────────────────┘
```

The frontend never receives a shell. New host capabilities are added as
specific Rust commands with a narrow input contract. The planned runner keeps
one mutating job in flight at a time and writes an audit event for every
action.

### Lab environment

The curriculum uses a mix of local and hosted services:

| Area | Runtime |
| --- | --- |
| AWS labs | LocalStack on Podman |
| Local services | Podman containers |
| Relational databases | PostgreSQL in Podman |
| CI/CD labs | GitHub Actions through the GitHub CLI |
| Lesson delivery | Markdown plus verifier scripts |

The repository contains the desktop app only. Lab content, credentials, and
runtime data are intentionally kept out of it.

## Features

### Available in this scaffold

- Native Tauri 2 desktop window with a React 19 + Vite frontend.
- Typed `app_info` command proving the Rust bridge works.
- Dark, responsive dashboard shell for overview, runner, content, and
  verification areas.
- Content Security Policy and a minimal Tauri capability set.
- MIT license and contributor documentation.

### Planned

- Session browser backed by the lab content directory.
- Run and verify actions through a serialized, auditable host queue.
- Environment health cards for LocalStack, PostgreSQL, Podman, and GitHub CLI.
- Progress view for the 47-week path.
- Exportable progress reports.

## Prerequisites

- Node.js 20 or newer and npm.
- Rust stable with Cargo.
- The Tauri Linux dependencies for your distribution.

Fedora:

```bash
sudo dnf install webkit2gtk4.1-devel libsoup3-devel librsvg2-devel \
  libappindicator-gtk3-devel patchelf
```

Debian/Ubuntu:

```bash
sudo apt install libwebkit2gtk-4.1-dev libsoup-3.0-dev librsvg2-dev \
  libayatana-appindicator3-dev patchelf
```

See the [Tauri prerequisites](https://tauri.app/start/prerequisites/) for the
full platform matrix.

## Getting started

```bash
git clone https://github.com/Mohmed717/opstrack-gui.git
cd opstrack-gui
npm install
npm run tauri dev
```

Build a release bundle:

```bash
npm run tauri build
```

Frontend-only development:

```bash
npm run dev
```

The frontend-only build shows the "Browser preview" bridge state because Tauri
commands are not available outside the desktop shell.

## Project layout

```text
opstrack-gui/
├── src/                  React application
│   ├── App.tsx           dashboard shell and Rust bridge call
│   └── App.css           design system and responsive layout
├── src-tauri/            Rust host
│   ├── src/lib.rs        Tauri setup and typed commands
│   ├── capabilities/     allowed desktop capabilities
│   └── tauri.conf.json   window, CSP, bundle configuration
├── public/               static assets
├── CONTRIBUTING.md
├── LICENSE
└── README.md
```

## Security model

- No shell plugin and no arbitrary command execution from the webview.
- Tauri capabilities are limited to the core defaults needed by the window.
- A restrictive Content Security Policy is set for the production webview.
- Secrets, SSH keys, and lab passwords are excluded by `.gitignore` and must
  never be committed.
- The app does not phone home and does not require a cloud account to open.

## Roadmap

- [x] Host audit and Tauri prerequisites plan
- [x] Tauri 2 + React + TypeScript scaffold
- [x] Public project shell, license, and contributor docs
- [ ] Read-only session index over the lab CLI
- [ ] Serialized run/verify bridge with audit log
- [ ] Environment health panel
- [ ] Content browser and progress reports
- [ ] First signed Linux release

## Contributing

Issues and focused pull requests are welcome. Read
[CONTRIBUTING.md](CONTRIBUTING.md) first, and never include lab credentials or
private environment details in an issue.

## License

MIT. See [LICENSE](LICENSE).
