type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  as?: "h1" | "h2";
};

export function SectionHeader({ eyebrow, title, description, as = "h2" }: SectionHeaderProps): JSX.Element {
  const Heading = as;

  return (
    <div className="max-w-2xl">
      {eyebrow ? <p className="text-sm font-black uppercase tracking-normal text-signal">{eyebrow}</p> : null}
      <Heading className="mt-2 text-2xl font-black leading-tight text-ink md:text-4xl">{title}</Heading>
      {description ? <p className="mt-4 text-base leading-7 text-slate-600">{description}</p> : null}
    </div>
  );
}
