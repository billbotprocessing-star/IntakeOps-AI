import { useState, type FormEvent } from "react";
import { Navigate } from "react-router-dom";
import Logo from "../components/Logo";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/auth";

export default function Login() {
  const { session, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (session) return <Navigate to="/app" replace />;

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setBusy(false);
  }

  return (
    <div className="auth-wrap">
      <div className="card auth-card">
        <Logo />
        <h1>Sign in to your dashboard</h1>
        <p className="muted">See every call, lead and ticket IntakeOps has handled for you.</p>
        {!supabase ? (
          <p className="notice notice-err">
            The dashboard isn't connected yet. Set <span className="mono">VITE_SUPABASE_URL</span> and{" "}
            <span className="mono">VITE_SUPABASE_ANON_KEY</span> in Netlify and redeploy.
          </p>
        ) : (
          <form onSubmit={submit}>
            <label className="field">
              Email
              <input
                className="input"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label className="field">
              Password
              <input
                className="input"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <button className="btn btn-primary" disabled={busy || loading}>
              {busy ? "Signing in…" : "Sign in"}
            </button>
            {error && <p className="notice notice-err">{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
}
