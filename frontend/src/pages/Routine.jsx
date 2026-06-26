import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

import { 
  LuSparkles, 
  LuDroplets, 
  LuSun, 
  LuMoon, 
  LuFlame, 
  LuScale, 
  LuShieldAlert, 
  LuSmile,
  LuRefreshCw
} from "react-icons/lu";

const skinTypes = [
  { value: "oily", label: "Oily", icon: <LuDroplets size={16} /> },
  { value: "dry", label: "Dry", icon: <LuFlame size={16} /> }, 
  { value: "combination", label: "Combination", icon: <LuScale size={16} /> },
  { value: "sensitive", label: "Sensitive", icon: <LuShieldAlert size={16} /> },
  { value: "normal", label: "Normal", icon: <LuSmile size={16} /> },
];

const concerns = [
  "Acne", "Dryness", "Pigmentation", "Anti-aging", "Dullness", "Pores", "Sensitivity"
];

// Responsive Skeleton Component
const RoutineSkeleton = () => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, width: "100%" }}>
    {[1, 2].map((card) => (
      <div key={card} style={{ background: "rgba(255,255,255,0.5)", border: "1px dashed rgba(234,168,154,0.4)", borderRadius: 24, padding: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <div style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: "rgba(234,168,154,0.15)" }} />
          <div style={{ height: 20, width: 140, backgroundColor: "rgba(234,168,154,0.15)", borderRadius: 4 }} />
        </div>
        {[1, 2, 3].map((step) => (
          <div key={step} style={{ display: "flex", gap: 16, padding: "16px 0", borderBottom: "1px solid rgba(234,168,154,0.08)" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: "rgba(234,168,154,0.1)", flexShrink: 0 }} />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, paddingTop: 6 }}>
              <div style={{ height: 12, width: "90%", backgroundColor: "rgba(234,168,154,0.1)", borderRadius: 4 }} />
              <div style={{ height: 12, width: "60%", backgroundColor: "rgba(234,168,154,0.05)", borderRadius: 4 }} />
            </div>
          </div>
        ))}
      </div>
    ))}
  </div>
);

const Routine = () => {
  const { user } = useAuth();
  const [skinType, setSkinType] = useState("");
  const [concern, setConcern] = useState("");
  const [routine, setRoutine] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Responsive Device State
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!skinType || !concern) return;

    setLoading(true);
    setError("");
    setRoutine(null);

    try {
      const res = await api.post(
        "/routine/generate",
        { skinType, concern },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setRoutine(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to construct matrix. Please verify network access parameters.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSkinType("");
    setConcern("");
    setRoutine(null);
    setError("");
  };

  const RoutineStep = ({ item, index, delay }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      style={{
        display: "flex", alignItems: "flex-start", gap: 14,
        padding: "16px 0",
        borderBottom: "1px solid rgba(234,168,154,0.12)",
      }}
    >
      <div style={{
        width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
        background: "linear-gradient(135deg, #EAA89A, #D4857A)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "white", fontSize: 11, fontWeight: 600,
        fontFamily: "'DM Sans', sans-serif",
        boxShadow: "0 4px 10px rgba(212,133,122,0.2)",
        marginTop: 2
      }}>
        {index + 1}
      </div>
      <div style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 14,
        color: "#2C1810", lineHeight: 1.5,
        fontWeight: 400
      }}>
        {item}
      </div>
    </motion.div>
  );

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #FDF6F0 0%, #FAE8E0 50%, #F5D5C8 100%)",
      paddingTop: isMobile ? 80 : 120, 
      paddingBottom: isMobile ? 40 : 80, 
      paddingLeft: isMobile ? 16 : 24, 
      paddingRight: isMobile ? 16 : 24,
      boxSizing: "border-box"
    }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        
        {/* Elegant Header Block */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: isMobile ? 32 : 44 }}
        >
          <div style={{ 
            fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, 
            letterSpacing: 1.5, textTransform: "uppercase", color: "#D4857A", marginBottom: 10 
          }}>
            Dermal Formulation Matrix
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: isMobile ? 30 : 38, fontWeight: 700, color: "#2C1810", margin: "0 0 12px",
          }}>
            Routine Builder
          </h1>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 14 : 15,
            color: "#8B5E52", margin: 0, fontWeight: 300, lineHeight: 1.5
          }}>
            Deploy diagnostic parameters to cultivate your synchronized AM & PM cellular regimens.
          </p>
        </motion.div>

        {/* Input Configuration Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            background: "rgba(255,255,255,0.7)", backdropFilter: "blur(25px)",
            border: "1px solid rgba(234,168,154,0.3)", borderRadius: 28,
            padding: isMobile ? "24px 20px" : "40px 36px", marginBottom: 36,
            boxShadow: "0 24px 48px rgba(212,133,122,0.04)",
            boxSizing: "border-box"
          }}
        >
          <form onSubmit={handleSubmit}>
            {/* Skin Type Row */}
            <div style={{ marginBottom: 28 }}>
              <label style={{
                display: "block", marginBottom: 14,
                fontSize: 12, fontWeight: 600, color: "#6B3D35",
                fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", letterSpacing: 0.5
              }}>
                1. Select Phenotype Baseline
              </label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {skinTypes.map((s) => {
                  const isActive = skinType === s.value;
                  return (
                    <motion.button
                      key={s.value} type="button"
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      onClick={() => setSkinType(s.value)}
                      style={{
                        padding: isMobile ? "8px 16px" : "10px 22px", 
                        fontSize: isMobile ? 12.5 : 13.5,
                        fontWeight: 500, cursor: "pointer",
                        fontFamily: "'DM Sans', sans-serif", display: "inline-flex", alignItems: "center", gap: 6,
                        border: isActive ? "2px solid #D4857A" : "1.5px solid rgba(234,168,154,0.35)",
                        background: isActive ? "rgba(212,133,122,0.12)" : "rgba(255,255,255,0.6)",
                        color: isActive ? "#D4857A" : "#6B3D35",
                        boxShadow: isActive ? "0 4px 12px rgba(212,133,122,0.15)" : "none",
                        borderRadius: 50,
                        transition: "all 0.2s ease",
                      }}
                    >
                      <span style={{ color: isActive ? "#D4857A" : "#8B5E52", display: "inline-flex" }}>{s.icon}</span>
                      {s.label}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Concern Grid Selection */}
            <div style={{ marginBottom: 36 }}>
              <label style={{
                display: "block", marginBottom: 14,
                fontSize: 12, fontWeight: 600, color: "#6B3D35",
                fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", letterSpacing: 0.5
              }}>
                2. Primary Dermal Target
              </label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {concerns.map((c) => {
                  const isActive = concern === c.toLowerCase();
                  return (
                    <motion.button
                      key={c} type="button"
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      onClick={() => setConcern(c.toLowerCase())}
                      style={{
                        padding: isMobile ? "8px 14px" : "9px 18px", 
                        fontSize: isMobile ? 12 : 13,
                        fontWeight: 500, cursor: "pointer",
                        fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s ease",
                        border: isActive ? "2px solid #D4857A" : "1.5px solid rgba(234,168,154,0.25)",
                        background: isActive ? "rgba(212,133,122,0.12)" : "rgba(255,255,255,0.4)",
                        color: isActive ? "#D4857A" : "#6B3D35",
                        borderRadius: 50,
                      }}
                    >
                      {c}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Action Row */}
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <motion.button
                whileHover={{ scale: (!skinType || !concern || loading) ? 1 : 1.01 }}
                whileTap={{ scale: (!skinType || !concern || loading) ? 1 : 0.99 }}
                type="submit"
                disabled={!skinType || !concern || loading}
                style={{
                  flex: 1, padding: "14px 16px", fontSize: 14, fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif", borderRadius: 50, border: "none",
                  color: "white", cursor: (!skinType || !concern || loading) ? "not-allowed" : "pointer",
                  background: (!skinType || !concern) ? "#E5D1C9" : "linear-gradient(135deg, #EAA89A 0%, #D4857A 100%)",
                  boxShadow: (!skinType || !concern) ? "none" : "0 8px 24px rgba(212,133,122,0.2)",
                  transition: "all 0.2s ease", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8
                }}
              >
                <LuSparkles size={16} />
                {loading ? "Synthesizing Elements..." : "Generate Custom Routine"}
              </motion.button>

              {(skinType || concern || routine) && (
                <motion.button
                  whileHover={{ scale: 1.02, background: "rgba(234,168,154,0.1)" }} whileTap={{ scale: 0.98 }}
                  onClick={handleClear} type="button"
                  style={{
                    width: 46, height: 46, borderRadius: "50%", border: "1px solid rgba(234,168,154,0.4)",
                    background: "white", color: "#6B3D35", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                  }}
                  title="Reset System Matrix"
                >
                  <LuRefreshCw size={16} />
                </motion.button>
              )}
            </div>
          </form>
        </motion.div>

        {/* Runtime System Feedback Boundaries */}
        {error && (
          <div style={{ padding: "14px 20px", background: "rgba(234,107,107,0.1)", border: "1px solid rgba(234,107,107,0.2)", borderRadius: 16, color: "#A23B3B", fontFamily: "'DM Sans', sans-serif", fontSize: 14, marginBottom: 24, textAlign: "center" }}>
            {error}
          </div>
        )}

        {/* Routine Result Processing/Layout Container */}
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div key="skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <RoutineSkeleton />
            </motion.div>
          )}

          {routine && !loading && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{ 
                display: "grid", 
                gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(320px, 1fr))", 
                gap: 24 
              }}
            >
              {/* Daytime Sequence Module */}
              <div style={{
                background: "rgba(255,255,255,0.75)", backdropFilter: "blur(20px)",
                border: "1px solid rgba(234,168,154,0.25)", borderRadius: 24, padding: isMobile ? "28px 20px" : "36px 30px",
                boxShadow: "0 16px 36px rgba(212,133,122,0.03)",
                boxSizing: "border-box"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20, borderBottom: "1px solid rgba(234,168,154,0.15)", paddingBottom: 16 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 12,
                    background: "linear-gradient(135deg, rgba(242,196,160,0.3), rgba(234,168,154,0.3))",
                    display: "flex", alignItems: "center", justifyContent: "center", color: "#D4857A"
                  }}>
                    <LuSun size={20} />
                  </div>
                  <div>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 19, fontWeight: 600, color: "#2C1810", margin: 0 }}>
                      Morning Regimen
                    </h2>
                    <span style={{ fontSize: 11, color: "#8B5E52", fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", letterSpacing: 0.5 }}>Protect & Hydrate</span>
                  </div>
                </div>
                {routine.morningRoutine && routine.morningRoutine.length > 0 ? (
                  routine.morningRoutine.map((item, i) => (
                    <RoutineStep key={i} item={item} index={i} delay={i * 0.08} />
                  ))
                ) : (
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#8B5E52" }}>No AM sequence returned for this phenotype.</p>
                )}
              </div>

              {/* Nighttime Sequence Module */}
              <div style={{
                background: "rgba(255,255,255,0.75)", backdropFilter: "blur(20px)",
                border: "1px solid rgba(234,168,154,0.25)", borderRadius: 24, padding: isMobile ? "28px 20px" : "36px 30px",
                boxShadow: "0 16px 36px rgba(212,133,122,0.03)",
                boxSizing: "border-box"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20, borderBottom: "1px solid rgba(234,168,154,0.15)", paddingBottom: 16 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 12,
                    background: "linear-gradient(135deg, rgba(139,94,82,0.15), rgba(44,24,16,0.15))",
                    display: "flex", alignItems: "center", justifyContent: "center", color: "#6B3D35"
                  }}>
                    <LuMoon size={18} />
                  </div>
                  <div>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 19, fontWeight: 600, color: "#2C1810", margin: 0 }}>
                      Night Regimen
                    </h2>
                    <span style={{ fontSize: 11, color: "#8B5E52", fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", letterSpacing: 0.5 }}>Recover & Renew</span>
                  </div>
                </div>
                {routine.nightRoutine && routine.nightRoutine.length > 0 ? (
                  routine.nightRoutine.map((item, i) => (
                    <RoutineStep key={i} item={item} index={i} delay={i * 0.08 + 0.2} />
                  ))
                ) : (
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#8B5E52" }}>No PM sequence returned for this phenotype.</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default Routine;