#!/bin/bash
cd /e/orbierobot-website

# Get the token from the temporary file
echo "protocol=https
host=github.com" | git credential fill 2>/dev/null > /tmp/gh_cred.txt
TOKEN=*** -f password /tmp/gh_cred.txt 2>/dev/null)

echo "Token: ${TOKEN:0:6}...${TOKEN: -4}"

# Create repo
echo "--- Creating repo ---"
RESULT=*** -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -X POST "https://api.github.com/user/repos" -d '{"name":"orbierobot-website","description":"OrbieRobot - Open Source Pet Robot Platform","private":false,"has_pages":true}')
echo "$RESULT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('full_name','ERROR: '+d.get('message','')))"

# Push
echo "--- Pushing ---"
git remote remove origin 2>/dev/null
git remote add origin "https://${TOKEN}@github.com/DhirajSharma89/orbierobot-website.git"
git push -u origin main 2>&1 | tail -15

# Enable Pages
echo "--- Enabling Pages ---"
PAGES=*** -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" -X POST "https://api.github.com/repos/DhirajSharma89/orbierobot-website/pages" -d '{"source":{"branch":"main","path":"/"}}')
echo "$PAGES" | python3 -c "import sys,json; d=json.load(sys.stdin); print('Status:', d.get('status',''), 'URL:', d.get('html_url',''))"

echo ""
echo "Site: https://dhirajsharma89.github.io/orbierobot-website/"
rm -f /tmp/gh_cred.txt