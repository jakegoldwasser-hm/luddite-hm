#!/usr/bin/env bash
# Turns Luddite's page (luddite/index.html in jakegoldwasser/jake-goldwasser-2026)
# into Luddite HM's: the name with BETA, its own icon, Terms and Privacy pages,
# and sign-in only for @horacemann.org accounts.
# Usage: ./hm.sh luddite.html > index.html
# Stops with an error if Luddite has changed so that a step no longer fits,
# so the sync never publishes a page that isn't Luddite HM's.
set -euo pipefail
src="$1"
tmp="$(mktemp)"
cp "$src" "$tmp"

step() { # step <name> <perl substitution>
  before="$(shasum < "$tmp")"
  perl -0pi -e "$2" "$tmp"
  if [ "$before" = "$(shasum < "$tmp")" ]; then echo "hm.sh: step '$1' no longer fits Luddite's page" >&2; exit 1; fi
}

step title       's#<title>Luddite</title>#<title>Luddite HM</title>#'
step wordmark    's#class="wordmark">Luddite</h#class="wordmark">Luddite HM<span class="beta">BETA</span></h#g'
step beta-style  's#(\n  \.wordmark \{ font-family: Rokkitt[^\n]*)#$1\n  .wordmark .beta { font: 600 0.22em/1 var(--ui); letter-spacing: .08em; color: var(--muted); vertical-align: super; margin-left: .3em; }#'
step favicon     's#href="\.\./favicon\.svg#href="favicon.svg#g'
step highlight  's#src="/selection-highlight\.js#src="selection-highlight.js#'
step terms       's#href="\.\./terms\.html"#href="terms.html"#g'
# Google's account chooser offers Horace Mann accounts first...
step hd-hint     's#(use_fedcm_for_prompt: true, itp_support: true)#$1, hd: '\''horacemann.org'\''#'
# ...and anyone else is signed straight back out.
step hm-only     's#(\n(\s*)me = data\.luddite;\n)#$1$2if (!/\@horacemann\\.org\$/i.test(me.email || '\'''\'')) { signOut(); \$('\''signInNote'\'').textContent = '\''Luddite HM is only for Horace Mann accounts. Sign in with your \@horacemann.org address.'\''; return; }\n#'

cat "$tmp"
rm -f "$tmp"
