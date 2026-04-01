interface MetaRowProps {
  location: string;
  year: string;
  category: string;
}

export function MetaRow({ location, year, category }: MetaRowProps) {
  const items = [location, year, category];
  return (
    <div className="flex items-center gap-4" style={{ fontFamily: "'Inter', sans-serif" }}>
      {items.map((item, i) => (
        <span key={item} className="flex items-center gap-4">
          <span
            className="text-[#888888] uppercase tracking-[0.1em]"
            style={{ fontSize: "12px" }}
          >
            {item}
          </span>
          {i < items.length - 1 && (
            <span className="w-px h-3 bg-[#888888]" />
          )}
        </span>
      ))}
    </div>
  );
}
