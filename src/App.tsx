import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

type AppInfo = {
  name: string;
  version: string;
  phase: string;
  platform: string;
};

const navItems = [
  { label: "Overview", href: "#overview", active: true },
  { label: "Lab runner", href: "#runner" },
  { label: "Content", href: "#content" },
  { label: "Verification", href: "#verification" },
  { label: "Status", href: "#overview" },
];

const capabilities = [
  {
    title: "One control surface",
    body: "Launch the lab, inspect session state, and run verification without juggling terminals.",
  },
  {
    title: "Real environments",
    body: "LocalStack backs AWS labs, Podman runs local services, and GitHub Actions labs run on GitHub.",
  },
  {
    title: "Evidence, not guesses",
    body: "Every completion is backed by the same verifier used by the command-line lab runner.",
  },
];

const pipeline = [
  { label: "Host audit", status: "complete" },
  { label: "Tauri scaffold", status: "complete" },
  { label: "Lab runner bridge", status: "next" },
  { label: "Content browser", status: "planned" },
  { label: "Public release", status: "planned" },
];

function App() {
  const [info, setInfo] = useState<AppInfo | null>(null);
  const [bridgeError, setBridgeError] = useState(false);

  useEffect(() => {
    invoke<AppInfo>("app_info")
      .then(setInfo)
      .catch(() => setBridgeError(true));
  }, []);

  return (
    <div className="shell">
      <aside className="sidebar">
        <a className="brand" href="#overview" aria-label="OpsTrack Cockpit home">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" role="img">
              <path d="M16 3 27 7v9c0 7-4.7 11.6-11 13-6.3-1.4-11-6-11-13V7l11-4Z" />
              <path className="brand-glyph" d="m11 13 4 3-4 3m6 0h4" />
            </svg>
          </span>
          <span>
            <strong>OpsTrack</strong>
            <small>Cockpit</small>
          </span>
        </a>

        <nav aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.label}
              className={item.active ? "nav-item active" : "nav-item"}
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="sidebar-foot">
          <span className="pulse" aria-hidden="true" />
          <div>
            <strong>Phase 0</strong>
            <small>Desktop scaffold</small>
          </div>
        </div>
      </aside>

      <main className="main" id="overview">
        <header className="topbar">
          <div>
            <p className="eyebrow">Linux hardening &amp; DevOps lab dashboard</p>
            <h1>Your lab, without the guesswork.</h1>
          </div>
          <div className="system-chip">
            <span className="chip-dot" aria-hidden="true" />
            {info ? `${info.platform} · v${info.version}` : "Desktop shell"}
          </div>
        </header>

        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <span className="tag">Early access scaffold</span>
            <h2 id="hero-title">Run the work. Prove the result.</h2>
            <p>
              OpsTrack Cockpit is the desktop home for a 47-week Linux and
              DevOps curriculum. It keeps the terminal workflow, adds a clear
              session view, and verifies each lab against real local services.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#runner">
                Explore the runner
              </a>
              <a className="button ghost" href="#architecture">
                See the architecture
              </a>
            </div>
          </div>
          <div className="terminal" aria-label="Example lab session">
            <div className="terminal-bar">
              <span />
              <span />
              <span />
              <em>opstrack / session 110</em>
            </div>
            <pre>
              <code>
                <span className="muted">$</span> lab test-week 22{"\n"}
                <span className="ok">[PASS]</span> 106  S3 buckets{"\n"}
                <span className="ok">[PASS]</span> 107  Presigned access{"\n"}
                <span className="ok">[PASS]</span> 108  Lifecycle rules{"\n"}
                <span className="ok">[PASS]</span> 109  Policy &amp; CORS{"\n"}
                <span className="ok">[PASS]</span> 110  Challenge{"\n"}
                <span className="muted">checked 5 · passed 5 · failed 0</span>
              </code>
            </pre>
          </div>
        </section>

        <section className="status-grid" aria-label="Lab platform status">
          <article className="status-card">
            <span className="card-label">Host</span>
            <strong>{info?.platform ?? "Desktop"}</strong>
            <small>Native Tauri process, no local web server</small>
          </article>
          <article className="status-card">
            <span className="card-label">AWS engine</span>
            <strong>LocalStack</strong>
            <small>IAM, EC2, S3, DynamoDB, CloudWatch</small>
          </article>
          <article className="status-card">
            <span className="card-label">Content plan</span>
            <strong>47 weeks</strong>
            <small>231 sessions from shell to deployment</small>
          </article>
          <article className="status-card">
            <span className="card-label">Bridge</span>
            <strong>{bridgeError ? "Browser preview" : info ? "Connected" : "Checking…"}</strong>
            <small>
              {bridgeError
                ? "Open the Tauri app to use host commands"
                : info?.phase ?? "Loading desktop commands"}
            </small>
          </article>
        </section>

        <section className="section" id="architecture">
          <div className="section-head">
            <div>
              <p className="eyebrow">Architecture</p>
              <h2>Keep the CLI as the source of truth.</h2>
            </div>
            <p className="section-note">
              The desktop app is a typed control surface, not a second lab
              implementation.
            </p>
          </div>

          <div className="capability-grid">
            {capabilities.map((item, index) => (
              <article className="capability" key={item.title}>
                <span className="index">0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>

          <div className="flow" aria-label="Request flow">
            <span>React UI</span>
            <i aria-hidden="true">→</i>
            <span>Tauri commands</span>
            <i aria-hidden="true">→</i>
            <span>Whitelisted CLI</span>
            <i aria-hidden="true">→</i>
            <span>Lab engine</span>
          </div>
        </section>

        <section className="section split" id="runner">
          <div>
            <p className="eyebrow">Runner</p>
            <h2>A session view for real terminal work.</h2>
            <p>
              Start a session, open the brief, run the verifier, and read the
              result. Mutating jobs are serialized, and every action is written
              to a local audit trail.
            </p>
            <ul className="check-list">
              <li>Session briefs and hints in one place</li>
              <li>Disposable verification accounts</li>
              <li>Clear failure output instead of silent success</li>
              <li>No arbitrary shell execution from the webview</li>
            </ul>
          </div>
          <div className="pipeline" aria-label="Build progress">
            {pipeline.map((step) => (
              <div className={`pipeline-row ${step.status}`} key={step.label}>
                <span className="pipeline-dot" aria-hidden="true" />
                <strong>{step.label}</strong>
                <small>{step.status}</small>
              </div>
            ))}
          </div>
        </section>

        <section className="section" id="content">
          <div className="section-head">
            <div>
              <p className="eyebrow">Content</p>
              <h2>Built around evidence.</h2>
            </div>
            <p className="section-note">
              A lab is only marked ready after an empty state fails and the
              reference solution passes.
            </p>
          </div>
          <div className="quote">
            <p>
              “The dashboard should never be more optimistic than the
              verifier.”
            </p>
            <span>OpsTrack content contract</span>
          </div>
        </section>

        <footer className="footer" id="verification">
          <span>OpsTrack Cockpit · Phase 0</span>
          <span>MIT licensed · Built with Tauri 2</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
