# DOMAIN_SETUP — Quick steps

1. Buy domain (Namecheap suggested).
2. Create Cloudflare account → add domain.
3. Change nameservers at registrar to Cloudflare.
4. In Vercel: Projects → Settings → Domains → add `shiroa.com`.
5. In Cloudflare DNS: add CNAME/A per Vercel instructions.
6. Enable SSL (Full) and set security settings (WAF rules basic).
7. Add subdomains: `studio.shiroa.com`, `ai.shiroa.com` per service.
