import { useEffect, useLayoutEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Home from './sections/Home';
import About from './sections/About';
import Experience from './sections/Experience';
import Tech from './sections/Tech';
import Certificates from './sections/Certificates';
import Projects from './sections/Projects';
import Contacts from './sections/Contacts';
import { initSmoothScroll, destroySmoothScroll } from './lib/smooth-scroll';

const year = new Date().getFullYear();

function App() {
  const [railOpen, setRailOpen] = useState(true);
  useEffect(() => {
    initSmoothScroll();
    return () => destroySmoothScroll();
  }, []);

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;

    const sections = document.querySelectorAll('section:not(#home):not(#experience) > div:first-child, [data-scroll-reveal]');
    sections.forEach((section) => section.classList.add('scroll-pending'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove('scroll-pending');
        entry.target.classList.add('scroll-reveal');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0 });

    sections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      sections.forEach((section) => section.classList.remove('scroll-pending', 'scroll-reveal'));
    };
  }, []);
  return (
    <>
      <Sidebar railOpen={railOpen} setRailOpen={setRailOpen} />
      <div className={`pt-20 transition-[padding] duration-300 md:pt-0 ${railOpen ? 'md:pl-72' : 'md:pl-0'}`}>
        <Home />
        <About />
        <Experience />
        <Tech />
        <Certificates />
        <Projects />
        <Contacts />
      </div>
      <footer className={`border-t border-border px-6 py-8 transition-[margin] duration-300 ${railOpen ? 'md:ml-72' : 'md:ml-0'}`}>
        <p className="text-center text-sm text-mute">
          © {year} James Ian Antonio
        </p>
      </footer>
    </>
  );
}

export default App;
