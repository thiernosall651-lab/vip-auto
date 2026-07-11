type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Heading level for the title. Defaults to h2; use h1 for a page's primary heading. */
  as?: "h1" | "h2";
  /** Colour scheme. Use "dark" on dark section backgrounds for readable contrast. */
  tone?: "light" | "dark";
};

export function SectionHeader({ eyebrow, title, description, as = "h2", tone = "light" }: SectionHeaderProps): JSX.Element {
  const Heading = as;
  const titleColor = tone === "dark" ? "text-white" : "text-ink";
  const descriptionColor = tone === "dark" ? "text-slate-300" : "text-slate-600";

  return (
    <div className="max-w-2xl">
      {eyebrow ? <p className="text-sm font-black uppercase tracking-normal text-signal">{eyebrow}</p> : null}
      <Heading className={`mt-2 text-2xl font-black leading-tight md:text-4xl ${titleColor}`}>{title}</Heading>
      {description ? <p className={`mt-4 text-base leading-7 ${descriptionColor}`}>{description}</p> : null}
    </div>
  );
}
