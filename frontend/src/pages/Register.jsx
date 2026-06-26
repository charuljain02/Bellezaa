import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../services/api";

// Import Premium Lucide Icons
import { LuSparkles, LuUser, LuMail, LuLock, LuEye, LuEyeOff, LuLoader, LuCheck, LuCircle } from "react-icons/lu";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Focus states to dynamically transition structural accent icons
  const [activeField, setActiveField] = useState("");

  // Track password requirement states in real-time
  const constraints = {
    hasMinLength: password.length >= 6,
    hasUppercase: /[A-Z]/.test(password),
    hasNumberOrSpecial: /[\d\W]/.test(password),
  };

  const isPasswordValid = Object.values(constraints).every(Boolean);

  // Responsive dynamic listener
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 576);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Prevent submission if constraints are bypass-attempted
    if (!isPasswordValid) {
      setError("Please fulfill all password security requirements.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/register", { name, email, password });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
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
      {/* Dynamic Style Scopes for Premium Input Interactions */}
      <style>{`
        .input-glow {
          width: 100%;
          padding: 14px 16px 14px 46px;
          border: 1.5px solid rgba(234,168,154,0.3);
          border-radius: 16px;
          background: rgba(255,255,255,0.55);
          font-family: 'DM Sans', sans-serif;
          font-size: 14.5px;
          color: #2C1810;
          outline: none;
          box-sizing: border-box;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .input-glow:focus {
          border-color: #EAA89A;
          background: rgba(255,255,255,0.95);
          box-shadow: 0 0 0 4px rgba(234,168,154,0.18), 0 4px 12px rgba(212,133,122,0.06);
        }
        .input-glow::placeholder {
          color: #BCA39C;
          transition: color 0.2s ease;
        }
        .input-glow:focus::placeholder {
          color: #D3BEB8;
        }
        .btn-primary {
          width: 100%;
          padding: 15px;
          font-size: 15px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          color: white;
          background: linear-gradient(135deg, #EAA89A, #D4857A);
          border: none;
          border-radius: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 8px 24px rgba(212,133,122,0.25);
          transition: all 0.2s ease;
        }
        .btn-primary:hover:not(:disabled) {
          box-shadow: 0 12px 28px rgba(212,133,122,0.35);
        }
        .btn-primary:disabled {
          background: #D8C3BD;
          box-shadow: none;
          cursor: not-allowed;
          opacity: 0.7;
        }
      `}</style>

      {/* Background Glow Orb */}
      <div style={{
        position: "absolute", top: "15%", right: "8%",
        width: isMobile ? 200 : 350, height: isMobile ? 200 : 350, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(234,168,154,0.25) 0%, transparent 70%)",
        filter: "blur(40px)", pointerEvents: "none",
        zIndex: 0
      }} />

      <motion.div
        initial={{ opacity: 0, y: isMobile ? 20 : 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ width: "100%", maxWidth: 440, position: "relative", zIndex: 1 }}
      >
        <div style={{
          background: "rgba(255,255,255,0.75)", backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(234,168,154,0.3)", borderRadius: isMobile ? 24 : 32,
          padding: isMobile ? "32px 24px" : "48px 40px",
          boxShadow: "0 24px 64px rgba(212,133,122,0.1)",
          boxSizing: "border-box"
        }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: isMobile ? 28 : 36 }}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15 }}
              style={{
                width: 56, height: 56, borderRadius: "50%",
                background: "linear-gradient(135deg, #EAA89A, #D4857A)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 16px", color: "white",
                boxShadow: "0 8px 20px rgba(212,133,122,0.25)"
              }}
            >
              <LuSparkles size={24} />
            </motion.div>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: isMobile ? 28 : 32, fontWeight: 700, color: "#2C1810", margin: "0 0 8px",
            }}>
              Start glowing
            </h1>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: isMobile ? 14 : 15, color: "#8B5E52", margin: 0,
            }}>
              Create your free Bellezaa account
            </p>
          </div>

          {/* Error Message Box */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: "rgba(212,133,122,0.08)",
                border: "1px solid rgba(212,133,122,0.25)",
                borderRadius: 12, padding: "12px 16px",
                color: "#C27B6E", fontSize: 13.5,
                fontFamily: "'DM Sans', sans-serif",
                marginBottom: 20, textAlign: "center",
                fontWeight: 500
              }}
            >
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Full Name Input */}
            <div>
              <label style={{
                display: "block", marginBottom: 6,
                fontSize: 13, fontWeight: 500, color: "#6B3D35",
                fontFamily: "'DM Sans', sans-serif",
              }}>
                Full name
              </label>
              <div style={{ position: "relative" }}>
                <span style={{ 
                  position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", 
                  color: activeField === "name" ? "#D4857A" : "#A0705E", 
                  opacity: activeField === "name" ? 1 : 0.7,
                  display: "flex", transition: "all 0.25s ease", pointerEvents: "none"
                }}>
                  <LuUser size={19} />
                </span>
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setActiveField("name")}
                  onBlur={() => setActiveField("")}
                  required
                  className="input-glow"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label style={{
                display: "block", marginBottom: 6,
                fontSize: 13, fontWeight: 500, color: "#6B3D35",
                fontFamily: "'DM Sans', sans-serif",
              }}>
                Email address
              </label>
              <div style={{ position: "relative" }}>
                <span style={{ 
                  position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", 
                  color: activeField === "email" ? "#D4857A" : "#A0705E", 
                  opacity: activeField === "email" ? 1 : 0.7,
                  display: "flex", transition: "all 0.25s ease", pointerEvents: "none"
                }}>
                  <LuMail size={19} />
                </span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setActiveField("email")}
                  onBlur={() => setActiveField("")}
                  required
                  className="input-glow"
                />
              </div>
            </div>

            {/* Password Input Context */}
            <div>
              <label style={{
                display: "block", marginBottom: 6,
                fontSize: 13, fontWeight: 500, color: "#6B3D35",
                fontFamily: "'DM Sans', sans-serif",
              }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <span style={{ 
                  position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", 
                  color: activeField === "password" ? "#D4857A" : "#A0705E", 
                  opacity: activeField === "password" ? 1 : 0.7,
                  display: "flex", transition: "all 0.25s ease", pointerEvents: "none"
                }}>
                  <LuLock size={19} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setActiveField("password")}
                  onBlur={() => setActiveField("")}
                  required
                  className="input-glow"
                  style={{ paddingRight: 46 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute", right: 14, top: "50%",
                    transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", padding: "4px",
                    color: showPassword ? "#D4857A" : "#A0705E", 
                    opacity: 0.8, transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = 0.8}
                >
                  {showPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
                </button>
              </div>

              {/* Luxury Real-time Password Checklist Container */}
              <AnimatePresence>
                {password.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ overflow: "hidden", marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}
                  >
                    {[
                      { validated: constraints.hasMinLength, label: "Minimum 6 characters" },
                      { validated: constraints.hasUppercase, label: "At least one uppercase letter" },
                      { validated: constraints.hasNumberOrSpecial, label: "At least one number or special symbol" }
                    ].map((item, index) => (
                      <div key={index} style={{
                        display: "flex", alignItems: "center", gap: 8,
                        fontSize: "12.5px", fontFamily: "'DM Sans', sans-serif",
                        color: item.validated ? "#8A5349" : "#A6867E",
                        transition: "color 0.25s ease"
                      }}>
                        <span style={{ display: "inline-flex", color: item.validated ? "#D4857A" : "#C4AFAA", transition: "all 0.25s" }}>
                          {item.validated ? <LuCheck size={14} strokeWidth={3} /> : <LuCircle size={14} />}
                        </span>
                        <span style={{ textDecoration: item.validated ? "line-through opacity 0.5" : "none", transition: "all 0.25s" }}>
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Submit Action Button */}
            <motion.button
              whileHover={{ scale: (loading || !isPasswordValid) ? 1 : 1.015 }}
              whileTap={{ scale: (loading || !isPasswordValid) ? 1 : 0.985 }}
              type="submit"
              disabled={loading || !isPasswordValid}
              className="btn-primary"
              style={{
                marginTop: 8,
                pointerEvents: (loading || !isPasswordValid) ? "none" : "auto"
              }}
            >
              {loading ? (
                <>
                  <motion.span 
                    animate={{ rotate: 360 }} 
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    style={{ display: "flex" }}
                  >
                    <LuLoader size={18} />
                  </motion.span>
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </motion.button>
          </form>

          {/* Footer Navigation Link */}
          <p style={{
            textAlign: "center", marginTop: 24, marginBottom: 0,
            fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#8B5E52",
          }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#D4857A", fontWeight: 600, textDecoration: "none", transition: "opacity 0.2s" }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = 0.8}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = 1}>
              Sign in →
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;