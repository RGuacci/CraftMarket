interface UserAvatarProps {
  name?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "w-8 h-8 text-xs",
  md: "w-11 h-11 text-sm",
  lg: "w-14 h-14 text-lg",
};

export default function ProfileIcon({ name, size = "md" }: UserAvatarProps) {
  const initials =
    name
      ?.trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("") || "?";

  return (
    <div
      className={`avatar placeholder ${sizes[size]} rounded-full bg-primary/15 text-primary flex items-center justify-center`}
      aria-label={`Avatar di ${name ?? "utente"}`}
    >
      <span className="font-semibold">{initials}</span>
    </div>
  );
}
