// TODO: replace the placeholder entry with your real certificates.
// Drop the file in public/assets/ and point either:
//   `pdf` — a PDF (rendered live in the card, opens a full preview modal)
//   `src` — an image (PNG/JPG) of the certificate
// Use a `link` for the credential verification URL. Keep asset names URL-safe.
export const certificates = [
  {
    title: 'Information Technology Specialist in Python',
    // TODO: confirm the issuer's full name — it is only in the scanned artwork
    issuer: 'Certiport (Pearson VUE)',
    year: '2026',
    // issued: 'October 6, 2026',
    // credentialId: 'nDFk-uT6C',
    description:
      'Issued on October 6, 2026 and valid for five years from the date of issue.',
    skills: ['Python'],
    src: null,
    pdf: '/assets/python-its-certificate.pdf',
    link: null,
  },
  {
    title: 'App Builders Hackathon 2026',
    issuer: 'App Builders',
    // TODO: add the issue year / credential ID — they are only in the artwork
    year: '2026',
    // issued: 'October 10, 2026',
    credentialId: null,
    description:
      'Building complete applications end to end using offline AI-assisted app building workflows.',
    skills: ['App building', 'AI tooling'],
    src: null,
    pdf: '/assets/localai-app-builders.pdf',
    link: null,
  },
  {
    title: 'Code Craft',
    // TODO: confirm the issuer and issue year
    issuer: 'Society for the Welfare of Information Technology Students',
    year: '2025',
    issued: null,
    credentialId: null,
    description: 'Practical craft in building and shipping software projects.',
    skills: ['Python', "Typescript", 'Next.js', 'Node.js', 'PostgreSQL', 'Git'],
    src: '/assets/code-craft-certification.png',
    pdf: null,
    link: null,
  },
];
