import { useState, useEffect, useRef } from 'react';
import pfp from '../assets/pfp.jpg';
import ResumeButton from './ResumeButton';
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
  // the inline bootstrap in index.html already set the saved mode on <html>
  // (default is dark — only an explicit light choice starts light)
  const [theme, setTheme] = useState(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  );
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

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    // keep the browser chrome tint in step with the toggle
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', next === 'dark' ? '#353535' : '#ffffff');
    try {
      localStorage.setItem('theme', next);
    } catch {
      // storage may be blocked — the class toggle above still holds for this visit
    }
  };

  return (
    <>
      <nav
        className="fixed top-0 inset-x-0 z-50 glass-nav shadow-xl"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* full-width bar, content aligned with the sections' max-w-5xl gutter */}
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6">
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
              className="rounded-md font-semibold text-base text-primary transition-colors duration-200 hover:text-primary/70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
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
                className={`nav-link text-sm ${activeSection === item.id ? 'active text-primary' : 'text-mute hover:text-primary'}`}
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

          {/* Right: Color Mode Switch + CV Download + Mobile Menu Button */}
          <div className="flex items-center gap-2 relative">
            {/* sun + moon switch — shows both sides so the toggle is discoverable */}
            <button
              type="button"
              role="switch"
              aria-checked={theme === 'dark'}
              aria-label={theme === 'dark' ? 'Dark mode — switch to light' : 'Light mode — switch to dark'}
              title="Toggle color mode"
              onClick={toggleTheme}
              className="relative flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full border border-border bg-surface/50 p-1 transition-colors duration-200 hover:bg-surface/80 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {/* sliding knob behind the active icon */}
              <span
                aria-hidden="true"
                className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-primary transition-transform duration-200 ${theme === 'dark' ? 'translate-x-6' : ''}`}
              />
              <span
                className={`relative z-10 flex h-6 w-6 items-center justify-center transition-colors duration-200 ${theme === 'light' ? 'text-bg' : 'text-mute'}`}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                </svg>
              </span>
              <span
                className={`relative z-10 flex h-6 w-6 items-center justify-center transition-colors duration-200 ${theme === 'dark' ? 'text-bg' : 'text-mute'}`}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                </svg>
              </span>
            </button>

            <ResumeButton
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-bg text-sm font-bold cursor-pointer transition-all duration-200 hover:opacity-90 hover:scale-[1.02] hover:shadow-lg active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            />

            {/* Mobile Menu Button (hidden on lg+) */}
            <button
              ref={buttonRef}
              className="lg:hidden p-2 rounded-xl bg-surface/50 backdrop-blur-sm border border-border cursor-pointer transition-all duration-200 hover:bg-surface/80 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
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
                className="absolute right-0 top-full mt-2 w-56 lg:hidden rounded-2xl shadow-xl border border-border bg-surface py-2 animate-dropdown z-50"
                role="menu"
                aria-label="Navigation menu"
              >
                <nav className="px-2 py-1 space-y-1 flex flex-col">
                  {navItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`flex items-center px-3 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-all duration-200 ${activeSection === item.id ? 'bg-primary/10 text-primary' : 'text-mute hover:bg-primary/5 hover:text-primary'}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.id);
                      }}
                      role="menuitem"
                    >
                      {item.label}
                      {activeSection === item.id && (
                        <svg className="ml-auto w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </a>
                  ))}
                </nav>
                {/* Download CV in Mobile Dropdown */}
                <div className="px-2 pt-2 border-t border-border">
                  <ResumeButton
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-bg bg-primary cursor-pointer transition-all duration-200 hover:opacity-90 hover:scale-[1.02] hover:shadow-lg active:scale-95"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
