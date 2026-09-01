#!/bin/bash
cd /e/orbierobot-website

# Get token
echo "protocol=https
host=github.com" | git credential fill 2>/dev/null > /tmp/gh_cred.txt
TOKEN=$(grep password /tmp/gh_cred.txt | cut -d= -f2)

echo "Token: ${TOKEN:0:6}...${TOKEN: -4}"

# Test token
echo "=== Testing token ==="
curl -s -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" \
  "https://api.github.com/user" | grep -E '"login"|"name"'

# Create repo
echo "=== Creating repo ==="
curl -s -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" \
  "https://api.github.com/orgs/orbierobot/repos" \
  -d '{"name":"orbierobot-website","description":"OrbieRobot - Open Source Pet Robot Platform","private":false,"has_pages":true}'

echo ""

# Push
echo "=== Pushing ==="
git remote remove origin 2>/dev/null
git remote add origin "https://${TOKEN}@github.com/orbierobot/orbierobot-website.git"
git push -u origin main 2>&1 | tail -15

echo "=== Enabling Pages ==="
curl -s -X POST -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" \
  "https://api.github.com/repos/orbierobot/orbierobot-website/pages" \
  -d '{"source":{"branch":"main","path":"/"}}' 2>&1

echo "=== URL ==="
echo "https://orbierobot.github.io/orbierobot-website/"
rm -f /tmp/gh_cred.txt