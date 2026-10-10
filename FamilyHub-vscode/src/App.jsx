import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import {
  Button as MuiButton,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";

import { APP_NAME, db, seedDemoData } from "./lib/store";
import {
  Landing,
  Auth,
  Profile,
  Dashboard,
  Caregivers,
  Network,
  Exchange,
  Safety,
  Info,
} from "./pages";

import "./index.css";

const muiTheme = createTheme({
  palette: {
    primary: { main: "#2e7166" },
    secondary: { main: "#356b94" },
    background: { default: "#f7fbfa" },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: "Inter, system-ui, sans-serif",
    button: {
      textTransform: "none",
      fontWeight: 750,
    },
  },
});

export function Button({ children, className = "", ...props }) {
  return (
    <MuiButton variant="contained" className={`btn ${className}`} {...props}>
      {children}
    </MuiButton>
  );
}

export function Card({ children, className = "" }) {
  return <section className={`card ${className}`}>{children}</section>;
}

export function Badge({ children, tone = "blue" }) {
  return <span className={`badge ${tone}`}>{children}</span>;
}

export function Field({ label, error, hidden, ...props }) {
  if (hidden) return null;

  return (
    <label className="field">
      <span>{label}</span>
      <input {...props} />
      {error && <small className="error">{error}</small>}
    </label>
  );
}

export function Modal({ title, children, onClose }) {
  return (
    <div className="scrim" role="dialog" aria-modal="true">
      <div className="modal">
        <button className="close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
}

function Header() {
  const [user, setUser] = useState(db.get("session"));
  const navigate = useNavigate();

  const links = [
    ["/dashboard", "Schedule"],
    ["/caregivers", "Find Care"],
    ["/network", "Network"],
    ["/exchange", "Care Exchange"],
    ["/safety", "Safety"],
    ["/profile", "Profile"],
  ];

  const logout = () => {
    db.set("session", null);
    setUser(null);
    navigate("/");
  };

  return (
    <>
      <header>
        <NavLink to="/" className="brand">
          <img src="/family-circle-12.svg" alt="FamilyHub logo" />
          <span>{APP_NAME}</span>
        </NavLink>

        <nav>
          {user &&
            links.map(([to, label]) => (
              <NavLink key={to} to={to}>
                {label}
              </NavLink>
            ))}

          <NavLink to="/about">About</NavLink>
          <NavLink to="/settings">Settings</NavLink>
        </nav>

        <div>
          {user ? (
            <>
              <span className="hello">Hi, {user.name.split(" ")[0]}</span>
              <Button className="quiet" onClick={logout}>
                Log out
              </Button>
            </>
          ) : (
            <NavLink className="login" to="/auth">
              Log in
            </NavLink>
          )}
        </div>
      </header>

      {user && (
        <nav className="mobile-tabs">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to}>
              {label}
            </NavLink>
          ))}
        </nav>
      )}
    </>
  );
}

function Layout({ children }) {
  return (
    <>
      <Header />

      <main>{children}</main>

      <footer>
        © 2026 {APP_NAME} · <NavLink to="/faq">FAQ</NavLink> ·{" "}
        <NavLink to="/contact">Contact</NavLink> ·{" "}
        <NavLink to="/safety">Safety</NavLink>
      </footer>
    </>
  );
}

function Required({ children }) {
  return db.get("session") ? children : <Navigate to="/auth" />;
}

export default function App() {
  seedDemoData();

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />

      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />

            <Route
              path="/dashboard"
              element={
                <Required>
                  <Dashboard />
                </Required>
              }
            />

            <Route
              path="/caregivers"
              element={
                <Required>
                  <Caregivers />
                </Required>
              }
            />

            <Route
              path="/network"
              element={
                <Required>
                  <Network />
                </Required>
              }
            />

            <Route
              path="/exchange"
              element={
                <Required>
                  <Exchange />
                </Required>
              }
            />

            <Route path="/safety" element={<Safety />} />
            <Route path="/:page" element={<Info />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}