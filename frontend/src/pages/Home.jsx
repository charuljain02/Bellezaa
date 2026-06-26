import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, Leaf, ShoppingBag, Bot, ArrowRight } from "lucide-react";
import { SiProbot } from "react-icons/si";
import { FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";
import frontImg from "../assets/front.png";
import bg1 from "../assets/front2.png";
import bg2 from "../assets/diva.png";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: "easeOut" },
  }),
};

const features = [
  { icon: <Sparkles size={24} color="#D4857A" />, title: "Glow Score Quiz", desc: "Discover your skin's glow potential with our science-backed quiz.", link: "/quiz" },
  { icon: <Leaf size={24} color="#D4857A" />, title: "Routine Builder", desc: "Get a personalized morning & night skincare routine crafted for you.", link: "/routine" },
  { icon: <ShoppingBag size={24} color="#D4857A" />, title: "Product Finder", desc: "Curated Indian & international products matched to your skin.", link: "/products" },
  { icon: <Bot size={24} color="#D4857A" />, title: "AI Assistant", desc: "Chat with your personal beauty AI — anytime, anywhere.", link: "/assistant" },
];

const stats = [
  { number: "50K+", label: "Glowups achieved" },
  { number: "200+", label: "Curated products" },
  { number: "4.9★", label: "User rating" },
  { number: "15+", label: "Beauty features" },
];

const Home = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ background: "linear-gradient(135deg, #FDF6F0 0%, #FAE8E0 50%, #F5D5C8 100%)", minHeight: "100vh", overflowX: "hidden" }}>

      {/* Hero Section */}
      <section style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: isMobile ? "40px" : "48px",
        padding: isMobile ? "100px 20px 60px" : "120px 24px 80px",
        maxWidth: 1200,
        margin: "0 auto",
        position: "relative",
      }}>
        {/* Decorative blob */}
        <div style={{
          position: "absolute", top: "15%", right: "5%",
          width: isMobile ? 200 : 400, height: isMobile ? 200 : 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(234,168,154,0.25) 0%, transparent 70%)",
          filter: "blur(40px)", pointerEvents: "none",
        }} />

        {/* Left Column (Hero Text) */}
        <div style={{
          flex: "1 1 50%", maxWidth: isMobile ? "100%" : 640,
          position: "relative", zIndex: 1,
          textAlign: isMobile ? "center" : "left",
        }}>
          <motion.div
            variants={fadeUp} initial="hidden" animate="visible" custom={0}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(234,168,154,0.15)", border: "1px solid rgba(234,168,154,0.3)",
              borderRadius: 50, padding: "6px 16px", marginBottom: 24,
            }}
          >
            <span style={{ fontSize: 12 }}>🌸</span>
            <span style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 11,
              fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", color: "#D4857A",
            }}>
              AI-Powered Beauty Platform
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp} initial="hidden" animate="visible" custom={1}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: isMobile ? "36px" : "clamp(42px, 5vw, 64px)",
              fontWeight: 700, lineHeight: 1.2,
              color: "#2C1810", marginBottom: 24,
            }}
          >
            Reveal Your
            <br />
            <em style={{ color: "#D4857A", fontStyle: "italic" }}>Skin's</em>
            {" "}True Glow
          </motion.h1>

          <motion.p
            variants={fadeUp} initial="hidden" animate="visible" custom={2}
            style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 14 : 16,
              lineHeight: 1.75, color: "#6B3D35", marginBottom: 40,
              fontWeight: 300, maxWidth: isMobile ? "100%" : 480,
              margin: isMobile ? "0 auto 32px" : "0 0 40px",
            }}
          >
            Personalized skincare routines, AI beauty advice, and curated product
            recommendations — all crafted for your unique skin.
          </motion.p>

          <motion.div
            variants={fadeUp} initial="hidden" animate="visible" custom={3}
            style={{
              display: "flex", gap: 12, flexWrap: "wrap",
              justifyContent: isMobile ? "center" : "flex-start",
            }}
          >
            <Link to="/quiz" style={{ textDecoration: "none" }}>
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  fontSize: isMobile ? 13 : 15, fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                  padding: isMobile ? "12px 24px" : "14px 32px",
                  display: "inline-flex", alignItems: "center", gap: "10px",
                  background: "linear-gradient(135deg, #EAA89A 0%, #D4857A 100%)",
                  color: "white", border: "none", borderRadius: "50px", cursor: "pointer",
                }}
              >
                <SiProbot size={16} />
                <span>Take the Glow Quiz</span>
              </motion.button>
            </Link>

            <Link to="/products" style={{ textDecoration: "none" }}>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  fontSize: isMobile ? 13 : 15, fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                  padding: isMobile ? "11px 24px" : "13px 32px",
                  background: "transparent", color: "#2C1810",
                  border: "2px solid rgba(44,24,16,0.15)", borderRadius: "50px", cursor: "pointer",
                }}
              >
                Explore Products
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="visible" custom={4}
            style={{
              display: "flex", gap: isMobile ? 20 : 32, marginTop: isMobile ? 40 : 56,
              flexWrap: "wrap", justifyContent: isMobile ? "center" : "flex-start",
            }}
          >
            {stats.map((s, i) => (
              <div key={i} style={{ textAlign: isMobile ? "center" : "left", minWidth: isMobile ? "80px" : "auto" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? 22 : 26, fontWeight: 700, color: "#2C1810" }}>
                  {s.number}
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#A0705E", marginTop: 2 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Column (Hero Image) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          style={{ 
            flex: "1 1 50%", 
            display: "flex", 
            justifyContent: "center", 
            position: "relative", 
            zIndex: 1, 
            width: "100%",
            maxWidth: isMobile ? "100%" : "450px"
          }}
        >
          <div style={{
            width: "100%", 
            maxWidth: isMobile ? "280px" : "380px", 
            height: isMobile ? "350px" : "480px",
            borderRadius: isMobile ? "80px 24px 80px 24px" : "140px 35px 140px 35px", 
            overflow: "hidden",
            boxShadow: "0 24px 48px rgba(44,24,16,0.1)",
            border: "6px solid rgba(255,255,255,0.5)",
            background: "#FFF5F0"
          }}>
            <img src={frontImg} alt="Skincare Glow" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section style={{ padding: isMobile ? "60px 16px" : "100px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} style={{ textAlign: "center", marginBottom: isMobile ? 36 : 60 }}
        >
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "#D4857A", fontWeight: 600, marginBottom: 8 }}>
            What we offer
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? "28px" : "clamp(32px, 4vw, 44px)", fontWeight: 700, color: "#2C1810", margin: 0 }}>
            Everything your skin needs
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(260px, 1fr))", gap: isMobile ? 16 : 28 }}>
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link to={f.link} style={{ textDecoration: "none" }}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  style={{
                    background: "rgba(255,255,255,0.65)", backdropFilter: "blur(20px)",
                    border: "1px solid rgba(234,168,154,0.2)", borderRadius: 24,
                    padding: isMobile ? "24px 20px" : "36px 30px",
                    display: "flex", flexDirection: isMobile ? "row" : "column",
                    alignItems: isMobile ? "center" : "flex-start",
                    gap: isMobile ? 16 : 0,
                    cursor: "pointer",
                  }}
                >
                  <div style={{
                    width: 52, height: 52, borderRadius: 16, flexShrink: 0,
                    background: "white", display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 8px 20px rgba(212,133,122,0.1)",
                    marginBottom: isMobile ? 0 : 24,
                  }}>
                    {f.icon}
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? 17 : 20, fontWeight: 600, color: "#2C1810", margin: "0 0 6px" }}>
                      {f.title}
                    </h3>
                    {!isMobile && (
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.65, color: "#6B3D35", margin: "0 0 24px", fontWeight: 300 }}>
                        {f.desc}
                      </p>
                    )}
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "#D4857A", fontFamily: "'DM Sans', sans-serif" }}>
                      <span>Explore</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Left Right Image Section */}
      <section style={{ padding: isMobile ? "60px 16px" : "100px 24px", maxWidth: 1200, margin: "0 auto" }}>

        {/* Row 1 - Routine */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            display: "flex", flexDirection: isMobile ? "column" : "row",
            alignItems: "center", gap: isMobile ? 32 : 64,
            marginBottom: isMobile ? 60 : 100,
          }}
        >
          <div style={{
            flex: "1 1 40%", width: "100%", maxWidth: isMobile ? "280px" : "360px",
            borderRadius: 32, overflow: "hidden",
            boxShadow: "0 24px 48px rgba(44,24,16,0.08)",
            border: "6px solid rgba(255,255,255,0.7)",
            background: "#FFF5F0"
          }}>
            <img src={bg1} alt="Skincare Routine" style={{ width: "100%", height: isMobile ? "280px" : "360px", objectFit: "contain", display: "block" }} />
          </div>

          <div style={{ flex: "1 1 60%", textAlign: isMobile ? "center" : "left", width: "100%" }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "#D4857A", marginBottom: 12 }}>
              Personalized For You
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? "26px" : "clamp(28px, 3vw, 40px)", fontWeight: 700, color: "#2C1810", margin: "0 0 20px", lineHeight: 1.2 }}>
              Your Skin Deserves a <em style={{ color: "#D4857A", fontStyle: "italic" }}>Ritual</em>
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 14 : 15, lineHeight: 1.8, color: "#6B3D35", fontWeight: 300, marginBottom: 32 }}>
              Build a morning and night routine tailored to your exact skin type and concerns.
              No guesswork — just science-backed steps that actually work for your skin.
            </p>
            <Link to="/routine" style={{ textDecoration: "none" }}>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: "13px 32px", fontSize: 14, fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif", color: "white",
                  background: "linear-gradient(135deg, #EAA89A, #D4857A)",
                  border: "none", borderRadius: 50, cursor: "pointer",
                  display: "inline-flex", alignItems: "center", gap: 8,
                }}
              >
                Build My Routine <ArrowRight size={14} />
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Row 2 - AI Assistant */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row-reverse",
            alignItems: "center", gap: isMobile ? 32 : 64,
          }}
        >
          <div style={{
            flex: "1 1 40%", width: "100%", maxWidth: isMobile ? "280px" : "360px",
            borderRadius: 32, overflow: "hidden",
            boxShadow: "0 24px 48px rgba(44,24,16,0.08)",
            border: "6px solid rgba(255,255,255,0.7)",
            background: "#FFF5F0"
          }}>
            <img src={bg2} alt="AI Beauty Assistant" style={{ width: "100%", height: isMobile ? "280px" : "360px", objectFit: "contain", display: "block" }} />
          </div>

          <div style={{ flex: "1 1 60%", textAlign: isMobile ? "center" : "left", width: "100%" }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "#D4857A", marginBottom: 12 }}>
              AI Powered
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? "26px" : "clamp(28px, 3vw, 40px)", fontWeight: 700, color: "#2C1810", margin: "0 0 20px", lineHeight: 1.2 }}>
              Beauty Advice at Your <em style={{ color: "#D4857A", fontStyle: "italic" }}>Fingertips</em>
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 14 : 15, lineHeight: 1.8, color: "#6B3D35", fontWeight: 300, marginBottom: 32 }}>
              Chat with your personal AI beauty assistant anytime. Get instant answers
              about ingredients, routines, and product recommendations — all for free.
            </p>
            <Link to="/assistant" style={{ textDecoration: "none" }}>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: "13px 32px", fontSize: 14, fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif", color: "white",
                  background: "linear-gradient(135deg, #EAA89A, #D4857A)",
                  border: "none", borderRadius: 50, cursor: "pointer",
                  display: "inline-flex", alignItems: "center", gap: 8,
                }}
              >
                Chat with AI <ArrowRight size={14} />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer Section */}
      <footer style={{ borderTop: "1px solid rgba(234,168,154,0.3)", padding: isMobile ? "40px 16px 24px" : "60px 24px 30px", background: "rgba(255,255,255,0.3)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 32, marginBottom: 32 }}>
          <div style={{ maxWidth: isMobile ? "100%" : 300, width: isMobile ? "100%" : "auto" }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#2C1810", margin: "0 0 12px" }}>
              Bellezaa
            </h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#6B3D35", lineHeight: 1.6, fontWeight: 300 }}>
              Smart AI-driven platform delivering hyper-personalized aesthetic solutions for your organic skincare needs.
            </p>
          </div>

          <div style={{ display: "flex", gap: isMobile ? 40 : 60, flexWrap: "wrap" }}>
            <div>
              <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, textTransform: "uppercase", letterSpacing: 1, color: "#2C1810", fontWeight: 600, marginBottom: 16 }}>Platform</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <Link to="/quiz" style={{ textDecoration: "none", color: "#6B3D35", fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>Glow Quiz</Link>
                <Link to="/routine" style={{ textDecoration: "none", color: "#6B3D35", fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>Routine Builder</Link>
                <Link to="/assistant" style={{ textDecoration: "none", color: "#6B3D35", fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>AI Expert</Link>
              </div>
            </div>

            <div>
              <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, textTransform: "uppercase", letterSpacing: 1, color: "#2C1810", fontWeight: 600, marginBottom: 16 }}>Contact</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <span style={{ color: "#6B3D35", fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>support@Bellezaa.com</span>
                <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
                  <FaInstagram size={18} color="#6B3D35" style={{ cursor: "pointer" }} />
                  <FaTwitter size={18} color="#6B3D35" style={{ cursor: "pointer" }} />
                  <FaFacebookF size={18} color="#6B3D35" style={{ cursor: "pointer" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 1200, margin: "0 auto", borderTop: "1px solid rgba(234,168,154,0.15)", paddingTop: 20, textAlign: "center" }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#A0705E", margin: 0 }}>
            &copy; {new Date().getFullYear()} Bellezaa. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
};

export default Home;