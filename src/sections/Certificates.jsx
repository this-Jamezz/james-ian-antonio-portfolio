import CertificateCard from '../components/CertificateCard';
import { certificates } from '../data/certificates';

export default function Certificates() {
  return (
    <section id="certificates" className="min-h-screen scroll-mt-24 px-6 py-24 flex items-center justify-center">
      <div className="mx-auto w-full max-w-5xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-mute">Certificates</p>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight text-primary md:text-5xl">
          Proof of work
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mute md:text-base">
          Certifications and courses that back up the stack above.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert, i) => (
            <CertificateCard key={`${cert.title}-${cert.issuer}-${cert.year}-${i}`} cert={cert} />
          ))}
        </div>
      </div>
    </section>
  );
}
