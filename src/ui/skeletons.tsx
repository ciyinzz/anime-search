export function SkeletonList() {
  return (
    <div className="grid">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="card skeleton">
          <div className="img" />
          <div className="lines">
            <div className="line" />
            <div className="line short" />
          </div>
        </div>
      ))}
    </div>
  );
}
