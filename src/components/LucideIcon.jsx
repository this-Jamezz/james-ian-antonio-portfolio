export default function LucideIcon({ icon, size = 20, className = '', ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {icon.map(([tag, attrs], index) => {
        const Tag = tag;
        return <Tag key={index} {...attrs} />;
      })}
    </svg>
  );
}