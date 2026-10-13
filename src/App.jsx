import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './sections/Home';
import Experience from './sections/Experience';
import Tech from './sections/Tech';
import Certificates from './sections/Certificates';
import Projects from './sections/Projects';
import Contacts from './sections/Contacts';
import { initSmoothScroll, destroySmoothScroll } from './lib/smooth-scroll';

const year = new Date().getFullYear();

function App() {
  useEffect(() => {
    initSmoothScroll();
    return () => destroySmoothScroll();
  }, []);
  return (
    <>
      <Navbar />
      <div className="pt-24">
        <Home />
        <Experience />
        <Tech />
        <Certificates />
        <Projects />
        <Contacts />
      </div>
      <footer className="border-t border-border px-6 py-8">
        <p className="text-center text-sm text-primary/60">
          © {year} James Ian Antonio
        </p>
      </footer>
    </>
  );
}

export default App;