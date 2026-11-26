import { useState } from 'react';
import { motion } from 'motion/react';

const photos = [
  {
    image: '/assets/about-hackathon.jpg',
    title: 'AppBuildersPH Hackathon',
    description: 'My team received the Tutorials Dojo Choice Award at the AppBuildersPH Hackathon. We got together for a photo with Mr Bryl.',
    alt: 'Five people pose onstage with the hackathon prize check.',
  },
  {
    image: '/assets/about-selfie.jpg',
    title: 'A casual selfie',
    description: 'My girlfriend and I took this selfie while we were out for a bite. I love having little photos like this to look back on.',
    alt: 'Two people take a selfie under the lights of a restaurant.',
  },
  {
    image: '/assets/about-beach.jpg',
    title: 'By the beach',
    description: 'I took some time to walk along the shore. This photo is a little reminder of a day spent by the water.',
    alt: 'James stands on the beach in a white shirt and sunglasses.',
  },
  {
    image: '/assets/about-gym.jpg',
    title: 'At the gym',
    description: 'Getting to the gym is one way I make time to stay active. I snapped this in the mirror by the dumbbell rack.',
    alt: 'James takes a mirror selfie in the gym beside a rack of dumbbells.',
  },
];

export default function About() {
  const [selected, setSelected] = useState(0);
  const photo = photos[selected];
  const previousPhoto = photos[(selected + photos.length - 1) % photos.length];
  const nextPhoto = photos[(selected + 1) % photos.length];
  const move = (direction) => setSelected((current) => (current + direction + photos.length) % photos.length);

  return (
    <section id="about" className="flex min-h-screen scroll-mt-24 items-center px-6 py-24">
      <div className="mx-auto w-full max-w-5xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-mute">About</p>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight text-primary md:text-5xl">A little more about me</h2>
        <div className="mt-10 grid items-center gap-10 md:grid-cols-2">
          <div className="order-2 md:order-1" aria-live="polite" aria-atomic="true">
            <p className="text-xs font-semibold uppercase tracking-widest text-mute">{String(selected + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}</p>
            <h3 className="mt-3 text-2xl font-bold text-primary">{photo.title}</h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-mute">{photo.description}</p>
            <div className="mt-8 flex items-center gap-2" aria-label="Choose a photo">
              {photos.map((item, index) => (
                <button key={item.title} type="button" onClick={() => setSelected(index)} aria-label={`Show photo ${index + 1}: ${item.title}`} aria-current={index === selected ? 'true' : undefined} className={`h-3 rounded-full transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${index === selected ? 'w-8 bg-primary' : 'w-3 bg-primary/25 hover:bg-primary/50'}`} />
              ))}
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="group mx-auto max-w-sm px-6 pb-6 pt-4">
              <div className="relative motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-translate-y-1">
                <img src={previousPhoto.image} alt="" aria-hidden="true" draggable="false" className="pointer-events-none absolute inset-0 h-full w-full -translate-x-3 -rotate-8 rounded-2xl border border-border object-cover opacity-40 group-hover:opacity-55 motion-safe:transition motion-safe:duration-200 motion-safe:group-hover:-translate-x-5 motion-safe:group-hover:-rotate-10" />
                <img src={nextPhoto.image} alt="" aria-hidden="true" draggable="false" className="pointer-events-none absolute inset-0 h-full w-full translate-x-3 rotate-8 rounded-2xl border border-border object-cover opacity-40 group-hover:opacity-55 motion-safe:transition motion-safe:duration-200 motion-safe:group-hover:translate-x-5 motion-safe:group-hover:rotate-10" />
                <motion.div key={selected} drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.2} onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 50) move(info.offset.x < 0 ? 1 : -1); }} className="relative cursor-grab touch-pan-y overflow-hidden rounded-2xl border border-border bg-surface shadow-xl active:cursor-grabbing">
                  <img src={photo.image} alt={photo.alt} draggable="false" className="aspect-[4/5] w-full object-cover" />
                </motion.div>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-center gap-4">
              <button type="button" onClick={() => move(-1)} aria-label="Previous photo" className="rounded-xl border border-border px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">←</button>
              <span className="text-xs text-mute">Swipe to explore</span>
              <button type="button" onClick={() => move(1)} aria-label="Next photo" className="rounded-xl border border-border px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">→</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
