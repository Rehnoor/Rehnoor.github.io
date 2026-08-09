# Rehnoor Saini — Personal Website

Personal site built with Next.js (App Router) and Tailwind CSS — a software
+ photography showcase.

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

- `app/` — routes (Home, About, Projects, Photography, Contact, error pages)
- `components/` — UI components, grouped by feature
- `data/` — site content (`projects.js`, `photos.js`, `site.js`) — add a new
  project or photo by appending an entry to the relevant file
- `lib/` — `gradient.js` (hero WebGL background), `gsap.js`, `email.js`

## Environment variables

The contact form (`app/api/contact/route.js`) sends mail via
[Resend](https://resend.com):

```
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=   # optional, defaults to Resend's sandbox sender
```

## Credits

The hero gradient (`lib/gradient.js`) is adapted from Stripe's WebGl Gradient
Animation, via [kevinhufnagl.com](https://kevinhufnagl.com/).

## Legacy site

The pre-migration static site (`index.html`, `styles.css`, `scripts/`,
`icons/`, `images/`) is kept in the repo for reference during the migration
and can be removed once the Next.js version is live.
