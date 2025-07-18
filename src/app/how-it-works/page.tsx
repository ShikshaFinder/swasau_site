import React from "react";

const steps = [
  {
    title: "Login",
    icon: (
      <svg
        width="32"
        height="32"
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 3h4a2 2 0 0 1 2 2v4" />
        <polyline points="10 17 15 12 10 7" />
        <line x1="15" x2="3" y1="12" y2="12" />
        <path d="M21 21v2a2 2 0 0 1-2 2h-4" />
      </svg>
    ),
    desc: "Login to the browser extension.",
  },
  {
    title: "Visit Site",
    icon: (
      <svg
        width="32"
        height="32"
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="16" cy="16" r="14" />
        <line x1="2" x2="30" y1="16" y2="16" />
        <path d="M16 2a14 14 0 0 1 0 28" />
        <path d="M16 2a14 14 0 0 0 0 28" />
      </svg>
    ),
    desc: "Go to your target site or subdomain.",
  },
  {
    title: "Interact",
    icon: (
      <svg
        width="32"
        height="32"
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 3l14 34 8-8 14 14 8-8-14-14-8 8-14-34z" />
      </svg>
    ),
    desc: "Sign in, add to cart, or perform actions.",
  },
  {
    title: "Review",
    icon: (
      <svg
        width="32"
        height="32"
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="16" cy="16" r="14" />
        <circle cx="16" cy="16" r="4" />
      </svg>
    ),
    desc: "See and approve collected details.",
  },
  {
    title: "Scan",
    icon: (
      <svg
        width="32"
        height="32"
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="16" cy="16" r="14" />
        <polyline points="9 16 13 20 23 10" />
      </svg>
    ),
    desc: "Approve and start the scan.",
  },
  {
    title: "Scanning",
    icon: (
      <svg
        width="32"
        height="32"
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="13 2 2 20 12 20 11 30 22 12 12 12 13 2" />
      </svg>
    ),
    desc: "Agent scans for vulnerabilities.",
  },
  {
    title: "Notified",
    icon: (
      <svg
        width="32"
        height="32"
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="6" width="28" height="20" rx="4" />
        <polyline points="2 6 16 18 30 6" />
      </svg>
    ),
    desc: "Get notified by email or on site.",
  },
  {
    title: "Logs",
    icon: (
      <svg
        width="32"
        height="32"
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="6" width="24" height="20" rx="4" />
        <line x1="8" y1="10" x2="24" y2="10" />
        <line x1="8" y1="16" x2="24" y2="16" />
        <line x1="8" y1="22" x2="16" y2="22" />
      </svg>
    ),
    desc: "View details and logs.",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-slate-100">
      <section className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center text-foreground">
          How CSAI Works
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
          CSAI combines a user-friendly browser extension with a powerful,
          scalable backend to automate vulnerability discovery using AI and the
          best of open-source security tooling.
        </p>
        {/* Flow Diagram Card */}
        <div className="bg-white/90 shadow-xl rounded-3xl px-4 py-8 md:px-4 md:py-12 mb-16 flex flex-col items-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center text-foreground">
            Agentic User Flow
          </h2>
          <div className="w-full overflow-x-auto">
            <div className="flex flex-row items-center justify-center gap-0 md:gap-2 lg:gap-4 min-w-[900px]">
              {steps.map((step, idx) => (
                <React.Fragment key={step.title}>
                  <div className="flex flex-col items-center px-2 md:px-4 lg:px-6">
                    <div
                      className={`flex items-center justify-center rounded-full border-4 ${
                        idx % 2 === 0
                          ? "border-primary/30 bg-primary/10"
                          : "border-secondary/30 bg-secondary/10"
                      } w-16 h-16 md:w-20 md:h-20 mb-2 shadow-md`}
                    >
                      {step.icon}
                    </div>
                    <span className="text-sm md:text-base font-bold text-foreground text-center mb-1">
                      {step.title}
                    </span>
                    <span className="text-xs md:text-sm text-muted-foreground text-center max-w-[120px]">
                      {step.desc}
                    </span>
                  </div>
                  {idx !== steps.length - 1 && (
                    <div className="flex items-center justify-center">
                      <svg
                        width="36"
                        height="24"
                        className="text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="4" y1="12" x2="32" y2="12" />
                        <polyline points="24,6 32,12 24,18" />
                      </svg>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/90 shadow-xl rounded-3xl p-8 md:p-12 mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              How AICyberShield Works: Building an Autonomous Cybersecurity
              Agent with AI, LLMs & Offensive Toolchains
            </h2>
            <p className="text-lg text-muted-foreground mb-6 italic">
              "Cybersecurity meets autonomy — combining traditional tools with
              AI to detect, analyze, and act."
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              — Harsh Jani, Founder of Binarymaster.tech
            </p>
          </div>

          {/* Introduction */}
          <div className="bg-white/90 shadow-lg rounded-2xl p-6 md:p-8 mb-8">
            <h3 className="text-2xl font-bold mb-4 text-foreground flex items-center">
              <span className="text-2xl mr-2">🧠</span>
              Introduction
            </h3>
            <p className="text-base md:text-lg text-muted-foreground mb-4 leading-relaxed">
              With the surge of modern web apps, APIs, and cloud-native systems,
              cyberattacks have become increasingly sophisticated. Meanwhile,
              the talent gap in security teams has widened.
            </p>
            <p className="text-base md:text-lg text-muted-foreground mb-4 leading-relaxed">
              This is where AICyberShield comes in — an autonomous cybersecurity
              agent that merges Kali Linux-level offensive tools with Large
              Language Models (LLMs) to detect, exploit, and report
              vulnerabilities with minimal human intervention.
            </p>
            <p className="text-base md:text-lg text-foreground font-semibold mb-4">
              In this post, we'll walk through:
            </p>
            <ul className="list-disc list-inside text-base md:text-lg text-muted-foreground space-y-2 ml-4">
              <li>The motivation and problem space</li>
              <li>Core architecture of AICyberShield</li>
              <li>Toolchain and LLM orchestration</li>
              <li>Real-world flow (with examples)</li>
              <li>Challenges and how we solved them</li>
              <li>Future roadmap</li>
            </ul>
          </div>

          {/* Problem Statement */}
          <div className="bg-white/90 shadow-lg rounded-2xl p-6 md:p-8 mb-8">
            <h3 className="text-2xl font-bold mb-4 text-foreground flex items-center">
              <span className="text-2xl mr-2">🧨</span>
              Problem: Modern Threats Need Modern Defense
            </h3>
            <p className="text-base md:text-lg text-muted-foreground mb-4 leading-relaxed">
              Typical security testing involves:
            </p>
            <ul className="list-disc list-inside text-base md:text-lg text-muted-foreground space-y-2 ml-4 mb-4">
              <li>Manual recon</li>
              <li>Scripted scans (nmap, dirb, sqlmap)</li>
              <li>Manual report generation</li>
            </ul>
            <p className="text-base md:text-lg text-muted-foreground mb-4 leading-relaxed">
              This process is:
            </p>
            <ul className="list-disc list-inside text-base md:text-lg text-muted-foreground space-y-2 ml-4 mb-4">
              <li>🔁 Repetitive</li>
              <li>🐌 Slow</li>
              <li>🧠 Not context-aware</li>
            </ul>
            <p className="text-base md:text-lg text-foreground font-semibold">
              Imagine if GPT-4 could think like a hacker and automate the whole
              process — that's exactly what AICyberShield does.
            </p>
          </div>

          {/* What Is AICyberShield */}
          <div className="bg-white/90 shadow-lg rounded-2xl p-6 md:p-8 mb-8">
            <h3 className="text-2xl font-bold mb-4 text-foreground flex items-center">
              <span className="text-2xl mr-2">🚀</span>
              What Is AICyberShield?
            </h3>
            <p className="text-base md:text-lg text-muted-foreground mb-4 leading-relaxed">
              AICyberShield is an AI-driven cybersecurity agent that performs
              reconnaissance, vulnerability analysis, and exploit generation
              using tools like BurpSuite, SQLMap, nmap, XSSer, and others —
              guided by intelligent decision-making from models like GPT-4/o3.
            </p>
            <p className="text-base md:text-lg text-muted-foreground mb-4 leading-relaxed">
              It acts like a human penetration tester, with key features:
            </p>
            <ul className="list-disc list-inside text-base md:text-lg text-muted-foreground space-y-2 ml-4">
              <li>
                Autonomous decision-making (e.g., which endpoint to scan next)
              </li>
              <li>Token extraction and session management</li>
              <li>Integration with browser capture extensions</li>
              <li>
                Tool orchestration via natural language (prompt-based command
                gen)
              </li>
              <li>Detailed reporting with fix suggestions</li>
            </ul>
          </div>

          {/* Architecture */}
          <div className="bg-white/90 shadow-lg rounded-2xl p-6 md:p-8 mb-8">
            <h3 className="text-2xl font-bold mb-4 text-foreground flex items-center">
              <span className="text-2xl mr-2">🧱</span>
              Architecture Overview
            </h3>
            <div className="bg-gray-100 rounded-lg p-4 mb-4 font-mono text-sm">
              <pre className="whitespace-pre-wrap">
                {`                ┌────────────────────────────┐
                │     Web Frontend (Next.js) │
                └────────────┬───────────────┘
                             │
                             ▼
                ┌────────────────────────────┐
                │  Command Processor & LLM   │
                │ (LangChain + GPT-4 / o3)   │
                └────────────┬───────────────┘
                             │
         ┌───────────────────┴────────────────────┐
         ▼                                        ▼
┌──────────────────────┐              ┌────────────────────────────┐
│ Tool Executor (Docker│              │ Session Manager (Tokens,   │
│ + Kali Tools)        │              │ Headers, Cookie Storage)   │
└────────────┬─────────┘              └──────────────┬─────────────┘
             │                                       │
             ▼                                       ▼
   ┌─────────────────────┐                ┌──────────────────────┐
   │ Vulnerability Logger│                │ Report Generator      │
   │ + CVSS Scoring      │                │ (PDF / Web Dashboard) │
   └─────────────────────┘                └──────────────────────┘`}
              </pre>
            </div>
          </div>

          {/* Core Components */}
          <div className="bg-white/90 shadow-lg rounded-2xl p-6 md:p-8 mb-8">
            <h3 className="text-2xl font-bold mb-4 text-foreground flex items-center">
              <span className="text-2xl mr-2">🛠</span>
              Core Components
            </h3>

            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-semibold mb-2 text-foreground">
                  1. LLM Agent with LangChain
                </h4>
                <p className="text-base text-muted-foreground mb-2">
                  Input: current findings, tool outputs, goal (e.g., "find
                  SQLi").
                </p>
                <p className="text-base text-muted-foreground mb-2">
                  Output: next tool to run, command to use.
                </p>
                <p className="text-base text-muted-foreground mb-2">
                  Uses LangChain to:
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground ml-4">
                  <li>Parse logs</li>
                  <li>Recall past findings</li>
                  <li>Chain actions (like a plan of attack)</li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-2 text-foreground">
                  2. Tool Orchestrator (Python + Shell)
                </h4>
                <p className="text-base text-muted-foreground mb-2">
                  Supported tools:
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground ml-4 mb-2">
                  <li>nmap, dirb, whatweb, wpscan</li>
                  <li>sqlmap, xsser, hydra, john</li>
                  <li>Custom Python/JS payload injectors</li>
                </ul>
                <p className="text-base text-muted-foreground mb-2">
                  Each tool is containerized and run via commands generated by
                  the LLM.
                </p>
                <div className="bg-gray-100 rounded-lg p-3 font-mono text-sm">
                  <p className="text-foreground font-semibold">Example:</p>
                  <p className="text-muted-foreground">
                    Prompt: "Target has exposed /users?id=, check for SQLi."
                  </p>
                  <p className="text-muted-foreground">
                    LLM Response: sqlmap -u https://target.com/users?id=1
                    --batch --risk=3
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-2 text-foreground">
                  3. Token & Cookie Handler
                </h4>
                <p className="text-base text-muted-foreground mb-2">
                  When scanning logged-in areas:
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground ml-4">
                  <li>Captures session using browser plugin or proxy</li>
                  <li>Extracts tokens from headers (JWT, CSRF)</li>
                  <li>Uses them in all future requests</li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-2 text-foreground">
                  4. Autonomous Mode & Retry Logic
                </h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground ml-4">
                  <li>
                    If the user is inactive for 10 minutes → switch to
                    autonomous flow
                  </li>
                  <li>Retries failed commands up to 5x</li>
                  <li>Logs all failures for analysis</li>
                  <li>Decision logs stored with timestamps</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Case Study */}
          <div className="bg-white/90 shadow-lg rounded-2xl p-6 md:p-8 mb-8">
            <h3 className="text-2xl font-bold mb-4 text-foreground flex items-center">
              <span className="text-2xl mr-2">🧪</span>
              Real-World Case Study: Fintech Dashboard
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-base text-muted-foreground">
                  <strong>Target:</strong> https://finpay.ai/dashboard
                </p>
                <p className="text-base text-muted-foreground">
                  <strong>Scope:</strong> Authenticated routes, backend API
                </p>
              </div>
              <div>
                <p className="text-base text-foreground font-semibold mb-2">
                  🎯 Goal: Discover any critical vulnerabilities in API
                  structure.
                </p>
                <p className="text-base text-muted-foreground mb-2">
                  <strong>Steps:</strong>
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground ml-4 space-y-1">
                  <li>Captures session from login.</li>
                  <li>Finds /admin/export via dirbuster.</li>
                  <li>Detects no auth headers using whatweb + curl.</li>
                  <li>
                    LLM confirms this is a Broken Access Control (OWASP A5).
                  </li>
                  <li>Generates a CVSS score of 7.8.</li>
                  <li>
                    Suggests: "Add JWT token validation at middleware level."
                  </li>
                </ul>
                <p className="text-base text-muted-foreground mt-2">
                  ✅ Exported as a professional PDF report.
                </p>
              </div>
            </div>
          </div>

          {/* Ethics and Security */}
          <div className="bg-white/90 shadow-lg rounded-2xl p-6 md:p-8 mb-8">
            <h3 className="text-2xl font-bold mb-4 text-foreground flex items-center">
              <span className="text-2xl mr-2">🔒</span>
              Ethics and Security
            </h3>
            <ul className="list-disc list-inside text-base text-muted-foreground space-y-2 ml-4">
              <li>Targets must be pre-approved.</li>
              <li>Logs are immutable and signed.</li>
              <li>
                All tools run in isolated Docker containers (no risk to host).
              </li>
              <li>No scanning without explicit authorization.</li>
            </ul>
          </div>

          {/* Challenges */}
          <div className="bg-white/90 shadow-lg rounded-2xl p-6 md:p-8 mb-8">
            <h3 className="text-2xl font-bold mb-4 text-foreground flex items-center">
              <span className="text-2xl mr-2">🧩</span>
              Challenges
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-2 font-semibold text-foreground">
                      Challenge
                    </th>
                    <th className="text-left p-2 font-semibold text-foreground">
                      Solution
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="p-2 text-muted-foreground">
                      Tool output is noisy
                    </td>
                    <td className="p-2 text-muted-foreground">
                      Used LangChain parsing chains to extract key info
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-2 text-muted-foreground">
                      Commands fail often
                    </td>
                    <td className="p-2 text-muted-foreground">
                      Retry logic + AI correction
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-2 text-muted-foreground">
                      Session expiry
                    </td>
                    <td className="p-2 text-muted-foreground">
                      Token refresher + re-authentication fallback
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 text-muted-foreground">Scale</td>
                    <td className="p-2 text-muted-foreground">
                      Kubernetes-based container pool on Azure AKS
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Roadmap */}
          <div className="bg-white/90 shadow-lg rounded-2xl p-6 md:p-8 mb-8">
            <h3 className="text-2xl font-bold mb-4 text-foreground flex items-center">
              <span className="text-2xl mr-2">🔭</span>
              Roadmap
            </h3>
            <ul className="list-none space-y-2">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✅</span>
                <span className="text-base text-muted-foreground">
                  Fine-tune own LLM on CVE datasets
                </span>
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 mr-2">🕵️‍♂️</span>
                <span className="text-base text-muted-foreground">
                  Support APK reverse engineering
                </span>
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 mr-2">📊</span>
                <span className="text-base text-muted-foreground">
                  Real-time dashboards with alerts
                </span>
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 mr-2">🧠</span>
                <span className="text-base text-muted-foreground">
                  Reinforcement learning with user feedback
                </span>
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 mr-2">🧱</span>
                <span className="text-base text-muted-foreground">
                  Plugin system for more tools (e.g., Metasploit)
                </span>
              </li>
            </ul>
          </div>

          {/* Final Thoughts */}
          <div className="bg-white/90 shadow-lg rounded-2xl p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-4 text-foreground flex items-center">
              <span className="text-2xl mr-2">💬</span>
              Final Thoughts
            </h3>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              AICyberShield is your AI-powered ethical hacker — designed to
              automate the boring, scale the smart, and secure the weak points
              before the attackers do.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mt-4">
              Whether you're a startup, SOC team, or a solo bug bounty hunter,
              AICyberShield provides the autonomous cybersecurity capabilities
              you need to stay ahead of threats.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
