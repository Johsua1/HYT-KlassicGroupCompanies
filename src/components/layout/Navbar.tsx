import { useState, useEffect } from "react";
import { MenuIcon, CloseIcon } from "@/components/ui/Icons";
import { GOLD_GRAD, GOLD_DARK, GOLD, CHARCOAL, BORDER, SURFACE } from "@/constants/colors";
import logoImg from "@/assets/images/KGCLOGO.png";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Home",         href: "#home" },
    { label: "About Us",     href: "#about" },
    { label: "Our Companies",href: "#companies" },
    { label: "Careers",      href: "#careers" },
    { label: "News",         href: "#news" },
    { label: "Contact",      href: "#contact" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ background: "#fff", boxShadow: scrolled ? "0 1px 12px rgba(0,0,0,0.08)" : "none", borderBottom: scrolled ? `1px solid ${BORDER}` : "1px solid transparent" }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <a href="#home" className="flex-shrink-0" aria-label="Klassic Group of Companies — home">
            <img src={logoImg} alt="Klassic Group of Companies" className="h-9 sm:h-10 lg:h-12 w-auto object-contain" />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-2.5 xl:px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap"
                style={{ color: CHARCOAL, fontFamily: "var(--font-display)" }}
                onMouseEnter={e => (e.currentTarget.style.color = GOLD_DARK)}
                onMouseLeave={e => (e.currentTarget.style.color = CHARCOAL)}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <a
              href="#contact"
              className="px-4 xl:px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 hover:-translate-y-0.5 whitespace-nowrap"
              style={{ background: GOLD_GRAD, fontFamily: "var(--font-display)", boxShadow: `0 3px 14px ${GOLD}50` }}
            >
              Get in Touch
            </a>
          </div>

          <button
            className="lg:hidden -mr-1.5 p-2 rounded-md"
            style={{ color: CHARCOAL }}
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="lg:hidden max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain bg-white px-5 sm:px-6 py-4 flex flex-col gap-1 shadow-xl"
          style={{ borderTop: `1px solid ${BORDER}` }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="py-3 text-sm font-medium border-b"
              style={{ color: CHARCOAL, fontFamily: "var(--font-display)", borderColor: SURFACE }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="mt-3 px-4 py-3 rounded-lg text-sm font-semibold text-white text-center"
            style={{ background: GOLD_GRAD, fontFamily: "var(--font-display)" }}
            onClick={() => setOpen(false)}
          >
            Get in Touch
          </a>
        </div>
      )}
    </header>
  );
}
