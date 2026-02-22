import styles from './developer.module.scss';
import Link from 'next/link';

type Project = {
  title: string;
  slug: string;
  image: string; // served from /public
  description: string; // one-line
  tags: string[];
  liveUrl?: string;
  caseStudyUrl?: string;
};

const projects: Project[] = [
  {
    title: 'Danis Barber Shop',
    slug: 'barber',
    image: '/web/W1.png', // <-- public/web/W1.png
    description: 'A modern barbershop site with bold type, clean layout, and smooth interactions.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: 'https://maryanncanghe.github.io/Danis_Barber_Smoke/index.html',
  },
  {
    title: 'MacroLab',
    slug: 'macrolab',
    image: '/web/W3.png',
    description: 'A clinical, responsive lab website focused on clarity and streamlined navigation.',
    tags: ['Next.js', 'JavaScript', 'Tailwind', 'Design System'],
    liveUrl: 'https://maryanncanghe.github.io/MacroLab/#/',
  },
  {
    title: 'KEYLINE',
    slug: 'keyline-agence',
    image: '/web/W4.png',
    description: 'A Job agency concept with bold colors, sophisticated banners, and sharp UI.',
    tags: ['Branding', 'UI Design', 'CSS', 'Motion'],
    liveUrl: 'https://maryanncanghe.github.io/keylineupdate/index.html',
  },
  {
    title: "L'Art Palate",
    slug: 'lart-palate',
    image: '/web/W5.png',
    description: 'A premium restaurant concept with elegant typography and warm, editorial visuals.',
    tags: ['Design', 'Accessibility', 'Image Pipeline', 'React'],
    liveUrl: 'https://l-art.vercel.app/#',
  },
  {
    title: 'IICAROS',
    slug: 'iicaros',
    image: '/web/W6.png',
    description: 'A finance landing experience built for trust, clarity, and confident hierarchy.',
    tags: ['Art Direction', 'Grid Systems', 'SCSS'],
    liveUrl: 'https://maryanncanghe.github.io/ICAROS/#portfolio',
  },
  {
    title: 'MC Jefyhno',
    slug: 'mc-jefynho',
    image: '/web/W2.png',
    description: 'A vibrant Linktree-style microsite with bold, expressive mobile design.',
    tags: ['Branding', 'Illustration', 'UI', 'Motion'],
    liveUrl: 'https://mcjeferson.vercel.app/',
  },
];

export default function Page() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Developer — Web Design Showcase</h1>
        <p className={styles.subtitle}>
          Exploring systems, clarity, and personality across product and brand websites.
        </p>

        <p className={styles.credit}>
          Everything—layout, colors, branding, logo, banners, and concept—was created by me.
        </p>
      </header>

      <section className={styles.grid}>
        {projects.map((p) => (
          <article key={p.slug} className={styles.card}>
            <div className={styles.imageWrap}>
              {/* served from /public/web */}
              <img
                src={p.image}
                alt={`${p.title} preview`}
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.cardDesc}>{p.description}</p>

              <ul className={styles.tagList} aria-label="Technologies and focus">
                {p.tags.map((t) => (
                  <li key={t} className={styles.tag}>
                    {t}
                  </li>
                ))}
              </ul>

              <div className={styles.actions}>
                {p.liveUrl && (
                  <Link
                    href={p.liveUrl}
                    className={styles.button}
                    prefetch={false}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live
                  </Link>
                )}
                {p.caseStudyUrl && (
                  <Link
                    href={p.caseStudyUrl}
                    className={styles.buttonSecondary}
                    prefetch={false}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Case Study
                  </Link>
                )}
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}