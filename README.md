# The Development Lab

A youth athlete development marketplace that connects families with trusted providers for sport-specific training, speed & strength coaching, academic tutoring, and mental performance support.

🌐 **Live site:** [davevoyles.github.io/The-Development-Lab](https://davevoyles.github.io/The-Development-Lab/)

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

### Free-Tier Services (Always Available)

| Service | Free Allowance |
|---------|---------------|
| Azure AD B2C | First 50,000 MAU |
| Azure Functions | 1M executions + 400K GB-s/month |
| Application Insights | 5 GB/day data ingestion |
| Azure AI Search | Free tier (3 indexes, 50 MB) |
| Static Web Apps | Free tier (1 app, no custom domain) |
