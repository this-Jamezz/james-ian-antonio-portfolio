import { useState, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';
import ResumeButton from './ResumeButton';
import LucideIcon from './LucideIcon';
import { scrollToSectionId } from '../lib/smooth-scroll';

import UserIcon from 'lucide/dist/esm/icons/user.mjs';
import HomeIcon from 'lucide/dist/esm/icons/house.mjs';
import BriefcaseIcon from 'lucide/dist/esm/icons/briefcase.mjs';
import CpuIcon from 'lucide/dist/esm/icons/cpu.mjs';
import AwardIcon from 'lucide/dist/esm/icons/award.mjs';
import FolderKanbanIcon from 'lucide/dist/esm/icons/folder-kanban.mjs';
import MailIcon from 'lucide/dist/esm/icons/mail.mjs';
import CheckIcon from 'lucide/dist/esm/icons/check.mjs';
import SunIcon from 'lucide/dist/esm/icons/sun.mjs';
import MoonIcon from 'lucide/dist/esm/icons/moon.mjs';
import PanelLeftIcon from 'lucide/dist/esm/icons/panel-left.mjs';

const navItems = [
  { id: 'home', label: 'Home', hint: 'Overview', icon: HomeIcon },
  { id: 'about', label: 'About', hint: 'About me', icon: UserIcon },
  { id: 'experience', label: 'Experience', hint: 'Work history', icon: BriefcaseIcon },
  { id: 'tech', label: 'Tech', hint: 'Stack & tools', icon: CpuIcon },
  { id: 'certificates', label: 'Certificates', hint: 'Credentials', icon: AwardIcon },
  { id: 'projects', label: 'Projects', hint: 'Selected work', icon: FolderKanbanIcon },
  { id: 'contacts', label: 'Contact', hint: 'Get in touch', icon: MailIcon },
];

export default function Sidebar({ railOpen, setRailOpen }) {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    // matches the .dark default set by the bootstrap script in index.html;
    // guarded so non-DOM renders (tests/SSR) don't crash
    if (typeof document === 'undefined') return 'dark';
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  });
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
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        !event.target.closest('[role="dialog"]')
      ) {
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
    const applyTheme = () => {
      flushSync(() => setTheme(next));
      document.documentElement.classList.toggle('dark', next === 'dark');
    };
    if (document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.startViewTransition(applyTheme);
    } else {
      applyTheme();
    }
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
      {/* Desktop side rail */}
      <aside
        className={`fixed left-4 top-4 z-50 hidden flex-col items-center gap-3 rounded-2xl border border-border bg-surface/75 py-3 shadow-xl backdrop-blur-xl md:flex ${railOpen ? 'bottom-4 w-64' : 'w-16'}`}
        role="navigation"
        aria-label="Main navigation"
      >
        {!railOpen && (
          <button type="button" onClick={() => setRailOpen(true)} aria-label="Open navigation" aria-expanded={false} aria-controls="desktop-navigation" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-primary hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            <LucideIcon icon={PanelLeftIcon} size={20} />
          </button>
        )}
        {railOpen && <div id="desktop-navigation" className="flex min-h-0 w-full flex-1 flex-col gap-3 px-3">
        <div className="flex items-center gap-1">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
            aria-label="Back to top"
            className="flex min-w-0 flex-1 items-center gap-3 rounded-xl px-2 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <span className="text-left"><span className="block text-sm font-semibold text-primary">James Ian Antonio</span><span className="block text-xs text-mute">Full-Stack Developer</span></span>
          </a>
          <button type="button" onClick={() => setRailOpen(false)} aria-label="Collapse navigation" aria-expanded={true} aria-controls="desktop-navigation" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-primary hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            <LucideIcon icon={PanelLeftIcon} size={20} />
          </button>
        </div>

        <nav className="mt-2 flex flex-1 flex-col gap-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-label={item.label}
                aria-current={active ? 'page' : undefined}
                className={`group relative flex min-h-12 w-full items-center gap-3 rounded-xl px-3 text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  active
                    ? 'bg-primary/10 text-primary'
                    : 'text-mute hover:bg-primary/5 hover:text-primary'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
              >
                <LucideIcon icon={item.icon} size={20} />
                <span><span className="block text-sm font-semibold">{item.label}</span><span className="block text-xs text-mute">{item.hint}</span></span>
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute -left-2 top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-primary"
                  />
                )}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 px-3">
            <a href="https://www.linkedin.com/in/james-ian-antonio-73b844367/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" title="LinkedIn" className="flex h-10 w-10 items-center justify-center rounded-xl text-mute transition-colors hover:bg-primary/5 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              <span aria-hidden="true" className="brand-icon icon-linkedin h-5 w-5" />
            </a>
            <a href="mailto:j.iansanchezantonio@gmail.com" aria-label="Email James" title="Email" className="flex h-10 w-10 items-center justify-center rounded-xl text-mute transition-colors hover:bg-primary/5 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              <LucideIcon icon={MailIcon} size={20} />
            </a>
        </div>
        <div className="flex flex-col gap-3 border-t border-border pt-3">
          <button
            type="button"
            role="switch"
            aria-checked={theme === 'dark'}
            aria-label="Dark mode"
            onClick={toggleTheme}
            className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <span className="flex items-center gap-3"><LucideIcon icon={theme === 'dark' ? MoonIcon : SunIcon} size={20} />{theme === 'dark' ? 'Dark mode' : 'Light mode'}</span>
            <span aria-hidden="true" className={`flex h-6 w-11 items-center rounded-full p-1 transition-colors duration-200 ${theme === 'dark' ? 'bg-primary' : 'bg-primary/25'}`}>
              <span className={`h-4 w-4 rounded-full bg-bg transition-transform duration-200 ${theme === 'dark' ? 'translate-x-5' : ''}`} />
            </span>
          </button>
          <ResumeButton className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-bg transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" />
        </div>
        </div>}
      </aside>

      {/* Mobile top bar */}
      <header
        className="fixed top-4 left-4 right-4 z-50 flex h-16 items-center justify-between rounded-2xl border border-border bg-surface/75 px-4 backdrop-blur-xl md:hidden"
        role="navigation"
        aria-label="Main navigation"
      >
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface/50 text-primary transition-all duration-200 hover:bg-surface/80 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <LucideIcon icon={PanelLeftIcon} size={20} />
        </button>

        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('home');
          }}
          className="font-semibold text-primary"
          aria-label="Back to top"
        >
          James Ian Antonio
        </a>

        <span className="w-10" aria-hidden="true" />
      </header>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div
          ref={menuRef}
          id="mobile-menu"
          className="fixed left-4 right-4 top-24 z-50 max-h-[calc(100dvh-7rem)] overflow-y-auto rounded-2xl border border-border bg-surface py-2 shadow-xl animate-dropdown md:hidden"
          role="menu"
          aria-label="Navigation menu"
        >
          <nav className="px-2 py-1 space-y-1 flex flex-col">
            {navItems.map((item) => {
              const active = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-all duration-200 ${
                    active ? 'bg-primary/10 text-primary' : 'text-mute hover:bg-primary/5 hover:text-primary'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  role="menuitem"
                >
                  <LucideIcon icon={item.icon} size={18} />
                  <span>{item.label}</span>
                  {active && (
                    <LucideIcon icon={CheckIcon} size={14} className="ml-auto text-primary" />
                  )}
                </a>
              );
            })}
          </nav>
          <div className="px-2 pt-2 border-t border-border">
            <button
              type="button"
              role="switch"
              aria-checked={theme === 'dark'}
              aria-label="Dark mode"
              onClick={toggleTheme}
              className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-primary hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <span className="flex items-center gap-3"><LucideIcon icon={theme === 'dark' ? MoonIcon : SunIcon} size={18} />{theme === 'dark' ? 'Dark mode' : 'Light mode'}</span>
              <span aria-hidden="true" className={`flex h-6 w-11 items-center rounded-full p-1 transition-colors duration-200 ${theme === 'dark' ? 'bg-primary' : 'bg-primary/25'}`}>
                <span className={`h-4 w-4 rounded-full bg-bg transition-transform duration-200 ${theme === 'dark' ? 'translate-x-5' : ''}`} />
              </span>
            </button>
            <ResumeButton
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-bg bg-primary cursor-pointer transition-all duration-200 hover:opacity-90 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            />
          </div>
        </div>
      )}
    </>
  );
}
