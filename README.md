# Luddite HM

Luddite for Horace Mann, served by GitHub Pages at
https://jakegoldwasser-hm.github.io/luddite-hm/

It is a copy of Luddite from Jake's site (jake-goldwasser.com/luddite, repository
jakegoldwasser/jake-goldwasser-2026). The page is `index.html`, one file. It talks
to the same server as Luddite (the `luddite-api` Lambda and the `LudditeData` table
on Jake's AWS), so sessions, classes and papers are shared between the two.

`luddite-backend/` is a copy of that server's code, kept for reference. Deploy
server changes from the main repository, not from here.

For sign-in to work from this address, two settings must list
`https://jakegoldwasser-hm.github.io` as an allowed origin:

1. AWS Lambda `luddite-api` -> Configuration -> Function URL -> CORS -> Allow origin.
2. Google Cloud project "Luddite" -> APIs & Services -> Credentials -> the web
   client -> Authorized JavaScript origins.
