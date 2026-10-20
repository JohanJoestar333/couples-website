#!/usr/bin/env bash
# Builds the publishable site into _site/. Used by both deploy options:
#   - Vercel (vercel.json runs this as the build command)
#   - GitHub Pages (.github/workflows/deploy.yml runs it too)
#
# It does three things:
#   1. copies only the site files — docs, tools and the news backend stay out;
#   2. fills the __PLACEHOLDER__ keys in config.js / app.js from environment
#      variables (Vercel: Project → Settings → Environment Variables;
#      GitHub: repository secrets). Every key is optional — a missing one
#      just leaves that feature off and the site runs in local-only mode;
#   3. gives the service-worker cache a new name on every deploy, so
#      installed copies of the app always pick up the latest files.
set -euo pipefail

cd "$(dirname "$0")/.."

rm -rf _site
mkdir _site
cp -r index.html manifest.json service-worker.js css js assets _site/

OPTIONAL="FIREBASE_API_KEY FIREBASE_AUTH_DOMAIN FIREBASE_PROJECT_ID
          FIREBASE_STORAGE_BUCKET FIREBASE_MESSAGING_SENDER_ID FIREBASE_APP_ID
          CLOUDINARY_CLOUD_NAME CLOUDINARY_UPLOAD_PRESET TMDB_ACCESS_TOKEN
          METERED_TURN_DOMAIN METERED_TURN_API_KEY"

for name in $OPTIONAL; do
  value="${!name:-}"
  if [ -z "$value" ]; then
    echo "note: $name is not set; that feature stays off."
    continue
  fi
  # The placeholders sit inside JS "double-quoted" strings, so escape
  # backslashes and double quotes first, then what sed needs.
  value=$(printf '%s' "$value" | sed -e 's/\\/\\\\/g' -e 's/"/\\"/g')
  escaped=$(printf '%s' "$value" | sed -e 's/[\\|&]/\\&/g')
  sed -i.bak "s|__${name}__|${escaped}|g" _site/js/data/config.js _site/js/app.js
done
rm -f _site/js/data/config.js.bak _site/js/app.js.bak

# Commit id from whichever host is building; a timestamp as a fallback.
SHA="${VERCEL_GIT_COMMIT_SHA:-${GITHUB_SHA:-$(date +%s)}}"
VERSION="${SHA:0:7}"
sed -i.bak "s|^const CACHE_VERSION = \".*\";|const CACHE_VERSION = \"${VERSION}\";|" _site/service-worker.js
rm -f _site/service-worker.js.bak
grep -q "CACHE_VERSION = \"${VERSION}\"" _site/service-worker.js \
  || { echo "ERROR: CACHE_VERSION was not updated"; exit 1; }

echo "Built _site/ (cache version ${VERSION})."
