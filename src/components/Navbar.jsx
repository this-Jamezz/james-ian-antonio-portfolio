import { useState, useEffect, useRef } from 'react';
import pfp from '../assets/pfp.jpg';
import { scrollToSectionId } from '../lib/smooth-scroll';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'tech', label: 'Tech' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'projects', label: 'Projects' },
  { id: 'contacts', label: 'Contact' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0.1 }
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && 
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  const scrollToSection = (id) => {
    scrollToSectionId(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className="fixed top-6 inset-x-2 mx-auto z-50 glass-nav rounded-2xl px-4 py-3 w-auto max-w-5xl shadow-xl flex items-center justify-between"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Left: Logo + Name */}
        <div className="flex items-center gap-3">
          <img
            src={pfp}
            alt="James Ian Antonio"
            className="w-10 h-10 rounded-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
            aria-label="Back to top"
            className="rounded-md font-semibold text-base text-primary transition-colors duration-200 hover:text-primary/70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            James Ian Antonio
          </a>
        </div>

        {/* Center: Nav Links (Desktop - lg+) */}
        <div className="hidden lg:flex items-center gap-5 md:gap-7">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link text-sm ${activeSection === item.id ? 'active text-accent' : 'text-primary hover:text-accent'}`}
              data-nav={item.id}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.id);
              }}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Right: CV Download + Mobile Menu Button */}
        <div className="flex items-center gap-2 relative">
          <a
            href="#"
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-bold cursor-pointer transition-all duration-200 hover:opacity-90 hover:scale-[1.02] hover:shadow-lg active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            download
            aria-label="Download CV"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Download CV</span>
          </a>

          {/* Mobile Menu Button (hidden on lg+) */}
          <button
            ref={buttonRef}
            className="lg:hidden p-2 rounded-xl bg-white/50 backdrop-blur-sm border border-border cursor-pointer transition-all duration-200 hover:bg-white/70 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Mobile Dropdown Menu */}
          {mobileMenuOpen && (
            <div
              ref={menuRef}
              id="mobile-menu"
              className="absolute right-0 top-full mt-2 w-56 lg:hidden rounded-2xl shadow-xl border border-border bg-white py-2 animate-dropdown z-50"
              role="menu"
              aria-label="Navigation menu"
            >
              <nav className="px-2 py-1 space-y-1 flex flex-col">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`flex items-center px-3 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-all duration-200 ${activeSection === item.id ? 'bg-primary/10 text-accent' : 'text-primary hover:bg-black/5'}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.id);
                    }}
                    role="menuitem"
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <svg className="ml-auto w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </a>
                ))}
              </nav>
              {/* Download CV in Mobile Dropdown */}
              <div className="px-2 pt-2 border-t border-border">
                <a
                  href="#"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-primary cursor-pointer transition-all duration-200 hover:opacity-90 hover:scale-[1.02] hover:shadow-lg active:scale-95"
                  download
                  aria-label="Download CV"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Download CV</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
