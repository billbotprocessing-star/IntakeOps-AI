import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  BarChart3,
  Building2,
  Check,
  GitBranch,
  Headphones,
  Home,
  Phone,
  RefreshCcw,
  Scale,
  Sparkles,
  Store,
} from "lucide-react";
import Logo from "../components/Logo";

const STATS = [
  { value: "78%", label: "of customers choose the first business to respond" },
  { value: "5 min", label: "optimal response window for a new lead" },
  { value: "35%", label: "of service calls arrive after hours" },
];

const STEPS = [
  {
    title: "Train on your blueprint",
    body: "We map your intake questions, qualifiers, disqualifiers and escalation rules. The AI learns your business from your website, Google Business Profile and vertical playbooks.",
  },
  {
    title: "Automate & sync",
    body: "Every call creates or updates a CRM lead with tags, notes and the recording. Smart routing books, quotes or transfers based on business hours and urgency.",
  },
  {
    title: "Track & optimize",
    body: "Your dashboard shows capture rate, qualification rate and response time. Weekly QA reviews and prompt tuning keep performance improving.",
  },
];

const FEATURES = [
  {
    icon: Headphones,
    title: "AI voice receptionist",
    body: "Natural conversations trained on your business — answers questions, qualifies intent and handles objections, 24/7.",
    points: ["Custom intake blueprint", "Qualification & disqualification logic", "Escalation rules for urgent cases"],
  },
  {
    icon: RefreshCcw,
    title: "Closed-loop CRM automation",
    body: "Automatic lead creation, tagging and follow-up so no caller falls through the cracks.",
    points: ["HubSpot contact + deal per call", "SMS confirmation & recovery texts", "Recording and transcript on every lead"],
  },
  {
    icon: GitBranch,
    title: "Smart qualification & routing",
    body: "A business-hours-aware engine that books, quotes, dispatches or transfers based on need and urgency.",
    points: ["Instant booking for qualified leads", "Emergency dispatch & on-call paging", "Spam and low-intent filtering"],
  },
  {
    icon: BarChart3,
    title: "Conversion dashboard",
    body: "Metrics that matter — not call volume, but business outcomes.",
    points: ["Missed-call recovery rate", "Qualified-lead rate", "Every lead's status in one place"],
  },
];

const INDUSTRIES = [
  { icon: Home, title: "Home services", body: "Plumbing, HVAC, electrical — triage emergencies, book repairs, dispatch techs." },
  { icon: Scale, title: "Legal intake", body: "Case screening, conflict checks, statute awareness and consultation booking." },
  { icon: Sparkles, title: "Med spas & salons", body: "Appointment booking, medical screening, deposits and reminders." },
  { icon: Building2, title: "Property management", body: "Tenant vs. owner routing, maintenance requests and showings." },
  { icon: Store, title: "Multi-location SMBs", body: "Location routing and consistent intake across every branch." },
];

const WHY = [
  ["Outcome-driven pricing", "Pay for qualified leads and booked jobs, not minutes on the phone."],
  ["Vertical playbooks included", "Prebuilt qualifier trees for your industry cut setup time and improve accuracy from day one."],
  ["Closed-loop lead recovery", "Automatic follow-up for no-answer, after-hours and abandoned callers recovers leads you'd otherwise lose."],
  ["Human-reviewed QA", "Weekly call reviews and prompt tuning so your receptionist keeps getting sharper."],
];

export default function Landing() {
  return (
    <>
      <header className="site-nav">
        <div className="container">
          <Logo />
          <div className="actions">
            <Link to="/login" className="btn btn-ghost btn-sm">
              Sign in
            </Link>
            <a href="#demo" className="btn btn-primary btn-sm">
              Book a demo
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <span className="eyebrow">Priced on outcomes, not minutes</span>
            <h1>AI receptionist that books jobs, not just calls</h1>
            <p className="lead">
              24/7 intake automation that qualifies leads, syncs your CRM and closes the loop — so you never lose
              another high-intent caller.
            </p>
            <div className="ctas">
              <a href="#demo" className="btn btn-primary">
                <Phone size={18} /> Get a demo call
              </a>
              <a href="#how" className="btn btn-ghost">
                How it works
              </a>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head">
              <h2>Every missed call is lost revenue</h2>
              <p>
                When high-intent callers reach voicemail, they call your competitor next. Answering services take
                messages — they don't qualify, book or follow up.
              </p>
            </div>
            <div className="grid grid-3">
              {STATS.map((s) => (
                <div className="card" key={s.value}>
                  <div className="stat-big">{s.value}</div>
                  <p>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="how">
          <div className="container">
            <div className="section-head">
              <h2>How it works</h2>
              <p>From setup to scale in three steps.</p>
            </div>
            <div className="grid grid-3">
              {STEPS.map((step, i) => (
                <div className="card" key={step.title}>
                  <div className="step-num">{i + 1}</div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head">
              <h2>Built for conversion, not conversation</h2>
              <p>Every feature is designed to turn callers into customers.</p>
            </div>
            <div className="grid grid-2">
              {FEATURES.map(({ icon: Icon, title, body, points }) => (
                <div className="card" key={title}>
                  <div className="icon">
                    <Icon size={22} />
                  </div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                  <ul>
                    {points.map((p) => (
                      <li key={p}>
                        <Check size={16} /> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head">
              <h2>Built for high-intent lead businesses</h2>
              <p>Vertical playbooks for industries where speed-to-lead wins.</p>
            </div>
            <div className="grid grid-5">
              {INDUSTRIES.map(({ icon: Icon, title, body }) => (
                <div className="card" key={title}>
                  <div className="icon">
                    <Icon size={22} />
                  </div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head">
              <h2>Why IntakeOps</h2>
              <p>More than an answering service — a conversion engine.</p>
            </div>
            <div className="grid grid-2">
              {WHY.map(([title, body]) => (
                <div className="card" key={title}>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="demo">
          <div className="container">
            <div className="section-head">
              <h2>Hear it on a real call</h2>
              <p>Enter your number and our AI receptionist will call you within a minute.</p>
            </div>
            <DemoForm />
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <span>© {new Date().getFullYear()} IntakeOps AI</span>
          <Link to="/login">Client dashboard</Link>
        </div>
      </footer>
    </>
  );
}

function DemoForm() {
  const [phone, setPhone] = useState("");
  const [industry, setIndustry] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault();
    setState("sending");
    try {
      const resp = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: phone, industry, source: "Landing Page" }),
      });
      if (resp.status === 422) throw new Error("Please check your phone number and industry.");
      if (!resp.ok) throw new Error("We couldn't start the call just now. Please try again in a minute.");
      setState("sent");
      setMessage("You're in the queue — your phone will ring shortly.");
      setPhone("");
      setIndustry("");
    } catch (err) {
      setState("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <form className="card demo-card" onSubmit={submit}>
      <div className="form-row">
        <label className="field">
          Phone number
          <input
            className="input"
            type="tel"
            autoComplete="tel"
            placeholder="+1 555 123 4567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </label>
        <label className="field">
          Industry
          <select className="select" value={industry} onChange={(e) => setIndustry(e.target.value)} required>
            <option value="">Select…</option>
            <option value="home-services">Home services</option>
            <option value="legal">Legal intake</option>
            <option value="med-spa">Med spa / salon</option>
            <option value="property">Property management</option>
            <option value="multi-location">Multi-location SMB</option>
            <option value="other">Other</option>
          </select>
        </label>
      </div>
      <button className="btn btn-primary" style={{ width: "100%", marginTop: 16 }} disabled={state === "sending"}>
        <Phone size={18} /> {state === "sending" ? "Starting call…" : "Call me now"}
      </button>
      {state === "sent" && <p className="notice notice-ok">{message}</p>}
      {state === "error" && <p className="notice notice-err">{message}</p>}
    </form>
  );
}
