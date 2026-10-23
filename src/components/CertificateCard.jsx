import { useState } from 'react';
import PdfModal from './PdfModal';
import ImageModal from './ImageModal';
import { PDF_PREVIEW_PARAMS } from '../lib/pdf';
import useMediaQuery from '../lib/use-media-query';

// Chrome on Android hands PDFs to its native viewer and promotes the frame to a
// top-level navigation, which kicks the visitor out of the page into a new tab.
// Only embed a PDF where the primary input can hover — i.e. real desktops.
const CAN_EMBED_PDF = '(hover: hover) and (pointer: fine)';

/** Page-shaped stand-in for devices that must not embed the PDF. */
function PdfPlaceholder() {
  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <div className="flex w-full max-w-56 flex-col overflow-hidden rounded-xl border border-border bg-white">
        <div
          className="flex items-center gap-1 border-b border-border bg-primary/5 px-2.5 py-1.5"
          aria-hidden="true"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-info" />
          <span className="h-1.5 w-1.5 rounded-full bg-info" />
          <span className="h-1.5 w-1.5 rounded-full bg-info" />
        </div>
        <div className="flex flex-1 flex-col items-center gap-2 px-4 py-5 text-center">
          <svg
            className="h-7 w-7 text-ink"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.63c0-1.14-.93-2.06-2.06-2.06h-1.88a1.13 1.13 0 0 1-1.13-1.13V6.63c0-1.14-.93-2.06-2.07-2.06H7.5M9 4.5h5.25L19.5 9v10.13c0 .69-.56 1.25-1.25 1.25H9c-.69 0-1.25-.56-1.25-1.25V5.75C7.75 5.06 8.31 4.5 9 4.5Z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 14.25h4.5v4.5h-4.5z" />
          </svg>
          <span className="text-xs font-semibold uppercase tracking-widest text-ink/60">PDF</span>
          <span className="text-xs font-medium text-ink/80">Tap to preview</span>
        </div>
      </div>
    </div>
  );
}

export default function CertificateCard({ cert }) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const canHover = useMediaQuery(CAN_EMBED_PDF);

  const hasPdf = Boolean(cert.pdf);
  const hasSrc = Boolean(cert.src);
  const hasLink = Boolean(cert.link) && cert.link !== '#';
  // a PDF previews inline in the card; an image needs the modal to be seen at all
  const canPreview = hasPdf || hasSrc;
  const embedPdf = hasPdf && canHover;

  const downloadName = `${cert.title} ${cert.issuer} ${cert.year}.pdf`
    .replace(/\s+/g, ' ')
    .trim();

  return (
    <>
      <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface/60 backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
        {/* photo / pdf placeholder */}
        <div className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden border-b border-border bg-linear-to-br from-primary/5 to-info/30">
          {cert.src ? (
            <img
              src={cert.src}
              alt={`${cert.title} certificate`}
              loading="lazy"
              className="h-full w-full bg-white object-contain"
            />
          ) : embedPdf ? (
            /* live page-1 preview straight from the PDF — desktop pointers only */
            <iframe
              src={`${cert.pdf}${PDF_PREVIEW_PARAMS}`}
              title={`Preview of ${cert.title} certificate`}
              loading="lazy"
              className="h-full w-full border-0 bg-white"
            />
          ) : hasPdf ? (
            <PdfPlaceholder />
          ) : (
            <div className="flex flex-col items-center gap-1.5 px-4 text-center text-mute-2">
              <svg
                className="h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A1.5 1.5 0 0 0 21.75 19.5V4.5A1.5 1.5 0 0 0 20.25 3H3.75A1.5 1.5 0 0 0 2.25 4.5v15A1.5 1.5 0 0 0 3.75 21Z"
                />
              </svg>
              <span className="text-xs font-medium">Certificate photo</span>
            </div>
          )}

          {/* hover/focus reveal — opens the full-size preview. Touch devices
              have no hover, so the pill is dropped and the tap gets a tint. */}
          {canPreview && (
            <button
              type="button"
              onClick={() => setPreviewOpen(true)}
              aria-label={`Preview ${cert.title} certificate`}
              className={`absolute inset-0 z-10 flex cursor-pointer items-center justify-center transition-colors duration-200 ${
                canHover
                  ? 'bg-primary/0 opacity-0 hover:bg-primary/20 hover:opacity-100 focus-visible:bg-primary/20 focus-visible:opacity-100'
                  : 'bg-primary/0 active:bg-primary/15'
              }`}
            >
              {canHover && (
                <span className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-bg shadow-lg">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                  Preview
                </span>
              )}
            </button>
          )}

          <span className="absolute right-3 top-3 z-20 rounded-full border border-border bg-surface/80 px-3 py-1 text-xs font-semibold tabular-nums text-mute backdrop-blur-md">
            {cert.year}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-info text-ink">
              <svg
                className="h-4.5 w-4.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.745 3.745 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                />
              </svg>
            </span>
            <p className="text-sm font-medium text-mute">{cert.issuer}</p>
          </div>

          <h3 className="mt-3 font-bold leading-snug text-primary">
            {canPreview ? (
              <button
                type="button"
                onClick={() => setPreviewOpen(true)}
                aria-haspopup="dialog"
                className="cursor-pointer rounded-md text-left transition-colors duration-200 hover:text-primary/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {cert.title}
              </button>
            ) : (
              cert.title
            )}
          </h3>

          <p className="mt-2 flex-1 text-sm leading-relaxed text-mute">
            {cert.description}
          </p>

          {/* credential metadata — techy catch: structured data rows */}
          {(cert.issued || cert.credentialId) && (
            <dl className="mt-4 space-y-1 border-y border-border py-3 text-xs text-mute">
              {cert.issued && (
                <div className="flex items-center gap-2">
                  <dt className="w-24 shrink-0 text-mute-2">issued</dt>
                  <dd className="font-medium text-mute">{cert.issued}</dd>
                </div>
              )}
              {cert.credentialId && (
                <div className="flex items-center gap-2">
                  <dt className="w-24 shrink-0 text-mute-2">credential</dt>
                  <dd className="font-medium tracking-wide text-mute">
                    {cert.credentialId}
                  </dd>
                </div>
              )}
            </dl>
          )}

          {cert.skills?.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${cert.title} skills`}>
              {cert.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full border border-border bg-surface/60 px-3 py-0.5 text-xs font-medium text-mute"
                >
                  {skill}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-auto pt-4">
            {canPreview ? (
              <button
                type="button"
                onClick={() => setPreviewOpen(true)}
                aria-haspopup="dialog"
                className="inline-flex w-fit cursor-pointer items-center gap-1.5 rounded-md text-sm font-semibold text-primary transition-colors duration-200 hover:text-primary/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                View certificate
                <svg
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
              </button>
            ) : hasLink ? (
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-1.5 rounded-md text-sm font-semibold text-primary transition-colors duration-200 hover:text-primary/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label={`View ${cert.title} credential`}
              >
                View credential
                <svg
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
              </a>
            ) : null}
          </div>
        </div>
      </article>

      {hasPdf && (
        <PdfModal
          open={previewOpen}
          src={cert.pdf}
          label="Certificate"
          title={`${cert.title} — ${cert.issuer}`}
          downloadName={downloadName}
          onClose={() => setPreviewOpen(false)}
        />
      )}

      {!hasPdf && hasSrc && (
        <ImageModal
          open={previewOpen}
          src={cert.src}
          alt={`${cert.title} certificate`}
          label="Certificate"
          onClose={() => setPreviewOpen(false)}
        />
      )}
    </>
  );
}
