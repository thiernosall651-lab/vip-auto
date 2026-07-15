import { Eye, EyeOff, Pencil, Plus, Sparkles, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  AdminButton,
  AdminCard,
  AdminField,
  Checkbox,
  MultiImageInput,
  NumberInput,
  TextArea,
  TextInput,
} from "../../components/admin/AdminUI";
import { categories, vehicleYears } from "../../data/catalog";
import { detectType, generateProduct, partTypeOptions, type AutoPartType } from "../../lib/ai/engine";
import { useContent } from "../../lib/content/store";
import { formatCurrency } from "../../lib/format";
import type { Product } from "../../types/catalog";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function blankProduct(): Product {
  return {
    id: `prod-${Date.now()}`,
    slug: "",
    name: "",
    category: "engine-oil",
    brand: "",
    compatibleBrands: [],
    compatibleYears: vehicleYears,
    price: 0,
    currency: "XOF",
    image: "",
    images: [],
    imageAlt: "",
    description: "",
    specifications: [],
    stock: 0,
    isFeatured: false,
    isBestSeller: false,
    isActive: true,
  };
}

export function AdminProductsPage(): JSX.Element {
  const { content, saveProduct, deleteProduct } = useContent();
  const [draft, setDraft] = useState<Product | null>(null);
  const [detectedType, setDetectedType] = useState<AutoPartType>("engine-oil");
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState("");

  function edit(product: Product): void {
    setDraft({ ...product, images: product.images ?? (product.image ? [product.image] : []) });
    setDetectedType(detectType({ name: product.name, brand: product.brand }));
    setFileNames([]);
    setPriceRange("");
  }

  function update<K extends keyof Product>(key: K, value: Product[K]): void {
    setDraft((current) => (current ? { ...current, [key]: value } : current));
  }

  function generateWithAI(): void {
    const result = generateProduct({ type: detectedType, brand: draft?.brand, name: draft?.name });
    setDraft((current) =>
      current
        ? {
            ...current,
            name: result.name,
            brand: result.brand,
            category: result.category,
            compatibleBrands: result.compatibleBrands,
            imageAlt: result.altText,
            description: result.shortDescription,
            specifications: result.features,
            price: current.price > 0 ? current.price : result.suggestedPrice,
            seoTitle: result.seoTitle,
            seoDescription: result.seoDescription,
            longDescription: result.longDescription,
            benefits: result.benefits,
            keywords: result.keywords,
            tags: result.tags,
          }
        : current,
    );
    setPriceRange(result.priceRange);
  }

  function save(): void {
    if (!draft) {
      return;
    }
    const images = draft.images ?? [];
    const nextSlug = draft.slug.trim() || slugify(draft.name);

    if (!nextSlug) {
      window.alert("Veuillez saisir un nom de produit ou un slug valide avant d'enregistrer.");
      return;
    }

    const next: Product = {
      ...draft,
      slug: nextSlug,
      image: images[0] ?? draft.image,
      images,
    };
    saveProduct(next);
    setDraft(null);
  }

  if (draft) {
    return (
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black text-ink">{content.products.some((p) => p.id === draft.id) ? "Modifier" : "Ajouter"} un produit</h1>
          <AdminButton variant="ghost" onClick={() => setDraft(null)}>
            Annuler
          </AdminButton>
        </div>

        <AdminCard>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-signal text-white">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-sm font-black text-ink">Générateur de fiche IA</h2>
              <p className="text-xs text-slate-500">
                Téléversez une image ci-dessous ou choisissez le type, puis générez toute la fiche.
              </p>
            </div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
            <AdminField label="Type de produit détecté">
              <select
                className="min-h-11 w-full rounded border border-slate-300 bg-white px-3 text-sm text-ink outline-none focus:border-signal focus:ring-2 focus:ring-red-100"
                value={detectedType}
                onChange={(event) => setDetectedType(event.target.value as AutoPartType)}
              >
                {partTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </AdminField>
            <AdminButton onClick={generateWithAI}>
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Générer la fiche
            </AdminButton>
          </div>
          {priceRange ? (
            <p className="mt-3 text-sm font-bold text-slate-600">
              Fourchette de prix suggérée : <span className="text-signal">{priceRange}</span> — à confirmer manuellement.
            </p>
          ) : null}
          <p className="mt-2 text-xs text-slate-400">
            Tous les champs générés restent modifiables ci-dessous avant d'enregistrer.
          </p>
        </AdminCard>

        <AdminCard>
          <div className="grid gap-4 md:grid-cols-2">
            <AdminField label="Nom">
              <TextInput value={draft.name} onChange={(value) => update("name", value)} />
            </AdminField>
            <AdminField label="Slug (URL)" hint="Laissez vide pour générer depuis le nom.">
              <TextInput value={draft.slug} onChange={(value) => update("slug", value)} placeholder={slugify(draft.name)} />
            </AdminField>
            <AdminField label="Marque">
              <TextInput value={draft.brand} onChange={(value) => update("brand", value)} />
            </AdminField>
            <AdminField label="Catégorie">
              <select
                className="min-h-11 w-full rounded border border-slate-300 bg-white px-3 text-sm text-ink outline-none focus:border-signal focus:ring-2 focus:ring-red-100"
                value={draft.category}
                onChange={(event) => update("category", event.target.value as Product["category"])}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </AdminField>
            <AdminField label="Prix (FCFA)">
              <NumberInput value={draft.price} onChange={(value) => update("price", value)} />
            </AdminField>
            <AdminField label="Prix barré (promo, optionnel)">
              <NumberInput value={draft.compareAtPrice ?? 0} onChange={(value) => update("compareAtPrice", value || undefined)} />
            </AdminField>
            <AdminField label="Stock">
              <NumberInput value={draft.stock} onChange={(value) => update("stock", value)} />
            </AdminField>
            <AdminField label="Badge (optionnel)">
              <TextInput value={draft.badge ?? ""} onChange={(value) => update("badge", value || undefined)} />
            </AdminField>
            <AdminField label="Marques compatibles (séparées par des virgules)">
              <TextInput
                value={draft.compatibleBrands.join(", ")}
                onChange={(value) => update("compatibleBrands", value.split(",").map((item) => item.trim()).filter(Boolean))}
              />
            </AdminField>
            <AdminField label="Texte alternatif de l'image">
              <TextInput value={draft.imageAlt} onChange={(value) => update("imageAlt", value)} />
            </AdminField>
          </div>

          <div className="mt-4 grid gap-4">
            <AdminField label="Description">
              <TextArea value={draft.description} onChange={(value) => update("description", value)} rows={3} />
            </AdminField>
            <AdminField label="Caractéristiques (une par ligne)">
              <TextArea
                value={draft.specifications.join("\n")}
                onChange={(value) => update("specifications", value.split("\n").map((item) => item.trim()).filter(Boolean))}
                rows={4}
              />
            </AdminField>
            <MultiImageInput
              values={draft.images ?? []}
              onChange={(values) => update("images", values)}
              onFileNames={(names) => {
                const nextNames = [...fileNames, ...names];
                setFileNames(nextNames);
                setDetectedType(detectType({ fileNames: nextNames, name: draft.name, brand: draft.brand }));
              }}
            />
            <div className="flex flex-wrap gap-6">
              <Checkbox label="En vedette" checked={draft.isFeatured} onChange={(value) => update("isFeatured", value)} />
              <Checkbox label="Meilleure vente" checked={draft.isBestSeller} onChange={(value) => update("isBestSeller", value)} />
              <Checkbox label="Actif (visible)" checked={draft.isActive !== false} onChange={(value) => update("isActive", value)} />
            </div>
          </div>

          <div className="mt-6 grid gap-4 border-t border-slate-200 pt-5">
            <p className="text-sm font-black text-ink">SEO & marketing (IA)</p>
            <AdminField label="Titre SEO">
              <TextInput value={draft.seoTitle ?? ""} onChange={(value) => update("seoTitle", value)} />
            </AdminField>
            <AdminField label="Méta-description SEO">
              <TextArea value={draft.seoDescription ?? ""} onChange={(value) => update("seoDescription", value)} rows={2} />
            </AdminField>
            <AdminField label="Description longue">
              <TextArea value={draft.longDescription ?? ""} onChange={(value) => update("longDescription", value)} rows={4} />
            </AdminField>
            <AdminField label="Bénéfices (un par ligne)">
              <TextArea
                value={(draft.benefits ?? []).join("\n")}
                onChange={(value) => update("benefits", value.split("\n").map((item) => item.trim()).filter(Boolean))}
                rows={3}
              />
            </AdminField>
            <div className="grid gap-4 md:grid-cols-2">
              <AdminField label="Mots-clés (séparés par des virgules)">
                <TextInput
                  value={(draft.keywords ?? []).join(", ")}
                  onChange={(value) => update("keywords", value.split(",").map((item) => item.trim()).filter(Boolean))}
                />
              </AdminField>
              <AdminField label="Tags (séparés par des virgules)">
                <TextInput
                  value={(draft.tags ?? []).join(", ")}
                  onChange={(value) => update("tags", value.split(",").map((item) => item.trim()).filter(Boolean))}
                />
              </AdminField>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <AdminButton onClick={save}>Enregistrer</AdminButton>
            <AdminButton variant="ghost" onClick={() => setDraft(null)}>
              Annuler
            </AdminButton>
          </div>
        </AdminCard>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-ink">Produits</h1>
          <p className="mt-1 text-sm text-slate-500">{content.products.length} produit(s) au catalogue.</p>
        </div>
        <AdminButton
          onClick={() => {
            setDraft(blankProduct());
            setDetectedType("generic");
            setFileNames([]);
            setPriceRange("");
          }}
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Ajouter
        </AdminButton>
      </div>

      <div className="grid gap-3">
        {content.products.map((product) => (
          <div key={product.id} className="flex items-center gap-4 rounded border border-slate-200 bg-white p-3 shadow-sm">
            <div className="flex h-14 w-14 flex-none items-center justify-center overflow-hidden rounded bg-slate-50">
              {product.image ? <img src={product.image} alt="" className="h-full w-full object-contain" /> : null}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-black text-ink">{product.name}</p>
              <p className="text-xs text-slate-500">
                {formatCurrency(product.price, product.currency)} · stock {product.stock}
                {product.isActive === false ? " · désactivé" : ""}
              </p>
            </div>
            <span className="hidden text-slate-400 sm:inline" title={product.isActive === false ? "Désactivé" : "Actif"}>
              {product.isActive === false ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </span>
            <button className="text-slate-500 hover:text-signal" onClick={() => edit(product)} aria-label="Modifier">
              <Pencil className="h-4 w-4" />
            </button>
            <button
              className="text-slate-500 hover:text-signal"
              onClick={() => {
                if (window.confirm(`Supprimer « ${product.name} » ?`)) {
                  deleteProduct(product.id);
                }
              }}
              aria-label="Supprimer"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
