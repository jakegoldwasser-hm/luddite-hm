# Luddite HM

Luddite for Horace Mann, served by GitHub Pages at
https://jakegoldwasser-hm.github.io/luddite-hm/

It is a copy of Luddite from Jake's site (jake-goldwasser.com/luddite, repository
jakegoldwasser/jake-goldwasser-2026), in beta, for @horacemann.org accounts only.

**Don't edit `index.html` here.** Every morning the "Sync from Luddite" action
(`.github/workflows/sync.yml`) fetches Luddite's newest page and rebuilds `index.html`
from it with `hm.sh`, which holds every Luddite HM difference (the name and BETA,
the icon, its own Terms and Privacy links, and the Horace Mann-only sign-in). Change
Luddite in the main repository, or change `hm.sh` here. If a Luddite change stops
`hm.sh` from fitting, the action fails and the live site stays as it was. To sync at
once: Actions -> Sync from Luddite -> Run workflow.

`privacy.html` and `terms.html` are Luddite HM's own and are not synced.

The page is `index.html`, one file. It talks
to the same server as Luddite (the `luddite-api` Lambda and the `LudditeData` table
on Jake's AWS), so sessions, classes and papers are shared between the two.

`luddite-backend/` is a copy of that server's code, kept for reference. Deploy
server changes from the main repository, not from here.

For sign-in to work from this address, two settings must list
`https://jakegoldwasser-hm.github.io` as an allowed origin:

1. AWS Lambda `luddite-api` -> Configuration -> Function URL -> CORS -> Allow origin.
2. Google Cloud project "Luddite" -> APIs & Services -> Credentials -> the web
   client -> Authorized JavaScript origins.
