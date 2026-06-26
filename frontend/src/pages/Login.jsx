import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Focus state for structural accent icon transformations
  const [activeField, setActiveField] = useState("");

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Minimal sanity-check validation to stop broken network roundtrips immediately
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data);
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #FDF6F0 0%, #FAE8E0 50%, #F5D5C8 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: isMobile ? "16px" : "24px",
      boxSizing: "border-box",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Structural Decorative Background Elements */}
      {!isMobile && (
        <>
          <div style={{
            position: "fixed", top: "10%", left: "5%",
            width: 350, height: 350, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(234,168,154,0.2) 0%, transparent 70%)",
            filter: "blur(40px)", pointerEvents: "none",
          }} />
          <div style={{
            position: "fixed", bottom: "10%", right: "5%",
            width: 280, height: 280, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(242,196,160,0.25) 0%, transparent 70%)",
            filter: "blur(40px)", pointerEvents: "none",
          }} />
        </>
      )}

      {/* Dynamic Style Scopes for Input Glow Synchronizations */}
      <style>{`
        .input-glow-login {
          width: 100%;
          padding: 14px 16px 14px 42px;
          fontSize: ${isMobile ? "14px" : "15px"};
          font-family: 'DM Sans', sans-serif;
          border: 1.5px solid rgba(234,168,154,0.4);
          border-radius: 14px;
          outline: none;
          background: rgba(255,255,255,0.8);
          color: #2C1810;
          box-shadow: 0 2px 8px rgba(212,133,122,0.06);
          transition: all 0.25s ease;
          box-sizing: border-box;
        }
        .input-glow-login:focus {
          border-color: #D4857A;
          box-shadow: 0 0 0 4px rgba(212,133,122,0.12);
          background: rgba(255,255,255,0.95);
        }
        .input-glow-login::placeholder {
          color: #BCA39C;
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{ width: "100%", maxWidth: 440, position: "relative", zIndex: 1 }}
      >
        <div style={{
          background: "rgba(255,255,255,0.75)", backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(234,168,154,0.3)",
          borderRadius: isMobile ? 24 : 32,
          padding: isMobile ? "32px 20px" : "48px 40px",
          boxShadow: "0 24px 64px rgba(212,133,122,0.1)",
        }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: isMobile ? 24 : 36 }}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{
                width: isMobile ? 52 : 64, height: isMobile ? 52 : 64,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #EAA89A, #D4857A)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: isMobile ? 22 : 28, margin: "0 auto 16px",
                boxShadow: "0 8px 20px rgba(212,133,122,0.2)"
              }}
            >
              🌸
            </motion.div>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: isMobile ? 26 : 32,
              fontWeight: 700, color: "#2C1810", margin: "0 0 8px",
            }}>
              Welcome back
            </h1>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: isMobile ? 13 : 15, color: "#8B5E52", margin: 0,
            }}>
              Sign in to continue your glow journey
            </p>
          </div>

          {/* Error Message Frame */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: "rgba(212,133,122,0.1)",
                border: "1px solid rgba(212,133,122,0.3)",
                borderRadius: 12, padding: "12px 16px",
                color: "#C27B6E", fontSize: 14,
                fontFamily: "'DM Sans', sans-serif",
                marginBottom: 20, textAlign: "center",
              }}
            >
              {error}
            </motion.div>
          )}

          {/* Form UI Wrapper */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>

            {/* Email Field */}
            <div>
              <label style={{
                display: "block", marginBottom: 8,
                fontSize: 12, fontWeight: 600, color: "#6B3D35",
                fontFamily: "'DM Sans', sans-serif",
                textTransform: "uppercase", letterSpacing: 0.8,
              }}>
                Email address
              </label>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <span style={{
                  position: "absolute", left: 14,
                  display: "flex", alignItems: "center",
                  pointerEvents: "none", 
                  color: activeField === "email" ? "#D4857A" : "#A0705E",
                  opacity: activeField === "email" ? 1 : 0.75,
                  transition: "all 0.2s ease"
                }}>
                  <Mail size={16} />
                </span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setActiveField("email")}
                  onBlur={() => setActiveField("")}
                  required
                  className="input-glow-login"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label style={{
                display: "block", marginBottom: 8,
                fontSize: 12, fontWeight: 600, color: "#6B3D35",
                fontFamily: "'DM Sans', sans-serif",
                textTransform: "uppercase", letterSpacing: 0.8,
              }}>
                Password
              </label>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <span style={{
                  position: "absolute", left: 14,
                  display: "flex", alignItems: "center",
                  pointerEvents: "none", 
                  color: activeField === "password" ? "#D4857A" : "#A0705E",
                  opacity: activeField === "password" ? 1 : 0.75,
                  transition: "all 0.2s ease"
                }}>
                  <Lock size={16} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setActiveField("password")}
                  onBlur={() => setActiveField("")}
                  required
                  className="input-glow-login"
                  style={{ paddingRight: 48 }}
                />
                
                {/* Reveal Toggler */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute", right: 12,
                    width: 32, height: 32, borderRadius: 8,
                    background: showPassword ? "rgba(212,133,122,0.15)" : "rgba(234,168,154,0.08)",
                    border: "1px solid rgba(212,133,122,0.2)",
                    cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: showPassword ? "#D4857A" : "#A0705E", transition: "all 0.2s ease",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "rgba(212,133,122,0.2)";
                    e.currentTarget.style.borderColor = "rgba(212,133,122,0.4)";
                    e.currentTarget.style.color = "#D4857A";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = showPassword ? "rgba(212,133,122,0.15)" : "rgba(234,168,154,0.08)";
                    e.currentTarget.style.borderColor = "rgba(212,133,122,0.2)";
                    e.currentTarget.style.color = showPassword ? "#D4857A" : "#A0705E";
                  }}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Sign In Trigger Action */}
            <motion.button
              whileHover={{ scale: loading ? 1 : 1.02, boxShadow: loading ? "none" : "0 12px 32px rgba(212,133,122,0.45)" }}
              whileTap={{ scale: loading ? 1 : 0.97 }}
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: isMobile ? "14px" : "16px",
                fontSize: isMobile ? 14 : 16,
                fontWeight: 700,
                fontFamily: "'DM Sans', sans-serif",
                marginTop: 4, border: "none", borderRadius: 50,
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.8 : 1,
                background: loading
                  ? "rgba(234,168,154,0.5)"
                  : "linear-gradient(135deg, #f0b5a5 0%, #EAA89A 30%, #D4857A 70%, #c4705f 100%)",
                color: "white", letterSpacing: "0.5px",
                boxShadow: loading ? "none" : "0 6px 20px rgba(212,133,122,0.35)",
                transition: "all 0.3s ease",
                position: "relative", overflow: "hidden",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}
            >
              {!loading && (
                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
                  style={{
                    position: "absolute", top: 0, left: 0,
                    width: "40%", height: "100%",
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
                    pointerEvents: "none",
                  }}
                />
              )}
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    style={{
                      width: 16, height: 16, borderRadius: "50%",
                      border: "2px solid rgba(255,255,255,0.4)",
                      borderTop: "2px solid white", flexShrink: 0,
                    }}
                  />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </motion.button>
          </form>

          {/* Footer Router Direction Link */}
          <p style={{
            textAlign: "center", marginTop: isMobile ? 18 : 24,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: isMobile ? 13 : 14, color: "#8B5E52",
          }}>
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{ color: "#D4857A", fontWeight: 600, textDecoration: "none" }}
              onMouseEnter={e => {
                e.target.style.textDecoration = "underline";
                e.target.style.color = "#c4705f";
              }}
              onMouseLeave={e => {
                e.target.style.textDecoration = "none";
                e.target.style.color = "#D4857A";
              }}
            >
              Create one →
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;