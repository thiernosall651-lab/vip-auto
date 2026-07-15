import { Trash2, Upload } from "lucide-react";
import type { ChangeEvent, ReactNode } from "react";

const inputClass =
  "min-h-11 w-full rounded border border-slate-300 bg-white px-3 text-sm text-ink outline-none transition focus:border-signal focus:ring-2 focus:ring-red-100";

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export function AdminField({ label, children, hint }: { label: string; children: ReactNode; hint?: string }): JSX.Element {
  return (
    <label className="grid gap-1.5">
      <span className="text-xs font-black uppercase tracking-normal text-slate-500">{label}</span>
      {children}
      {hint ? <span className="text-xs text-slate-400">{hint}</span> : null}
    </label>
  );
}

export function TextInput(props: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}): JSX.Element {
  return (
    <input
      className={inputClass}
      type={props.type ?? "text"}
      value={props.value}
      placeholder={props.placeholder}
      onChange={(event) => props.onChange(event.target.value)}
    />
  );
}

export function NumberInput(props: { value: number; onChange: (value: number) => void }): JSX.Element {
  return (
    <input
      className={inputClass}
      type="number"
      value={Number.isFinite(props.value) ? props.value : 0}
      onChange={(event) => props.onChange(Number(event.target.value))}
    />
  );
}

export function TextArea(props: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}): JSX.Element {
  return (
    <textarea
      className={`${inputClass} min-h-24 py-2`}
      rows={props.rows ?? 3}
      value={props.value}
      placeholder={props.placeholder}
      onChange={(event) => props.onChange(event.target.value)}
    />
  );
}

export function Checkbox(props: { label: string; checked: boolean; onChange: (checked: boolean) => void }): JSX.Element {
  return (
    <label className="inline-flex items-center gap-2 text-sm font-bold text-ink">
      <input
        type="checkbox"
        className="h-4 w-4 accent-signal"
        checked={props.checked}
        onChange={(event) => props.onChange(event.target.checked)}
      />
      {props.label}
    </label>
  );
}

export function ImageInput(props: { label: string; value?: string; onChange: (value: string) => void }): JSX.Element {
  async function handleFile(event: ChangeEvent<HTMLInputElement>): Promise<void> {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    props.onChange(await readFileAsDataUrl(file));
  }

  return (
    <AdminField label={props.label} hint="Téléversez une image ou collez un chemin (ex : /images/hero-vidange.webp).">
      <div className="flex items-center gap-3">
        <div className="flex h-16 w-16 flex-none items-center justify-center overflow-hidden rounded border border-slate-200 bg-slate-50">
          {props.value ? (
            <img src={props.value} alt="" className="h-full w-full object-contain" />
          ) : (
            <Upload className="h-5 w-5 text-slate-400" aria-hidden="true" />
          )}
        </div>
        <div className="min-w-0 flex-1 grid gap-2">
          <input className={inputClass} value={props.value ?? ""} onChange={(event) => props.onChange(event.target.value)} />
          <div className="flex items-center gap-3">
            <label className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-black uppercase tracking-normal text-signal">
              <Upload className="h-3.5 w-3.5" aria-hidden="true" />
              Téléverser
              <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
            </label>
            {props.value ? (
              <button
                type="button"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-signal"
                onClick={() => props.onChange("")}
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                Retirer
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </AdminField>
  );
}

export function MultiImageInput(props: {
  values: string[];
  onChange: (values: string[]) => void;
  onFileNames?: (names: string[]) => void;
}): JSX.Element {
  async function addFile(event: ChangeEvent<HTMLInputElement>): Promise<void> {
    const files = event.target.files;
    if (!files || files.length === 0) {
      return;
    }
    const list = Array.from(files);
    props.onFileNames?.(list.map((file) => file.name));
    const dataUrls = await Promise.all(list.map((file) => readFileAsDataUrl(file)));
    props.onChange([...props.values, ...dataUrls]);
    event.target.value = "";
  }

  return (
    <AdminField label="Images du produit" hint="La première image est l'image principale.">
      <div className="flex flex-wrap gap-3">
        {props.values.map((image, index) => (
          <div key={index} className="relative h-20 w-20 overflow-hidden rounded border border-slate-200 bg-slate-50">
            <img src={image} alt="" className="h-full w-full object-contain" />
            <button
              type="button"
              className="absolute right-0 top-0 inline-flex h-6 w-6 items-center justify-center bg-black/50 text-white"
              onClick={() => props.onChange(props.values.filter((_, itemIndex) => itemIndex !== index))}
              aria-label="Retirer l'image"
            >
              <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        ))}
        <label className="inline-flex h-20 w-20 cursor-pointer flex-col items-center justify-center gap-1 rounded border border-dashed border-slate-300 text-xs font-bold text-slate-500 hover:border-signal hover:text-signal">
          <Upload className="h-4 w-4" aria-hidden="true" />
          Ajouter
          <input type="file" accept="image/*" multiple className="hidden" onChange={addFile} />
        </label>
      </div>
    </AdminField>
  );
}

export function AdminButton(props: {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "ghost" | "danger";
}): JSX.Element {
  const variant = props.variant ?? "primary";
  const styles =
    variant === "primary"
      ? "bg-ink text-white hover:bg-signal"
      : variant === "danger"
        ? "border border-red-200 bg-red-50 text-signal hover:bg-red-100"
        : "border border-slate-300 bg-white text-ink hover:border-signal hover:text-signal";

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded px-4 text-sm font-black uppercase tracking-normal transition active:scale-[0.98] ${styles}`}
    >
      {props.children}
    </button>
  );
}

export function AdminCard({ children }: { children: ReactNode }): JSX.Element {
  return <div className="rounded border border-slate-200 bg-white p-5 shadow-sm">{children}</div>;
}
