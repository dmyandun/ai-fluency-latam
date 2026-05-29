---
name: aifluency-security-posture
description: OWASP assessment baseline for AI Fluency LATAM — what is in/out of scope and the standing risk drivers
metadata:
  type: project
---

AI Fluency LATAM is a fully client-side Next.js 15 App Router app (deployed as a Hugging Face Docker Space, port 7860). No backend DB, no auth, no API routes, no middleware, no first-party network calls. All state in localStorage keys `afl_result` and `afl_roadmap` — only non-sensitive self-reported Likert scores + user-typed roadmap tasks (no PII/secrets/tokens).

**Why:** This shapes every OWASP category — A01/A07/A10 are effectively N/A in first-party code; the real risk lives in dependencies and deploy hardening.

**How to apply (for future assessments of this repo):**
- Status as of 2026-05-29 assessment: the two former standing risk drivers are REMEDIATED. `next` upgraded to 16.2.6 (installed, verified via node -p) — npm audit --omit=dev now shows only 2 MODERATE (transitive postcss <8.5.10 GHSA-qx2v-qp2m-jg93, a CSS-stringify XSS that is not reachable here; no fix without breaking-downgrade to next@9). `next.config.ts` now HAS a full headers() fn (HSTS, X-Frame-Options SAMEORIGIN, X-CTO nosniff, Referrer-Policy, Permissions-Policy, and a CSP). Re-check these first but expect them present.
- Remaining real (Low) gaps: CSP uses `script-src 'self' 'unsafe-inline'` (no nonce — weakens XSS defense-in-depth; acceptable-ish given no injection sinks but worth a nonce/hash if tightening). No A09 client error logging (try/catch in results/roadmap silently swallow). No runtime schema validation on localStorage parse (robustness).
- XSS is NOT exploitable in the roadmap/results render paths: all user content goes through JSX text escaping and there is zero `dangerouslySetInnerHTML`/`eval`/`fetch` in the tree. Re-grep to confirm before re-flagging.
- localStorage parse sites (`app/results/page.tsx`, `lib/roadmap.ts`) use `JSON.parse(...) as Type` with no runtime schema validation — robustness/Low only, not XSS.
- IMPORTANT: if the team adds the planned Supabase/PlanetScale persistence + auth (see CLAUDE.md "Extensiones futuras"), the whole assessment must be redone — that introduces A01/A02/A03-SQLi/A07 surfaces that do not exist today.
