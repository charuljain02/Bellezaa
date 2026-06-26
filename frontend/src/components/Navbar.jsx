import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/quiz", label: "Glow Quiz" },
    { to: "/routine", label: "Routine" },
    { to: "/products", label: "Products" },
    { to: "/assistant", label: "AI Assistant" },
  ];

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: scrolled
          ? isMobile ? "12px 16px" : "12px 32px"
          : isMobile ? "16px 16px" : "20px 32px",
        background: scrolled ? "rgba(253,246,240,0.92)" : "rgba(253,246,240,0.6)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid rgba(234,168,154,0.3)" : "1px solid transparent",
        transition: "all 0.4s ease",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}
    >
      {/* Logo */}
      <Link to="/" style={{ textDecoration: "none" }}>
        <motion.div whileHover={{ scale: 1.02 }}>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: isMobile ? 24 : 30,
            fontWeight: 800,
            background: "linear-gradient(135deg, #e8876e, #C4705F)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "1px",
          }}>
            Bellezaa
          </span>
        </motion.div>
      </Link>

      {/* Desktop Nav Links */}
      {!isMobile && (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                textDecoration: "none", padding: "8px 16px", borderRadius: "50px",
                fontSize: 14, fontWeight: isActive(link.to) ? 600 : 400,
                color: isActive(link.to) ? "#D4857A" : "#6B3D35",
                background: isActive(link.to) ? "rgba(212,133,122,0.12)" : "transparent",
                transition: "all 0.2s ease", fontFamily: "'DM Sans', sans-serif",
              }}
              onMouseEnter={e => {
                if (!isActive(link.to)) {
                  e.target.style.background = "rgba(234,168,154,0.1)";
                  e.target.style.color = "#D4857A";
                }
              }}
              onMouseLeave={e => {
                if (!isActive(link.to)) {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#6B3D35";
                }
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      {/* Right Side */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {user ? (
          <>
            <Link to="/profile" style={{ textDecoration: "none" }}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                style={{
                  width: 38, height: 38, borderRadius: "50%",
                  background: "linear-gradient(135deg, #EAA89A, #D4857A)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "white", fontWeight: 600, fontSize: 14,
                  fontFamily: "'DM Sans', sans-serif", cursor: "pointer",
                }}
              >
                {user?.name?.[0]?.toUpperCase() || "U"}
              </motion.div>
            </Link>

            {/* Hide logout on mobile - it's in the menu */}
            {!isMobile && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={logout}
                style={{
                  padding: "8px 20px", borderRadius: "50px",
                  border: "1.5px solid rgba(212,133,122,0.4)",
                  background: "transparent", color: "#D4857A",
                  fontSize: 13, fontWeight: 500, cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s ease",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(212,133,122,0.08)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                Logout
              </motion.button>
            )}
          </>
        ) : (
          !isMobile && (
            <>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <button style={{
                  padding: "8px 20px", borderRadius: "50px",
                  border: "none", background: "transparent",
                  color: "#6B3D35", fontSize: 14, fontWeight: 500,
                  cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                }}>
                  Login
                </button>
              </Link>
              <Link to="/register" style={{ textDecoration: "none" }}>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    padding: "9px 22px", fontSize: 14, fontWeight: 600,
                    borderRadius: 50, border: "none", cursor: "pointer",
                    background: "linear-gradient(135deg, #EAA89A, #D4857A)",
                    color: "white", fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  Get Started
                </motion.button>
              </Link>
            </>
          )
        )}

        {/* Hamburger - mobile only */}
        {isMobile && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: menuOpen ? "rgba(212,133,122,0.1)" : "none",
              border: "1px solid rgba(212,133,122,0.3)",
              borderRadius: 10, cursor: "pointer",
              padding: "6px 10px", color: "#6B3D35", fontSize: 18,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            {menuOpen ? "✕" : "☰"}
          </motion.button>
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute", top: "100%", left: 0, right: 0,
              background: "rgba(253,246,240,0.98)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(234,168,154,0.3)",
              padding: "12px 16px 20px",
              display: "flex", flexDirection: "column", gap: "4px",
              boxShadow: "0 8px 24px rgba(212,133,122,0.1)",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  textDecoration: "none", padding: "13px 16px",
                  borderRadius: 12, fontSize: 15, fontWeight: 500,
                  color: isActive(link.to) ? "#D4857A" : "#6B3D35",
                  background: isActive(link.to) ? "rgba(212,133,122,0.1)" : "transparent",
                  fontFamily: "'DM Sans', sans-serif",
                  borderBottom: "1px solid rgba(234,168,154,0.08)",
                }}
              >
                {link.label}
              </Link>
            ))}

            {/* Auth in mobile menu */}
            <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid rgba(234,168,154,0.2)", display: "flex", gap: 10 }}>
              {user ? (
                <button
                  onClick={logout}
                  style={{
                    flex: 1, padding: "12px", borderRadius: 12,
                    border: "1.5px solid rgba(212,133,122,0.4)",
                    background: "transparent", color: "#D4857A",
                    fontSize: 14, fontWeight: 500, cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login" style={{ textDecoration: "none", flex: 1 }}>
                    <button style={{
                      width: "100%", padding: "12px", borderRadius: 12,
                      border: "1.5px solid rgba(212,133,122,0.3)",
                      background: "transparent", color: "#6B3D35",
                      fontSize: 14, fontWeight: 500, cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                    }}>
                      Login
                    </button>
                  </Link>
                  <Link to="/register" style={{ textDecoration: "none", flex: 1 }}>
                    <button style={{
                      width: "100%", padding: "12px", borderRadius: 12,
                      border: "none", cursor: "pointer",
                      background: "linear-gradient(135deg, #EAA89A, #D4857A)",
                      color: "white", fontSize: 14, fontWeight: 600,
                      fontFamily: "'DM Sans', sans-serif",
                    }}>
                      Get Started
                    </button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;