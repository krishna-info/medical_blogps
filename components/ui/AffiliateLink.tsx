export default function AffiliateLink({ href, children, className = '' }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={href} rel="sponsored nofollow" target="_blank" className={`text-medical-teal hover:underline font-semibold ${className}`}>
      {children}
    </a>
  );
}
