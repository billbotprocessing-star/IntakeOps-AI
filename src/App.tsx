import { Navigate, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import AppLayout from "./pages/app/AppLayout";
import Overview from "./pages/app/Overview";
import Leads from "./pages/app/Leads";
import Tickets from "./pages/app/Tickets";
import MissedCalls from "./pages/app/MissedCalls";
import DemoRequests from "./pages/app/DemoRequests";
import Integrations from "./pages/app/Integrations";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/app" element={<AppLayout />}>
        <Route index element={<Overview />} />
        <Route path="leads" element={<Leads />} />
        <Route path="tickets" element={<Tickets />} />
        <Route path="missed-calls" element={<MissedCalls />} />
        <Route path="demo-requests" element={<DemoRequests />} />
        <Route path="integrations" element={<Integrations />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
