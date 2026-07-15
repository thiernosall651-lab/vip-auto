import { useNavigate } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { useAdminAuth } from "../../lib/admin/auth";

export function AdminLoginPage(): JSX.Element {
  const { login, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/admin" });
    }
  }, [isAuthenticated, navigate]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (login(pin)) {
      navigate({ to: "/admin" });
    } else {
      setError(true);
      setPin("");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-lg border border-white/10 bg-white p-8 shadow-2xl"
      >
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-signal text-white">
            <Lock className="h-5 w-5" aria-hidden="true" />
          </span>
          <h1 className="mt-4 text-2xl font-black text-ink">Espace administrateur</h1>
          <p className="mt-1 text-sm text-slate-500">VIP AUTO · saisissez votre code à 4 chiffres</p>
        </div>

        <label className="sr-only" htmlFor="admin-pin">
          Code PIN
        </label>
        <input
          id="admin-pin"
          className="mt-6 w-full rounded border border-slate-300 px-4 py-3 text-center text-2xl font-black tracking-[0.5em] text-ink outline-none transition focus:border-signal focus:ring-2 focus:ring-red-100"
          type="password"
          inputMode="numeric"
          autoComplete="off"
          maxLength={4}
          value={pin}
          placeholder="••••"
          onChange={(event) => {
            setError(false);
            setPin(event.target.value.replace(/\D/g, "").slice(0, 4));
          }}
          autoFocus
        />

        {error ? <p className="mt-3 text-center text-sm font-bold text-signal">Code incorrect. Réessayez.</p> : null}

        <button
          type="submit"
          disabled={pin.length !== 4}
          className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded bg-ink px-5 py-3 text-sm font-black uppercase tracking-normal text-white transition hover:bg-signal disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Se connecter
        </button>
      </form>
    </main>
  );
}
