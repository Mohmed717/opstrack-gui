# Contributing to OpsTrack Cockpit

Thanks for taking a look. This project is an early desktop scaffold, so small,
focused changes are easiest to review.

## Before you start

- Open an issue for a bug or a meaningful feature before a large pull request.
- Keep the desktop app a control surface. Lab logic belongs in the lab CLI, not
  in the React frontend.
- Never commit credentials, SSH keys, lab passwords, generated reports, or
  customer data.

## Development setup

```bash
git clone https://github.com/Mohmed717/opstrack-gui.git
cd opstrack-gui
npm install
npm run tauri dev
```

Linux prerequisites are listed in the README. The app uses Tauri 2, React 19,
TypeScript, and Vite.

## Pull requests

1. Fork the repository and create a topic branch.
2. Keep commits readable and scoped to one concern.
3. Run `npm run build` before opening the PR.
4. When the Tauri toolchain is available, run `cargo check` in `src-tauri`.
5. Describe what changed, why, and how you verified it.

## Code style

- TypeScript: keep components typed and avoid `any`.
- Rust: run `cargo fmt` and `cargo clippy`.
- CSS: use the existing variables and responsive patterns.
- Do not add a shell-execution plugin or expose arbitrary commands to the
  webview. New host capabilities need a narrow, typed command and a review.

## Security

If you find a security issue, do not open a public issue with exploit details.
Contact the maintainer through the repository security advisory flow instead.

## License

By contributing, you agree that your contribution is licensed under the MIT
License in this repository.
