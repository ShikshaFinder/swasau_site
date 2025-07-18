import React from "react";

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-5xl font-bold mb-8 text-center text-foreground">
          How CSAI Works
        </h1>
        {/* User Flow Diagram */}
        <div className="flex flex-col items-center mb-12">
          <div className="flex flex-row flex-wrap md:flex-nowrap items-center justify-center gap-4 md:gap-10 lg:gap-16 w-full">
            {/* 1. Login */}
            <div className="flex flex-col items-center min-w-[110px] md:min-w-[140px]">
              <span className="bg-primary/10 rounded-full p-4 md:p-6 mb-2">
                <svg
                  width="48"
                  height="48"
                  className="w-8 h-8 md:w-12 md:h-12"
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
              </span>
              <span className="text-xs md:text-base text-foreground text-center">
                Login to Extension
              </span>
            </div>
            <span className="text-2xl md:text-4xl text-muted-foreground">
              →
            </span>
            {/* 2. Visit Site */}
            <div className="flex flex-col items-center min-w-[110px] md:min-w-[140px]">
              <span className="bg-secondary/10 rounded-full p-4 md:p-6 mb-2">
                <svg
                  width="48"
                  height="48"
                  className="w-8 h-8 md:w-12 md:h-12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="24" cy="24" r="20" />
                  <line x1="4" x2="44" y1="24" y2="24" />
                  <path d="M24 4a20 20 0 0 1 0 40" />
                  <path d="M24 4a20 20 0 0 0 0 40" />
                </svg>
              </span>
              <span className="text-xs md:text-base text-foreground text-center">
                Visit Target Site
              </span>
            </div>
            <span className="text-2xl md:text-4xl text-muted-foreground">
              →
            </span>
            {/* 3. Interact */}
            <div className="flex flex-col items-center min-w-[110px] md:min-w-[140px]">
              <span className="bg-primary/10 rounded-full p-4 md:p-6 mb-2">
                <svg
                  width="48"
                  height="48"
                  className="w-8 h-8 md:w-12 md:h-12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 3l14 34 8-8 14 14 8-8-14-14-8 8-14-34z" />
                </svg>
              </span>
              <span className="text-xs md:text-base text-foreground text-center">
                Interact (Sign in, Add to Cart)
              </span>
            </div>
            <span className="text-2xl md:text-4xl text-muted-foreground">
              →
            </span>
            {/* 4. Review */}
            <div className="flex flex-col items-center min-w-[110px] md:min-w-[140px]">
              <span className="bg-secondary/10 rounded-full p-4 md:p-6 mb-2">
                <svg
                  width="48"
                  height="48"
                  className="w-8 h-8 md:w-12 md:h-12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="24" cy="24" r="20" />
                  <circle cx="24" cy="24" r="6" />
                </svg>
              </span>
              <span className="text-xs md:text-base text-foreground text-center">
                Review Details
              </span>
            </div>
            <span className="text-2xl md:text-4xl text-muted-foreground">
              →
            </span>
            {/* 5. Approve & Scan */}
            <div className="flex flex-col items-center min-w-[110px] md:min-w-[140px]">
              <span className="bg-primary/10 rounded-full p-4 md:p-6 mb-2">
                <svg
                  width="48"
                  height="48"
                  className="w-8 h-8 md:w-12 md:h-12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="24" cy="24" r="20" />
                  <polyline points="13 24 19 30 35 14" />
                </svg>
              </span>
              <span className="text-xs md:text-base text-foreground text-center">
                Approve & Start Scan
              </span>
            </div>
            <span className="text-2xl md:text-4xl text-muted-foreground">
              →
            </span>
            {/* 6. Scanning */}
            <div className="flex flex-col items-center min-w-[110px] md:min-w-[140px]">
              <span className="bg-secondary/10 rounded-full p-4 md:p-6 mb-2">
                <svg
                  width="48"
                  height="48"
                  className="w-8 h-8 md:w-12 md:h-12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="20 3 3 37 18 37 16 57 37 17 18 17 20 3" />
                </svg>
              </span>
              <span className="text-xs md:text-base text-foreground text-center">
                Scanning
              </span>
            </div>
            <span className="text-2xl md:text-4xl text-muted-foreground">
              →
            </span>
            {/* 7. Vulnerability Found */}
            <div className="flex flex-col items-center min-w-[110px] md:min-w-[140px]">
              <span className="bg-primary/10 rounded-full p-4 md:p-6 mb-2">
                <svg
                  width="48"
                  height="48"
                  className="w-8 h-8 md:w-12 md:h-12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="4" y="9" width="40" height="30" rx="6" />
                  <polyline points="4 9 24 27 44 9" />
                </svg>
              </span>
              <span className="text-xs md:text-base text-foreground text-center">
                Notified (Email/Site)
              </span>
            </div>
            <span className="text-2xl md:text-4xl text-muted-foreground">
              →
            </span>
            {/* 8. View Details */}
            <div className="flex flex-col items-center min-w-[110px] md:min-w-[140px]">
              <span className="bg-secondary/10 rounded-full p-4 md:p-6 mb-2">
                <svg
                  width="48"
                  height="48"
                  className="w-8 h-8 md:w-12 md:h-12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="8" y="12" width="32" height="24" rx="6" />
                  <line x1="14" y1="18" x2="34" y2="18" />
                  <line x1="14" y1="26" x2="34" y2="26" />
                  <line x1="14" y1="34" x2="24" y2="34" />
                </svg>
              </span>
              <span className="text-xs md:text-base text-foreground text-center">
                View Details & Logs
              </span>
            </div>
          </div>
        </div>
        {/* Technical Details Section */}
        <div className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
            Agentic Flow: Technical Details
          </h2>
          <ol className="list-decimal list-inside text-base md:text-lg text-muted-foreground space-y-4">
            <li>
              <span className="font-semibold text-foreground">
                Browser Extension Capture:
              </span>{" "}
              The user logs in to the browser extension, which starts capturing
              all web traffic (XHR, fetch requests) as the user interacts with
              the target site.
            </li>
            <li>
              <span className="font-semibold text-foreground">
                Intelligent Filtering:
              </span>{" "}
              The extension filters out non-relevant assets (like images, fonts,
              scripts) and extracts authentication tokens and sensitive
              payloads.
            </li>
            <li>
              <span className="font-semibold text-foreground">
                Streaming to Backend:
              </span>{" "}
              All relevant data is instantly streamed to a centralized backend
              running inside a containerized Kali Linux virtual machine.
            </li>
            <li>
              <span className="font-semibold text-foreground">
                Kubernetes Scaling:
              </span>{" "}
              The VM is deployed in a Kubernetes cluster, allowing the system to
              scale horizontally by spawning new pods as needed for each scan.
            </li>
            <li>
              <span className="font-semibold text-foreground">
                AI-Powered Analysis:
              </span>{" "}
              The CSAI agent uses large language models (like GPT-4) to analyze
              captured requests, recommend payloads, generate test sequences,
              and autonomously search for vulnerabilities (XSS, IDOR, SQLi,
              CSRF, etc).
            </li>
            <li>
              <span className="font-semibold text-foreground">
                Automation & Resilience:
              </span>{" "}
              If any command fails in the VM, the agent retries up to 5 times
              before skipping, and logs all errors, skipped steps, and tokens
              for forensic auditing.
            </li>
            <li>
              <span className="font-semibold text-foreground">
                User Notification & Access:
              </span>{" "}
              When a vulnerability is found, the user is notified by email or on
              the site, and can view the method, proof-of-concept, and all logs
              and details in the dashboard.
            </li>
          </ol>
        </div>
      </section>
    </main>
  );
}
