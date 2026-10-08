# THIS REPOSITORY IS LUDDITE HM — NOT LUDDITE

> **You are editing Luddite HM**, the Horace Mann copy of Luddite.
> - Repository: `jakegoldwasser-hm/luddite-hm` (Jake's school GitHub account, `jakegoldwasser-hm`). Local checkout: `~/code/luddite-hm`.
> - Live site: https://jakegoldwasser-hm.github.io/luddite-hm/ (BETA, @horacemann.org accounts only).
>
> **Regular Luddite is a different product** in a different repository: `jakegoldwasser/jake-goldwasser-2026`
> (folder `luddite/`, live at jake-goldwasser.com/luddite). A change Jake asks for "in Luddite HM" goes
> **here** and must not change regular Luddite. A change asked for "in Luddite" goes **there**, and reaches
> Luddite HM the next morning through the daily sync.
>
> Before every change, say which product it is for. If Jake's request doesn't say, ask.

## What belongs to Luddite HM alone (edit these here)

- `hm.sh` — turns Luddite's page into Luddite HM's (name and BETA, icon, its own Terms and Privacy links,
  Horace Mann-only sign-in, and the administrators' script). **All HM differences in `index.html` go through `hm.sh`.**
- `admin.html` — the administrator view (read-only access to every Horace Mann writing session, draft, paper and mark-up).
- `hm-admin.js` — puts "Administrator" at the top of the page for administrators, linking to `admin.html`.
- `privacy.html`, `terms.html`, `favicon.svg`, `README.md`, this file, `.github/workflows/sync.yml`.

## What is NOT edited here

- `index.html` — rebuilt every morning from Luddite's `luddite/index.html` by the "Sync from Luddite" action.
  Hand edits are overwritten. Change `hm.sh` instead (or change Luddite in the main repository).
- `selection-highlight.js` and `luddite-backend/` — copied from the main repository by the same action, for reference.
  The server (`luddite-api` Lambda, `LudditeData` table, Jake's AWS account) is **shared by Luddite and Luddite HM**:
  edit `luddite-backend/index.mjs` in `jakegoldwasser/jake-goldwasser-2026`, and Jake deploys it by pasting it into the
  Lambda console. A server change for Luddite HM only must be fenced to Luddite HM, the way the administrator
  routes are (see below).

## Administrators (Luddite HM only)

- Primary administrator: `cassandra_parets@horacemann.org` (`HM_PRIMARY_ADMINS` in the server). She adds or removes
  other administrators (only @horacemann.org addresses) on `admin.html` → Administrators.
- **Jake must not be able to see Luddite HM's data.** `jake_goldwasser@horacemann.org` is in `HM_ADMIN_MANAGERS`: he can
  add and remove administrators, and nothing else (no work, no access log). The site-owner role (`OWNER_EMAILS`) also
  stops at Horace Mann teachers' work (`ownerMayOpen`). Never add a way for Jake to read HM students' or teachers' work.
  The data is still in Jake's own AWS account, so he could reach it through the AWS console; the real fix is moving
  Luddite HM to its own server in an AWS account Horace Mann owns.
- Administrators can **read** everything Horace Mann teachers and students have written; they can't change anything.
  Every look is logged (`admin.html` → Access log).
- Server side: `routeHmAdmin` (`/luddite/admin/*`) in `luddite-backend/index.mjs`. It answers only requests from
  `https://jakegoldwasser-hm.github.io` (the Origin header), only for administrators, and only about work whose teacher
  has an @horacemann.org address, so regular Luddite is unaffected. Listing needs `dynamodb:Scan` on the table.
- The Privacy Policy and Terms describe this access. Keep them true if it changes.

## Pushing

This Mac's saved GitHub sign-in is Jake's personal account (`jakegoldwasser`), which can't push here. Changes go up
through GitHub's web upload in Chrome, signed in as `jakegoldwasser-hm`, or with that account's own credentials.
A push runs the sync action, which rebuilds and publishes the site.

## Words

Use Luddite's words (see the main repository's CLAUDE.md): **writing session** (not room or assignment),
**Entry Phrase**, **class**, **paper** (not submission), **mark up**, **hand in**, **Home**.
