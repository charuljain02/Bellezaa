import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuBedDouble, LuSparkles } from "react-icons/lu";
import { FiDroplet, FiAward } from "react-icons/fi";
import { FaRegSmileBeam, FaSun } from "react-icons/fa";
import { BiRun } from "react-icons/bi";
import { IoChevronBackOutline, IoCheckmarkCircleOutline } from "react-icons/io5";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const questions = [
  { name: "sleepHours", label: "How many hours do you sleep?", placeholder: "e.g. 7", type: "number", icon: <LuBedDouble size={24} color="#D4857A" />, tip: "7–9 hours is ideal for skin cell regeneration." },
  { name: "waterIntake", label: "Water intake (glasses/day)", placeholder: "e.g. 8", type: "number", icon: <FiDroplet size={24} color="#4A90E2" />, tip: "Deep cellular hydration keeps skin plump and elastic." },
  { name: "stressLevel", label: "Stress level (1–10)", placeholder: "e.g. 5", type: "number", icon: <FaRegSmileBeam size={24} color="#EAA89A" />, tip: "Elevated cortisol levels can trigger inflammation and breakouts." },
  { name: "workoutFrequency", label: "Workouts per week", placeholder: "e.g. 3", type: "number", icon: <BiRun size={24} color="#8B5E52" />, tip: "Exercise boosts blood flow, bringing oxygen right to your skin." },
  { name: "routineConsistency", label: "Skincare consistency (1–10)", placeholder: "e.g. 8", type: "number", icon: <LuSparkles size={24} color="#D4857A" />, tip: "Consistent structural care is key to long-term radiance." },
];

const GlowScoreCard = ({ score, isMobile }) => {
  const getLabel = (s) => {
    if (s >= 80) return { label: "Radiant Glow ✨", color: "#D4857A", bg: "rgba(212,133,122,0.1)" };
    if (s >= 60) return { label: "Glowing Well 🌸", color: "#C27B6E", bg: "rgba(194,123,110,0.1)" };
    if (s >= 40) return { label: "Building Glow 🌿", color: "#8B5E52", bg: "rgba(139,94,82,0.1)" };
    return { label: "Glow Journey Starts 💪", color: "#6B3D35", bg: "rgba(107,61,53,0.1)" };
  };

  const { label, color, bg } = getLabel(score);
  const circumference = 2 * Math.PI * 54;
  const progress = (score / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      style={{
        background: "rgba(255,255,255,0.85)", backdropFilter: "blur(20px)",
        border: "1px solid rgba(234,168,154,0.35)", borderRadius: 28,
        padding: isMobile ? "32px 20px" : "44px 36px", textAlign: "center",
        boxShadow: "0 24px 64px rgba(212,133,122,0.12)",
      }}
    >
      <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: bg, border: `1px solid ${color}33`, borderRadius: 50, padding: "6px 16px", marginBottom: 20 }}>
        <FiAward size={14} color={color} />
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color }}>{label}</span>
      </div>

      {/* Animated Circular Ring Container */}
      <div style={{ position: "relative", width: 148, height: 148, margin: "0 auto 28px" }}>
        <svg width="148" height="148" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="74" cy="74" r="54" fill="none" stroke="rgba(234,168,154,0.15)" strokeWidth="10" />
          <motion.circle
            cx="74" cy="74" r="54" fill="none"
            stroke="url(#glowGradientScore)" strokeWidth="10"
            strokeLinecap="round" strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - progress }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="glowGradientScore" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EAA89A" />
              <stop offset="100%" stopColor="#D4857A" />
            </linearGradient>
          </defs>
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 38, fontWeight: 700, color: "#2C1810" }}>{score}</span>
          <span style={{ fontSize: 12, color: "#A0705E", fontFamily: "'DM Sans', sans-serif" }}>/ 100</span>
        </div>
      </div>

      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 14 : 15, color: "#6B3D35", lineHeight: 1.7, margin: 0, fontWeight: 300 }}>
        {score >= 70
          ? "Excellent! Your internal healthy metrics are supporting consistent cellular repair. Maintain this protective routine!"
          : score >= 50
          ? "Steady baseline! Target higher sleep consistency and targeted daytime hydration matrices to clear deep toxins."
          : "A perfect diagnostic baseline. Subtle modifications to your environment and tracking metrics will generate accelerated recovery."}
      </p>
    </motion.div>
  );
};

const Quiz = () => {
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    sleepHours: "", waterIntake: "", sunscreenUsage: null,
    stressLevel: "", workoutFrequency: "", routineConsistency: "",
  });
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Real-time responsiveness listener
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    handleResize(); // Evaluate dynamically on boot
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await api.post("/quiz/submit", formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setScore(res.data.glowScore);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const isLastStep = step === questions.length;
  const currentQ = questions[step];
  const totalSteps = questions.length + 1;
  const progressPercent = ((step) / totalSteps) * 100;

  const textInputStyle = {
    width: "100%",
    padding: "16px 20px",
    fontSize: 16,
    fontFamily: "'DM Sans', sans-serif",
    color: "#2C1810",
    background: "white",
    border: "1px solid rgba(234,168,154,0.4)",
    borderRadius: "16px",
    outline: "none",
    boxSizing: "border-box",
    boxShadow: "0 4px 12px rgba(44,24,16,0.01)",
    transition: "border-color 0.2s ease"
  };

  const isNextDisabled = !isLastStep && (formData[currentQ?.name] === "" || formData[currentQ?.name] === undefined);

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
      <div style={{ maxWidth: 520, margin: "0 auto" }}>
        
        {/* Dynamic Context Header */}
        {!score && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center", marginBottom: isMobile ? 24 : 36 }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", color: "#D4857A", marginBottom: 8 }}>
              Diagnostic Matrix
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? 28 : 34, fontWeight: 700, color: "#2C1810", margin: "0 0 8px" }}>
              Glow Score Quiz
            </h1>
            
            {/* Unified Smooth Progress Bar */}
            <div style={{ marginTop: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#A0705E", marginBottom: 8 }}>
                <span>Step {step + 1} of {totalSteps}</span>
                <span>{Math.round(progressPercent)}% Completed</span>
              </div>
              <div style={{ height: 6, background: "rgba(234,168,154,0.2)", borderRadius: 10, overflow: "hidden" }}>
                <motion.div animate={{ width: `${progressPercent}%` }} transition={{ duration: 0.4 }} style={{ height: "100%", background: "linear-gradient(90deg, #EAA89A, #D4857A)" }} />
              </div>
            </div>
          </motion.div>
        )}

        {score !== null ? (
          <div>
            <GlowScoreCard score={score} isMobile={isMobile} />
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => { setScore(null); setStep(0); setFormData({ sleepHours: "", waterIntake: "", sunscreenUsage: null, stressLevel: "", workoutFrequency: "", routineConsistency: "" }); }}
              style={{
                width: "100%", marginTop: 24, padding: "14px", borderRadius: 50, fontSize: 14, fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif", border: "1.5px solid rgba(44,24,16,0.15)", background: "transparent", color: "#2C1810", cursor: "pointer"
              }}
            >
              Retake Assessment
            </motion.button>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              style={{
                background: "rgba(255,255,255,0.65)", backdropFilter: "blur(20px)",
                border: "1px solid rgba(234,168,154,0.25)", borderRadius: 28,
                padding: isMobile ? "32px 20px" : "40px 32px", 
                boxShadow: "0 20px 48px rgba(212,133,122,0.06)",
                boxSizing: "border-box"
              }}
            >
              {isLastStep ? (
                <div style={{ textAlign: "center" }}>
                  <div style={{ width: 56, height: 56, borderRadius: 18, background: "rgba(234,168,154,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                    <FaSun size={26} color="#D4857A" />
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? 19 : 22, fontWeight: 600, color: "#2C1810", margin: "0 0 8px" }}>
                    Do you apply sunscreen daily?
                  </h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#8B5E52", margin: "0 0 32px", fontWeight: 300, lineHeight: 1.5 }}>
                    UV shielding prevents structural cell fatigue and maintains even skin pigmentation.
                  </p>
                  
                  <div style={{ display: "flex", gap: 12, flexDirection: isMobile ? "column" : "row", justifyContent: "center" }}>
                    {[{ label: "Yes, everyday", value: true }, { label: "Occasionally / No", value: false }].map((opt) => {
                      const isSelected = formData.sunscreenUsage === opt.value;
                      return (
                        <motion.button
                          key={String(opt.value)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                          onClick={() => setFormData({ ...formData, sunscreenUsage: opt.value })}
                          type="button"
                          style={{
                            padding: "14px 24px", borderRadius: 50, fontSize: 14, fontWeight: 500, cursor: "pointer",
                            fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s ease",
                            width: isMobile ? "100%" : "auto",
                            border: isSelected ? "2px solid #D4857A" : "1px solid rgba(234,168,154,0.4)",
                            background: isSelected ? "rgba(212,133,122,0.12)" : "white",
                            color: isSelected ? "#D4857A" : "#6B3D35",
                          }}
                        >
                          {opt.label}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ width: 52, height: 52, borderRadius: 16, background: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 16px rgba(212,133,122,0.06)", marginBottom: 20 }}>
                    {currentQ.icon}
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? 19 : 22, fontWeight: 600, color: "#2C1810", margin: "0 0 6px" }}>
                    {currentQ.label}
                  </h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#8B5E52", margin: "0 0 24px", fontWeight: 300, lineHeight: 1.5 }}>
                    {currentQ.tip}
                  </p>
                  <input
                    type={currentQ.type} name={currentQ.name} placeholder={currentQ.placeholder}
                    value={formData[currentQ.name]} onChange={handleChange} style={textInputStyle}
                    min="0" max={currentQ.name.toLowerCase().includes("level") || currentQ.name.toLowerCase().includes("consistency") ? "10" : undefined}
                    onFocus={(e) => e.target.style.borderColor = "#D4857A"}
                    onBlur={(e) => e.target.style.borderColor = "rgba(234,168,154,0.4)"}
                  />
                </div>
              )}

              {/* Navigation Action Container */}
              <div style={{ 
                display: "flex", 
                gap: 12, 
                marginTop: isMobile ? 28 : 40, 
                borderTop: "1px solid rgba(234,168,154,0.15)", 
                paddingTop: 24, 
                flexDirection: isMobile && step > 0 ? "column-reverse" : "row",
                justifyContent: step > 0 ? "space-between" : "flex-end" 
              }}>
                {step > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.02, background: "rgba(234,168,154,0.08)" }} whileTap={{ scale: 0.98 }}
                    onClick={() => setStep(step - 1)} type="button"
                    style={{
                      padding: "12px 24px", borderRadius: 50, border: "1px solid rgba(234,168,154,0.4)",
                      background: "transparent", color: "#6B3D35", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 13, fontWeight: 500, fontFamily: "'DM Sans', sans-serif"
                    }}
                  >
                    <IoChevronBackOutline size={14} /> Back
                  </motion.button>
                )}
                
                {isLastStep ? (
                  <motion.button
                    whileHover={{ scale: formData.sunscreenUsage === null ? 1 : 1.02, boxShadow: formData.sunscreenUsage === null ? "none" : "0 10px 24px rgba(212,133,122,0.25)" }}
                    whileTap={{ scale: formData.sunscreenUsage === null ? 1 : 0.98 }}
                    onClick={handleSubmit} disabled={loading || formData.sunscreenUsage === null}
                    style={{
                      padding: "14px 24px", borderRadius: 50, border: "none", fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                      background: formData.sunscreenUsage === null ? "#E5D1C9" : "linear-gradient(135deg, #EAA89A 0%, #D4857A 100%)",
                      color: formData.sunscreenUsage === null ? "#A08075" : "white",
                      cursor: loading || formData.sunscreenUsage === null ? "not-allowed" : "pointer",
                      width: isMobile ? "100%" : "auto"
                    }}
                  >
                    {loading ? "Analyzing Factors..." : (
                      <>
                        <IoCheckmarkCircleOutline size={16} /> Get Diagnostic Score
                      </>
                    )}
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: isNextDisabled ? 1 : 1.02 }} whileTap={{ scale: isNextDisabled ? 1 : 0.98 }}
                    onClick={() => setStep(step + 1)} disabled={isNextDisabled}
                    style={{
                      padding: "13px 36px", borderRadius: 50, border: "none", fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
                      background: isNextDisabled ? "#E5D1C9" : "linear-gradient(135deg, #EAA89A 0%, #D4857A 100%)",
                      color: isNextDisabled ? "#A08075" : "white",
                      cursor: isNextDisabled ? "not-allowed" : "pointer",
                      width: isMobile ? "100%" : "auto"
                    }}
                  >
                    Continue
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default Quiz;