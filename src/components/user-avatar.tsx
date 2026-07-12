export function UserAvatar({
  name,
  className,
  background = "#00aa5b",
}: {
  name: string;
  className: string;
  background?: string;
}) {
  const initials = name
    .split(/[._\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <span
      className={`${className} inline-flex shrink-0 items-center justify-center font-bold text-white`}
      style={{ backgroundColor: background }}
      aria-label={name}
    >
      {initials || "EX"}
    </span>
  );
}
