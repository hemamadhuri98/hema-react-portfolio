# Hema Madhuri Janapamula — React Portfolio

A recruiter-focused React + TypeScript portfolio with:

- Real GitHub profile integration for `hemamadhuri98`
- Live repository cards (stars, forks, language, topics/update metadata)
- Live public GitHub activity feed
- README screenshot extraction from public repositories
- Hema's actual uploaded resume at `/resume.pdf`
- Dark / light mode
- Responsive mobile navigation
- Interactive **Ask Hema** portfolio assistant grounded in the portfolio data + live GitHub repository count
- Framer Motion interactions

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Deploy

This is a Vite static app and can be deployed to Vercel, Netlify or GitHub Pages.

### Important GitHub note

GitHub API requests are made directly from the browser and use only public endpoints. The app does **not** contain a GitHub token. If GitHub rate-limits anonymous requests, the curated sections still render and the GitHub section shows a friendly message.

### Real project screenshots

The portfolio intentionally does not invent screenshots. It reads image links from the README files of the first public repositories and renders them when present. Add real screenshots to a repository README and they will automatically appear in the portfolio.

### Ask Hema

The assistant is a client-side, portfolio-grounded assistant so it works after static deployment without exposing an AI API key. If you later want a true LLM-backed assistant, connect the existing chat UI to a secure serverless API route and keep the provider key server-side.
