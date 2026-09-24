import { Link } from "react-router-dom";
import { PhoneIncoming } from "lucide-react";

export default function Logo({ to = "/" }: { to?: string }) {
  return (
    <Link to={to} className="logo">
      <span className="logo-mark">
        <PhoneIncoming size={16} />
      </span>
      <span>IntakeOps AI</span>
    </Link>
  );
}
