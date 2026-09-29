# assistantready.com — v1 website design

Date: 2026-09-29 · Status: approved in chat

## Goal
A basic, trustworthy one-page site Jeff can point his network to while taking founding clients. Success = a visitor understands the offer in 10 seconds and can send an inquiry.

## Stack and hosting
- Static files only: `index.html`, `styles.css`, `form.js`, `images/`, `favicon.svg`. No framework, no build step.
- GitHub repo `jeffbloch7/assistant-ready`, served by GitHub Pages with custom domain `assistantready.com` (`CNAME` file, `.nojekyll`). DNS at Porkbun: four apex A records to GitHub Pages IPs + `www` CNAME to `jeffbloch7.github.io`. HTTPS enforced.
- Contact form posts to Web3Forms (free tier). Access key is created by Jeff and pasted into `index.html`. Until then, the form shows an email fallback instead of failing silently. Honeypot field for spam.

## Page sections
1. Header: wordmark, anchor nav (How it works, Pricing, About, Get started).
2. Hero: "Your own AI assistant, set up safely in one session." Founding banner: $99 (normally $199), limited spots. Primary CTA to the contact form.
3. Who it's for: Personal, Small business, HR (three cards).
4. How it works: get in touch, 20-minute prep checklist, 75-minute session on real tasks, recap + 14 days of follow-up.
5. Pricing: Starter $199 (founding $99), Set up like me $449, Ask Jeff $29/month, Team from $1,000. Note: Claude plan paid separately (from $20/month).
6. Safe by design: client drives, no passwords, HR data rules, scam warning.
7. About Jeff: photo (`images/jeff.jpg`) + bio.
8. FAQ: technical? what is Claude? what to buy? Mac or Windows? refund (full refund if not up and running by session end)? affiliated with Anthropic? (no).
9. Contact form: name, email, segment (Personal / Small business / HR / Team), message.
10. Footer: email, © 2026, "Not affiliated with Anthropic. Claude is a trademark of Anthropic, PBC."

## Design
- Readability first for retirees: Atkinson Hyperlegible, 19px base, high contrast (WCAG AA), large tap targets (min 48px).
- Palette: deep teal primary, warm amber accent, cream background.
- Responsive to 360px wide, no horizontal scroll. Semantic HTML, labeled form fields, visible focus states, `prefers-reduced-motion` respected.
- Open Graph title/description so texted links preview nicely.

## Out of scope (v1)
Online booking and payments (Cal.com + Stripe come later), blog, testimonials (added after founding sessions), analytics.

## Verification
Local server; check in Chrome at desktop and 375px widths; form fallback and success states; HTML validity sanity check; after deploy, confirm HTTPS on assistantready.com.
