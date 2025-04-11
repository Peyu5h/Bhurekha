export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-muted/5 relative min-h-screen">
      <div className="bg-grid-black/[0.02] absolute inset-0 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))]" />
      <div className="relative container mx-auto">{children}</div>
    </div>
  );
}
