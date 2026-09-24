import { Navigate, NavLink, Outlet } from "react-router-dom";
import { Inbox, LayoutDashboard, LogOut, PhoneMissed, PhoneCall, Plug, Ticket } from "lucide-react";
import Logo from "../../components/Logo";
import { useAuth } from "../../lib/auth";
import { supabase } from "../../lib/supabase";

const NAV = [
  { to: "/app", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/app/leads", label: "Leads", icon: PhoneCall },
  { to: "/app/tickets", label: "Tickets", icon: Ticket },
  { to: "/app/missed-calls", label: "Missed calls", icon: PhoneMissed },
  { to: "/app/demo-requests", label: "Demo requests", icon: Inbox },
  { to: "/app/integrations", label: "Integrations", icon: Plug },
];

export default function AppLayout() {
  const { session, loading } = useAuth();
  if (loading) return <div className="auth-wrap muted">Loading…</div>;
  if (!session) return <Navigate to="/login" replace />;

  return (
    <div className="shell">
      <aside className="sidebar">
        <Logo to="/app" />
        <nav aria-label="Dashboard">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}>
              <Icon size={17} /> {label}
            </NavLink>
          ))}
        </nav>
        <div className="spacer" />
        <div className="user">{session.user.email}</div>
        <button className="nav-item link-btn signout" onClick={() => supabase?.auth.signOut()} style={{ width: "100%" }} aria-label="Sign out">
          <LogOut size={17} /> <span className="signout-label">Sign out</span>
        </button>
      </aside>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
