// Ambient, non-interactive background atmosphere. Lives behind all content.
export default function FloatingShapes() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-spotlight" />
      <div className="absolute -left-32 top-24 h-96 w-96 rounded-full bg-accent/20 blur-[120px] animate-float" />
      <div
        className="absolute -right-24 top-1/2 h-[28rem] w-[28rem] rounded-full bg-secondary/20 blur-[140px] animate-float"
        style={{ animationDelay: '-6s' }}
      />
    </div>
  );
}
