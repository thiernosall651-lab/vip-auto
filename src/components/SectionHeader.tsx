type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps): JSX.Element {
  return (
    <div className="max-w-2xl">
      {eyebrow ? <p className="text-sm font-black uppercase tracking-normal text-signal">{eyebrow}</p> : null}
      <h2 className="mt-2 text-2xl font-black leading-tight text-ink md:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-slate-600">{description}</p> : null}
    </div>
  );
}
