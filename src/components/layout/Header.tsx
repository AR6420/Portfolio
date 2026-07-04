'use client';
import { PERSONAL } from '@/lib/constants';
import { getLenis } from '@/lib/lenis';

const LINKS = [
  { label: 'Work', href: '#fab' },
  { label: 'Credentials', href: '#qual' },
  { label: 'About', href: '#traveler' },
  { label: 'Contact', href: '#tapeout' },
];

export default function Header() {
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(target as HTMLElement, { offset: -64 });
    } else {
      (target as HTMLElement).scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-line/60 bg-substrate/75 backdrop-blur-md">
      <div className="shell flex items-center justify-between h-14">
        <a
          href="#top"
          onClick={(e) => scrollTo(e, '#top')}
          className="font-mono text-xs font-semibold tracking-wider2 uppercase text-ink"
        >
          <span className="text-copper">▣</span> Adarsh Balanolla
        </a>

        <nav className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className="font-mono text-[0.7rem] tracking-wider2 uppercase text-muted hover:text-copper transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${PERSONAL.resumePath}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-fab btn-fab--primary !py-2 !px-4"
          >
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
}
