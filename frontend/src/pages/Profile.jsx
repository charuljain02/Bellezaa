import { SiRobotframework } from "react-icons/si";
import { GiMirrorMirror, GiBeachBag } from "react-icons/gi";
import { MdQuiz } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, logout } = useAuth();

  const quickLinks = [
    { 
      icon: <MdQuiz size={26} style={{ color: "#D4857A" }} />, 
      label: "Take Glow Quiz", 
      to: "/quiz", 
      desc: "Check your glow score" 
    },
    
    { 
      icon: <GiMirrorMirror size={26} style={{ color: "#D4857A" }} />, 
      label: "Build Routine", 
      to: "/routine", 
      desc: "Your skincare plan" 
    },

    { 
      icon: <GiBeachBag size={26} style={{ color: "#D4857A" }} />, 
      label: "Find Products", 
      to: "/products", 
      desc: "Curated for you" 
    },
    { 
      icon: <SiRobotframework size={26} style={{ color: "#D4857A" }} />, 
      label: "AI Assistant", 
      to: "/assistant", 
      desc: "Ask anything" 
    },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #FDF6F0 0%, #FAE8E0 50%, #F5D5C8 100%)",
      paddingBottom: 60,
    }}>

      {/* ── HERO SECTION ── */}
      <div style={{
        position: "relative",
        width: "100%",
        height: 620,
        background: "linear-gradient(135deg, #F2C4A0 0%, #EAA89A 40%, #D4857A 100%)",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>

        {/* Right top background image */}
        <img
          src="/front.png"
          alt=""
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            height: "100%",
            width: "auto",
            objectFit: "cover",
            objectPosition: "top",
            opacity: 0.85,
            pointerEvents: "none",
            zIndex: 1,
            maskImage: "linear-gradient(to left, rgba(0,0,0,1) 50%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,1) 50%, transparent 100%)",
          }}
        />

        {/* Soft inner glow overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 50% 60%, rgba(255,255,255,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Left image */}
        <motion.img
          src="/assets/front.png"
          alt=""
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 0.82, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: "100%",
            width: "auto",
            maxWidth: "38%",
            objectFit: "cover",
            objectPosition: "top",
            pointerEvents: "none",
            maskImage: "linear-gradient(to right, rgba(0,0,0,0.9) 60%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,0.9) 60%, transparent 100%)",
          }}
        />

        {/* Right image */}
        <motion.img
          src="/assets/front2.png"
          alt=""
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 0.82, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            height: "100%",
            width: "auto",
            maxWidth: "38%",
            objectFit: "cover",
            objectPosition: "top",
            pointerEvents: "none",
            maskImage: "linear-gradient(to left, rgba(0,0,0,0.9) 60%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,0.9) 60%, transparent 100%)",
          }}
        />

        {/* Center hero text */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            position: "relative", zIndex: 2,
            textAlign: "center", padding: "0 24px",
          }}
        >
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            style={{
              width: 80, height: 80, borderRadius: "50%",
              background: "rgba(255,255,255,0.25)",
              border: "3px solid rgba(255,255,255,0.6)",
              backdropFilter: "blur(12px)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 32, fontWeight: 700, color: "white",
              fontFamily: "'Playfair Display', serif",
              margin: "0 auto 14px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            }}
          >
            {user?.name?.[0]?.toUpperCase() || "U"}
          </motion.div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(22px, 4vw, 32px)",
            fontWeight: 700, color: "white",
            margin: "0 0 6px",
            textShadow: "0 2px 12px rgba(0,0,0,0.12)",
          }}>
            Welcome back, {user?.name?.split(" ")[0]} 🌸
          </h1>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15, color: "rgba(255,255,255,0.88)",
            margin: 0, fontWeight: 300,
          }}>
            Your glow journey continues here
          </p>
        </motion.div>

        {/* Bottom fade to page background */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 60,
          background: "linear-gradient(to bottom, transparent, #FAE8E0)",
          pointerEvents: "none",
        }} />
      </div>

      {/* ── PAGE CONTENT ── */}
      <div style={{
        maxWidth: 720, margin: "0 auto",
        padding: "32px 24px 0",
        position: "relative", zIndex: 2,
      }}>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            background: "rgba(255,255,255,0.78)", backdropFilter: "blur(20px)",
            border: "1px solid rgba(234,168,154,0.3)", borderRadius: 28,
            padding: "36px 32px", marginBottom: 24,
            boxShadow: "0 20px 60px rgba(212,133,122,0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: 11, color: "#A0705E", fontFamily: "'DM Sans', sans-serif",
                textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 6
              }}>
                Your Profile
              </div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 24, fontWeight: 700, color: "#2C1810",
                margin: "0 0 4px",
              }}>
                {user?.name}
              </h2>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14, color: "#8B5E52", margin: 0,
              }}>
                {user?.email}
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.03, backgroundColor: "rgba(234,168,154,0.15)" }}
              whileTap={{ scale: 0.97 }}
              onClick={logout}
              style={{
                padding: "10px 24px", fontSize: 14,
                borderRadius: "50px",
                border: "1px solid rgba(234,168,154,0.5)",
                background: "transparent", color: "#6B3D35",
                fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
                cursor: "pointer", transition: "all 0.2s ease",
              }}
            >
              Sign out
            </motion.button>
          </div>

          {/* Divider */}
          <div style={{
            margin: "28px 0", height: 1,
            background: "linear-gradient(90deg, transparent, rgba(234,168,154,0.4), transparent)",
          }} />

          <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
            {[
              { label: "Member since", value: "June 2025" },
              { label: "Glow score", value: "—" },
              { label: "Routines saved", value: "0" },
            ].map((item, i) => (
              <div key={i}>
                <div style={{
                  fontSize: 11, color: "#A0705E", fontFamily: "'DM Sans', sans-serif",
                  textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 4,
                }}>
                  {item.label}
                </div>
                <div style={{
                  fontSize: 22, fontWeight: 700, color: "#2C1810",
                  fontFamily: "'Playfair Display', serif",
                }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 22, fontWeight: 600, color: "#2C1810",
            margin: "0 0 16px",
          }}>
            Quick access
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 16,
          }}>
            {quickLinks.map((link, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                whileHover={{ y: -4 }}
              >
                <Link to={link.to} style={{ textDecoration: "none" }}>
                  <div
                    style={{
                      background: "rgba(255,255,255,0.7)", backdropFilter: "blur(16px)",
                      border: "1px solid rgba(234,168,154,0.25)", borderRadius: 20,
                      padding: "24px 20px", textAlign: "center",
                      transition: "all 0.3s ease", cursor: "pointer",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.border = "1px solid rgba(212,133,122,0.5)";
                      e.currentTarget.style.boxShadow = "0 12px 32px rgba(212,133,122,0.15)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.border = "1px solid rgba(234,168,154,0.25)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div style={{ marginBottom: 10, display: "flex", justifyContent: "center" }}>
                      {link.icon}
                    </div>
                    <div style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 14, fontWeight: 600, color: "#2C1810", marginBottom: 4,
                    }}>
                      {link.label}
                    </div>
                    <div style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 12, color: "#A0705E",
                    }}>
                      {link.desc}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;