'use client';
import { PERSONAL } from '@/lib/constants';
import { getLenis } from '@/lib/lenis';

const LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Credentials', href: '#credentials' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(target as HTMLElement, { offset: -72 });
    } else {
      (target as HTMLElement).scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-hairline bg-paper/80 backdrop-blur-md">
      <div className="shell flex items-center justify-between h-16">
        <a
          href="#top"
          onClick={(e) => scrollTo(e, '#top')}
          className="font-display font-bold text-[1.05rem] tracking-tight"
        >
          Adarsh Balanolla
          <span className="text-volt">.</span>
        </a>

        <nav className="flex items-center gap-7">
          <div className="hidden md:flex items-center gap-7">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className="text-sm font-medium text-muted hover:text-volt transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${PERSONAL.resumePath}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary !py-2 !px-4 !text-[0.82rem]"
          >
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
}
