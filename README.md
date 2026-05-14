# The Development Lab

A youth athlete development marketplace that connects families with trusted providers for sport-specific training, speed & strength coaching, academic tutoring, and mental performance support.

🌐 **Live site:** [davevoyles.github.io/The-Development-Lab](https://davevoyles.github.io/The-Development-Lab/)

---

## What Is This?

The Development Lab is a **two-sided marketplace** — think Thumbtack or Care.com, but purpose-built for youth athletes. One side is **families** looking for help developing their kid as a whole athlete (not just sports skills). The other side is **providers** — trainers, tutors, sport psychologists, and program partners — who want to reach those families without spending on marketing.

The problem it solves: families currently piece together support from disconnected sources (word-of-mouth referrals, Facebook groups, cold Googling). There's no single place to compare options across **four pillars** of athlete development:

1. **Sport-Specific Training** — position coaching, game film, sport skills
2. **Speed, Agility & Strength** — physical performance, injury prevention
3. **Tutoring** — academics alongside athletics (eligibility matters)
4. **Social-Emotional Development** — sports psychology, mental performance, resilience

### Where We Are Today

This repo is the **Phase 1 static MVP** — a pitch asset and proof-of-concept. It has:

- A working **matchmaker demo** that scores and ranks sample providers against family criteria
- Sample **provider profiles** across all four pillars
- An **investor pitch section** with business model, market size, and roadmap
- A **contact form** for families, providers, programs, and investors to signal interest

There is **no backend, no database, no accounts, no payments**. Everything runs in the browser with hardcoded sample data. This is intentional — we validate demand and provider supply *before* spending money on infrastructure.

### Roadmap

| Phase | Name | What It Proves |
|-------|------|---------------|
| **1** (now) | Static MVP & Signal Capture | Do families want this? Do providers want to be listed? Do investors see the opportunity? |
| **2** | Pilot Marketplace | Can we facilitate real matches? What's the conversion rate from inquiry to booking? |
| **3** | Operating System | Can we handle payments, scheduling, subscriptions, and provider tools at scale? |
| **4** | Data Moat & Expansion | Can we build a defensible network through data, performance tracking, and partner integrations? |

---

## For Non-Technical Readers: Why These Technology Choices?

If you're a stakeholder, investor, or partner wondering why we chose specific tools, this section translates the technical decisions into business reasoning.

### "Why is the site static? Why not build the full product now?"

**Building a full marketplace before proving demand is the #1 startup killer.** A static site costs nearly nothing to host ($0–9/month on GitHub Pages), ships in days instead of months, and lets us test whether families and providers actually want this. If nobody signs up through the contact form or tries the matchmaker, no amount of backend infrastructure would save the idea.

This is the "lean startup" approach: spend as little as possible to learn as much as possible, then invest in infrastructure only when data supports it.

### "Why React and TypeScript?"

- **React** is the most widely-used UI framework in the world. That means the largest hiring pool, the most tutorials, the most open-source components, and the easiest time finding help. When we hire developers later, most of them will already know React.
- **TypeScript** catches bugs before users see them. It's JavaScript with guardrails — the computer checks your work as you type instead of letting mistakes slip through to production. Every serious startup uses it now.

### "Why Azure instead of AWS or Google Cloud?"

- **Microsoft Founders Hub** offers up to $150K in free Azure credits for startups. That could cover 2+ years of Tier 1–2 infrastructure at zero cost.
- **Azure AD B2C** gives us enterprise-grade login/signup for free up to 50,000 users — most competitors charge for this from day one.
- **Stripe** handles payments regardless of cloud provider, so we're not locked in. If Azure costs become uncompetitive, the app can move. The code doesn't care where it runs.

### "Why start with GitHub Pages and move to Azure later?"

GitHub Pages is **free forever** for static sites. Until we need a database, login system, or payment processing (Phase 2+), paying for cloud hosting would be wasting money. The migration to Azure is straightforward — we swap the hosting target in one config file and add the backend services incrementally.

### "Why Stripe Connect for payments?"

Stripe Connect is purpose-built for marketplaces. It handles:
- **Splitting payments** between the platform (us) and providers automatically
- **Onboarding providers** with identity verification and bank accounts
- **Regulatory compliance** (PCI, tax reporting) so we don't have to build it
- Alternatives like Square or PayPal don't offer the same marketplace-specific features without significant custom work.

### "What's the matchmaking algorithm?"

The current matchmaker is a **scoring engine** that ranks providers based on weighted criteria: sport match, category fit, budget alignment, age group, format preference, availability, and trust signals. It's deterministic (same inputs always produce the same rankings) and fully test-covered.

In the future this becomes a backend service with configurable weights, A/B testing, and learning from booking outcomes — but the core logic is already proven and tested in `src/lib/matchmaking.ts`.

### "How much will this cost to run?"

| Stage | Monthly Cost | What You Get |
|-------|-------------|-------------|
| **Now** (Phase 1) | **$0** | Static site on GitHub Pages, no backend |
| **Pilot** (Phase 2) | **$37 – $55** | Basic backend, database, auth for ~500 users |
| **Growth** (Phase 3) | **$430 – $550** | Full marketplace with search, chat, payments for ~10K users |
| **Scale** (Phase 4) | **$1,300 – $1,700** | High availability, CDN, advanced search for 50K+ users |

These costs exclude Stripe transaction fees (2.9% + $0.30 per booking) and any Microsoft startup credits, which could zero out the first 1–2 years.

---

## For Developers & Agents: Codebase Guide

If you're a developer joining the project, a Copilot agent picking up a task, or reviewing a PR — this section gives you the context you need to work effectively.

### Project Structure

```
src/
├── App.tsx                  # Root component — section ordering and layout
├── main.tsx                 # React entry point
├── styles.css               # All styles — CSS custom properties, no preprocessor
├── components/
│   ├── FourPillars.tsx      # Service category cards
│   ├── MarketOpportunity.tsx # Market stats section
│   ├── InvestorPitchSection.tsx # Business model + pitch content
│   ├── DemoMatchmaker.tsx   # Interactive matchmaker form + results
│   ├── ProviderNetwork.tsx  # Filterable provider directory
│   ├── AudiencePaths.tsx    # Family / specialist / program / investor CTAs
│   ├── RoadmapSection.tsx   # Phase timeline
│   └── ContactSection.tsx   # Contact form
├── data/
│   ├── providers.ts         # Provider profiles, categories, labels, types
│   └── siteContent.ts       # Pillars, roadmap, audience paths, market stats
├── lib/
│   ├── matchmaking.ts       # Scoring algorithm — the core business logic
│   └── matchmaking.test.ts  # Test coverage for matchmaking
└── webgl/
    └── DevelopmentNetwork.tsx # Three.js background animation (lazy-loaded)
```

### Key Design Decisions

| Decision | Why | Alternative Considered |
|----------|-----|----------------------|
| **Single CSS file** | MVP simplicity; the site has ~12 components and ~670 lines of CSS. A preprocessor or CSS-in-JS would add build complexity for no real benefit at this scale. | Tailwind, CSS Modules |
| **No router** | The site is one page with anchor-link navigation. Adding React Router for a single-page pitch site would be over-engineering. | React Router, TanStack Router |
| **Static data in TS files** | Type-safe, no fetch latency, no API to maintain. The matchmaker works entirely client-side, proving the algorithm before we build a backend. | JSON files, mock API |
| **Lazy-loaded WebGL** | The Three.js bundle is ~850KB. Lazy loading it means the page renders instantly and the 3D background appears after. Users on slow connections still get a functional site. | Eager import, separate page |
| **Vitest over Jest** | Vitest shares Vite's config and runs natively with ESM/TypeScript. Zero extra config vs. Jest which needs transformers. | Jest |
| **No state management library** | `useState` + `useMemo` handles all current needs. The matchmaker form is the most complex state, and it's contained in one component. Adding Redux or Zustand would be premature. | Redux, Zustand, Jotai |

### Conventions

- **Styling:** CSS custom properties prefixed with `--tdl-` (e.g., `--tdl-accent`, `--tdl-surface`). Category colors use `--tdl-cat-*` variables. All responsive breakpoints are at 900px and 620px.
- **Components:** Functional components, no class components. Each section is its own file. Data comes from `src/data/` imports, not props drilling.
- **Types:** Provider-related types (`ProviderCategory`, `BudgetTier`, `AgeGroup`, etc.) are defined and exported from `src/data/providers.ts`. The matchmaking types live in `src/lib/matchmaking.ts`.
- **Testing:** Only the matchmaking algorithm has tests currently. Run with `npm test`. If you change scoring logic, update the tests.
- **Category color coding:** Each provider category has a unique color applied via `cat-{category}` CSS classes and `data-cat` attributes on filter buttons. Colors are defined as CSS variables in `:root`.

### What Agents Need to Know

- **The matchmaking algorithm is the core IP.** Changes to `src/lib/matchmaking.ts` should always be accompanied by test updates in `matchmaking.test.ts`.
- **All content is in two files:** `src/data/siteContent.ts` (pillars, roadmap, audience, stats, business models) and `src/data/providers.ts` (provider profiles and category definitions). To add a provider or change copy, edit these files.
- **The CSS is intentionally simple.** Don't introduce a CSS framework or preprocessor without explicit discussion. The current approach works well for the site's scale.
- **Build and validate before committing:** `npm run typecheck && npm test && npm run build`. All three must pass.
- **GitHub Pages deployment is automatic.** Pushing to `main` triggers the deploy workflow. Don't push broken builds.

---

## Current Tech Stack (Static MVP)

The site is a single-page static app deployed to GitHub Pages — no backend, no database, no auth. All data is hardcoded in TypeScript modules.

| Layer | Technology | Details |
|-------|-----------|---------|
| **Framework** | React 19 | SPA with functional components and hooks |
| **Language** | TypeScript 5.7 | Strict mode enabled |
| **Build** | Vite 6 | Dev server + production bundler |
| **Styling** | Plain CSS | Single `styles.css` with custom properties, no preprocessor |
| **3D / Visual** | Three.js + React Three Fiber | Lazy-loaded WebGL background network |
| **Data** | Static TS modules | `src/data/providers.ts`, `src/data/siteContent.ts` |
| **Matchmaking** | Local algorithm | `src/lib/matchmaking.ts` — deterministic scoring engine |
| **Testing** | Vitest + Testing Library | `src/lib/matchmaking.test.ts` |
| **Hosting** | GitHub Pages | CI via `.github/workflows/deploy-pages.yml` |

### Key dependencies

```
react           ^19.0.0        three            ^0.171.0
react-dom       ^19.0.0        @react-three/fiber ^9.0.0
vite            ^6.0.5         vitest           ^4.1.5
typescript      ^5.7.2
```

---

## Local Development

```bash
npm install
npm run dev
```

## Validation

```bash
npm run typecheck
npm run test
npm run build
```

## Deployment

The site deploys automatically to GitHub Pages on push to `main`:

```
https://davevoyles.github.io/The-Development-Lab/
```

The Vite `base` path is set to `/The-Development-Lab/`. If a custom domain is added later, update `vite.config.ts` and add the required `CNAME` file.

---

## Production Architecture (Future State)

The full marketplace requires authentication, a relational database, search indexing, real-time messaging, payment processing, and background jobs. The architecture below shows the target state on Azure.

> **Why not build this now?** Every service below costs money and adds operational complexity. We add each one only when the product demands it — e.g., Azure SQL appears in Phase 2 when we need real user accounts, not before. This "pay for complexity when you earn it" approach keeps burn rate near zero during validation.

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                          CLIENTS                                    │
│   [Web / PWA]          [Mobile PWA]          [Admin Dashboard]      │
└────────┬───────────────────┬──────────────────────┬─────────────────┘
         │                   │                      │
         ▼                   ▼                      ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   AZURE FRONT DOOR / CDN                            │
│              WAF · SSL · Global Edge Routing                        │
└────────────────────────────┬────────────────────────────────────────┘
                             │
              ┌──────────────┴──────────────┐
              ▼                             ▼
┌──────────────────────┐     ┌──────────────────────────────────────┐
│  STATIC WEB APPS     │     │  APP SERVICE / CONTAINER APPS        │
│  React SPA + CDN     │     │  REST API  (Node / .NET)             │
│                      │     │                                      │
│  Marketing pages     │     │  ┌─────────┐  ┌──────────────────┐  │
│  Matchmaker UI       │     │  │Auth /   │  │Provider Service  │  │
│  Provider search     │     │  │Profile  │  │Profiles, creds,  │  │
│                      │     │  │Service  │  │availability      │  │
│                      │     │  └────┬────┘  └───────┬──────────┘  │
│                      │     │       │               │             │
│                      │     │  ┌────┴────┐  ┌──────┴──────────┐  │
│                      │     │  │Matching │  │Booking Service  │  │
│                      │     │  │Service  │  │Schedule, cancel, │  │
│                      │     │  │Scoring  │  │confirm           │  │
│                      │     │  └────┬────┘  └───────┬──────────┘  │
│                      │     │       │               │             │
│                      │     │  ┌────┴────┐  ┌──────┴──────────┐  │
│                      │     │  │Payments │  │Messaging        │  │
│                      │     │  │Stripe   │  │Chat, threads,   │  │
│                      │     │  │Connect  │  │notifications    │  │
│                      │     │  └─────────┘  └─────────────────┘  │
└──────────────────────┘     └──────────────────────────────────────┘
                                           │
              ┌───────────────┬────────────┼────────────┬──────────┐
              ▼               ▼            ▼            ▼          ▼
     ┌──────────────┐ ┌────────────┐ ┌──────────┐ ┌────────┐ ┌────────┐
     │ POSTGRESQL   │ │ AZURE AI   │ │  REDIS   │ │ BLOB   │ │ AD B2C │
     │ (Azure SQL)  │ │ SEARCH     │ │  CACHE   │ │STORAGE │ │  AUTH   │
     │              │ │            │ │          │ │        │ │        │
     │ Users        │ │ Provider   │ │ Sessions │ │ Photos │ │ Login  │
     │ Providers    │ │ discovery  │ │ Hot data │ │ Docs   │ │ Signup │
     │ Bookings     │ │ Geo search │ │ Search   │ │ Media  │ │ RBAC   │
     │ Payments     │ │ Facets     │ │ cache    │ │        │ │        │
     │ Messages     │ │            │ │          │ │        │ │        │
     └──────────────┘ └────────────┘ └──────────┘ └────────┘ └────────┘

     ┌─────────────────────────────────────────────────────────────┐
     │                    BACKGROUND / ASYNC                       │
     │  Azure Functions: email, push, payout triggers, indexing    │
     │  GitHub Actions:  CI / CD pipeline                          │
     │  App Insights:    traces, errors, funnel metrics            │
     └─────────────────────────────────────────────────────────────┘
```

### Frontend (Future)

| Need | Technology | Rationale |
|------|-----------|-----------|
| **App shell** | React (keep current) | Already built; large ecosystem |
| **SSR / SEO** | Next.js or Remix | Marketplace pages need crawlability |
| **Auth UI** | Azure AD B2C hosted screens | Managed login/signup, MFA, social login |
| **Payments** | Stripe Elements | PCI-compliant embedded checkout |
| **Real-time** | Azure SignalR / WebSocket | Chat, notifications, live availability |
| **Maps** | Azure Maps or Mapbox | Provider geo-search and distance filtering |
| **Mobile** | PWA first | Shared codebase; native only if push/offline becomes critical |

### Backend (Future)

| Service | Technology | Rationale |
|---------|-----------|-----------|
| **API** | REST (Node.js or .NET) on App Service | Marketplace CRUD fits REST; scale with autoscale rules |
| **Auth** | Azure AD B2C | Microsoft-aligned; RBAC for family / provider / admin roles |
| **Database** | Azure SQL (PostgreSQL) | Relational data: users, providers, bookings, payments, messages |
| **Search** | Azure AI Search | Faceted provider search, geo queries, fuzzy matching |
| **Cache** | Azure Cache for Redis | Session store, search result caching, hot provider data |
| **Storage** | Azure Blob Storage | Provider photos, credentials, insurance docs, media |
| **Payments** | Stripe Connect | Marketplace splits, provider payouts, refunds |
| **Messaging** | Azure SignalR Service | Family ↔ provider chat, read receipts, typing indicators |
| **Notifications** | SendGrid + Azure Functions | Transactional email, booking confirmations, alerts |
| **Background jobs** | Azure Functions (Consumption) | Email dispatch, payout triggers, search index refresh |
| **Monitoring** | Application Insights + Log Analytics | Distributed tracing, error tracking, funnel analytics |
| **CI/CD** | GitHub Actions | Build, test, deploy on push (already in place) |

---

## Azure Cost Estimates

All prices are **East US, pay-as-you-go** (no reserved instances). Verified against the Azure Retail Prices API (2025).

### Tier Comparison

| | 🥉 MVP / Pilot | 🥈 Growth | 🥇 Scale |
|---|---|---|---|
| **Users** | 100 – 500 | 5K – 10K | 50K+ |
| **Providers** | ~50 | ~500 | 2,000+ |
| **Monthly cost** | **$37 – $55** | **$430 – $550** | **$1,300 – $1,700** |
| **Annual (midpoint)** | ~$550 | ~$5,760 | ~$18,000 |

### 🥉 Tier 1 — MVP / Pilot (~$37 – $55/mo)

| Service | SKU | Monthly |
|---------|-----|---------|
| Static Web Apps | Standard | $9 |
| App Service | B1 Linux | $12 |
| Azure SQL | S0 (10 DTU) | $15 |
| Blob Storage | Hot LRS 50 GB | $1 |
| Azure Functions | Consumption | $0 (free tier) |
| Azure AD B2C | Free (< 50K MAU) | $0 |
| App Insights | Free (< 5 GB/day) | $0 |

**Top cost drivers:** SQL fixed DTU ($15), App Service always-on ($12), Static Web Apps ($9).

**💡 Optimization:** Use Functions-only (drop App Service → saves $12), SQL Serverless (auto-pause → ~$5 vs. $15), Static Web Apps free tier (saves $9). Could run MVP for **~$10/mo**.

### 🥈 Tier 2 — Growth (~$430 – $550/mo)

| Service | SKU | Monthly |
|---------|-----|---------|
| App Service | S1 Linux × 2 (HA) | $139 |
| Redis Cache | Standard C1 | $101 |
| Azure AI Search | Basic | $74 |
| Azure SQL | S2 (50 DTU) | $73 |
| ACS Chat | ~100K msgs | $15 – $30 |
| App Insights | 10 GB/mo | $12 |
| Static Web Apps | Standard | $9 |
| Blob Storage | Hot LRS 250 GB | $5 |

**Top cost drivers:** App Service × 2 ($139), Redis ($101), AI Search ($74), SQL ($73).

> **Note:** Stripe fees (2.9% + $0.30/txn) are external. At $10K GMV/mo → ~$290/mo additional.

### 🥇 Tier 3 — Scale (~$1,300 – $1,700/mo)

| Service | SKU | Monthly |
|---------|-----|---------|
| Azure AI Search | Standard S1 × 2 SU | $490 |
| App Service | P1v3 Linux × 3 (HA) | $339 |
| Azure SQL | S3 (100 DTU) | $145 |
| App Insights | 50 GB/mo | $104 |
| Redis Cache | Standard C1 | $101 |
| ACS / SignalR | ~500K msgs | $75 – $150 |
| Front Door | Standard + egress | $38 – $75 |
| Azure AD B2C | 60K MAU | $33 |
| Monitor / Logs | 20 GB/mo | $35 |
| Blob Storage | Hot LRS 1 TB | $18 |

**Top cost drivers:** AI Search ($490), App Service × 3 ($339), SQL ($145), App Insights ($104).

**💡 Key optimizations across all tiers:**
- **Reserved instances** (1-year) cut compute costs 25 – 40%
- **Azure SignalR** replaces ACS Chat at scale — 5M msgs/mo drops from ~$7,500 to ~$57
- **App Insights adaptive sampling** reduces telemetry ingestion 70 – 90%
- **Microsoft Founders Hub** credits can cover 6 – 12 months of Tier 1 entirely

> **Cost philosophy:** We never pay for a tier before we've outgrown the previous one. The site launches for $0 on GitHub Pages and only moves to Tier 1 when we have real users who need accounts. Each tier transition is triggered by a measurable growth signal (user count, message volume, search complexity), not a calendar date.

### Free-Tier Services (Always Available)

| Service | Free Allowance |
|---------|---------------|
| Azure AD B2C | First 50,000 MAU |
| Azure Functions | 1M executions + 400K GB-s/month |
| Application Insights | 5 GB/day data ingestion |
| Azure AI Search | Free tier (3 indexes, 50 MB) |
| Static Web Apps | Free tier (1 app, no custom domain) |

---

## Glossary

| Term | Plain English |
|------|-------------|
| **SPA** | Single-Page Application — the whole site loads once, then navigates without full page refreshes |
| **MVP** | Minimum Viable Product — the smallest version that can test whether the idea works |
| **CDN** | Content Delivery Network — copies of the site stored on servers worldwide so it loads fast everywhere |
| **API** | Application Programming Interface — how the frontend talks to the backend (like a waiter taking orders between the kitchen and the table) |
| **SSR** | Server-Side Rendering — the server builds the HTML before sending it, which helps Google find and rank the site |
| **PWA** | Progressive Web App — a website that can be "installed" on a phone and work somewhat offline |
| **RBAC** | Role-Based Access Control — different users see different things (families vs. providers vs. admins) |
| **DTU** | Database Transaction Units — Azure's way of measuring how much database power you're paying for |
| **WAF** | Web Application Firewall — a security layer that blocks malicious traffic before it reaches the app |
| **GMV** | Gross Merchandise Value — total dollar value of all transactions processed through the marketplace |

---

## Contributing

1. Fork the repo and create a feature branch
2. Run `npm install` to set up dependencies
3. Make your changes
4. Validate: `npm run typecheck && npm test && npm run build`
5. Open a pull request against `main`

Commits follow the convention: `type(scope): summary` (e.g., `feat(matchmaker): add distance scoring`).
