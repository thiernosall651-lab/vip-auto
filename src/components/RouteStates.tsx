import { Link } from "@tanstack/react-router";

export function NotFoundPage(): JSX.Element {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center">
      <p className="text-sm font-black uppercase tracking-normal text-signal">Erreur 404</p>
      <h1 className="mt-3 text-4xl font-black text-ink md:text-5xl">Page introuvable</h1>
      <p className="mt-4 text-base leading-7 text-slate-600">
        La page que vous cherchez n'existe pas ou a été déplacée.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          className="inline-flex min-h-12 items-center justify-center rounded bg-ink px-6 py-3 text-sm font-black uppercase tracking-normal text-white transition hover:bg-signal"
          to="/"
        >
          Retour à l'accueil
        </Link>
        <Link
          className="inline-flex min-h-12 items-center justify-center rounded border border-slate-300 px-6 py-3 text-sm font-black uppercase tracking-normal text-ink transition hover:border-signal hover:text-signal"
          to="/shop"
        >
          Voir la boutique
        </Link>
      </div>
    </main>
  );
}

export function ErrorState(): JSX.Element {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center">
      <p className="text-sm font-black uppercase tracking-normal text-signal">Oups</p>
      <h1 className="mt-3 text-3xl font-black text-ink md:text-4xl">Une erreur est survenue</h1>
      <p className="mt-4 text-base leading-7 text-slate-600">
        Merci de réessayer. Si le problème persiste, contactez-nous sur WhatsApp.
      </p>
      <button
        className="mt-8 inline-flex min-h-12 items-center justify-center rounded bg-ink px-6 py-3 text-sm font-black uppercase tracking-normal text-white transition hover:bg-signal"
        type="button"
        onClick={() => window.location.reload()}
      >
        Recharger la page
      </button>
    </main>
  );
}
