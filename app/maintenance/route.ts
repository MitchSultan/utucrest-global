import { siteConfig } from "@/content/site";

export function GET() {
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex, nofollow">
    <title>We’ll be back soon | Utu Crest</title>
    <style>
      :root { color-scheme: light; font-family: Arial, Helvetica, sans-serif; color: #152d2a; background: #f8f6f1; }
      * { box-sizing: border-box; }
      body { min-height: 100vh; margin: 0; display: flex; flex-direction: column; }
      header, footer { padding: 1.25rem max(1.25rem, calc((100% - 72rem) / 2)); }
      header { background: #fff; border-bottom: 1px solid #d9e1dd; }
      .logo { display: inline-flex; padding: .5rem .75rem; border-radius: .4rem; background: #15544b; }
      .logo img { display: block; width: 7rem; height: auto; }
      main { flex: 1; display: grid; place-items: center; padding: 3rem 1.25rem; }
      .card { width: min(100%, 42rem); padding: clamp(2rem, 7vw, 4rem); border: 1px solid #d9e1dd; border-radius: 1.25rem; background: #fff; text-align: center; box-shadow: 0 20px 56px rgb(21 45 42 / .12); }
      .mark { width: 3.5rem; height: 3.5rem; margin: 0 auto 1.5rem; display: grid; place-items: center; border-radius: 50%; background: #eaf0ed; color: #15544b; font-size: 1.5rem; }
      .eyebrow { color: #15544b; font-size: .75rem; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; }
      h1 { margin: 1rem 0; font-family: Georgia, serif; font-size: clamp(2.5rem, 7vw, 3.5rem); line-height: 1.08; letter-spacing: -.03em; }
      p { color: #354541; font-size: 1.05rem; line-height: 1.7; }
      .contact { display: inline-block; margin-top: 1rem; padding: .8rem 1.25rem; border-radius: .5rem; background: #15544b; color: #fff; font-weight: 700; text-decoration: none; }
      .contact:hover { background: #103f39; }
      footer { border-top: 1px solid #d9e1dd; color: #596862; font-size: .8rem; }
      @media (max-width: 480px) { header, footer { padding-inline: 1rem; } }
    </style>
  </head>
  <body>
    <header><a class="logo" href="/" aria-label="${siteConfig.shortName} home"><img src="/logo.png" alt="${siteConfig.shortName}"></a></header>
    <main>
      <section class="card" aria-labelledby="maintenance-title">
        <div class="mark" aria-hidden="true">↻</div>
        <p class="eyebrow">Brief pause</p>
        <h1 id="maintenance-title">We’ll be back soon.</h1>
        <p>We’re making a few improvements to the site. Please check back shortly.</p>
        <p>Need help now? Our team is still available by email.</p>
        <a class="contact" href="mailto:${siteConfig.contact.email}">Contact Utu Crest</a>
      </section>
    </main>
    <footer>© ${new Date().getFullYear()} ${siteConfig.name}</footer>
  </body>
</html>`;

  return new Response(html, {
    status: 503,
    headers: {
      "Cache-Control": "no-store, max-age=0",
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
