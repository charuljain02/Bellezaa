import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Target, ShoppingBag, Search, Sparkle } from "lucide-react";
import api from "../services/api";

const skinTypes = [
  { value: "oily", label: "Oily" },
  { value: "dry", label: "Dry" },
  { value: "combination", label: "Combination" },
  { value: "sensitive", label: "Sensitive" },
];

const ProductCard = ({ product, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.08 }}
    // Fixed Hover Bug: Handled completely via Framer Motion to prevent state flickering
    whileHover={{ 
      y: -8, 
      borderColor: "rgba(212,133,122,0.5)",
      boxShadow: "0 16px 40px rgba(212,133,122,0.15)"
    }}
    style={{
      background: "rgba(255,255,255,0.75)", 
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(234,168,154,0.25)", 
      borderRadius: 24,
      padding: "28px 24px", 
      display: "flex",
      flexDirection: "column",
      transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    }}
  >
    {/* Product Icon */}
    <div style={{
      width: 52, height: 52, borderRadius: 16,
      background: "linear-gradient(135deg, rgba(234,168,154,0.2), rgba(242,196,160,0.2))",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#D4857A", marginBottom: 18,
    }}>
      <Sparkles size={22} />
    </div>

    <h2 style={{
      fontFamily: "'Playfair Display', serif",
      fontSize: 18, fontWeight: 600, color: "#2C1810",
      margin: "0 0 6px",
    }}>
      {product.name}
    </h2>
    <p style={{
      fontFamily: "'DM Sans', sans-serif",
      fontSize: 14, color: "#D4857A", fontWeight: 500,
      margin: "0 0 16px",
    }}>
      {product.brand}
    </p>

    {/* Tags */}
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
      {product.skinType && (
        <span style={{
          background: "rgba(234,168,154,0.12)",
          border: "1px solid rgba(234,168,154,0.3)",
          borderRadius: 50, padding: "4px 12px",
          fontSize: 11, color: "#8B5E52", fontWeight: 500,
          fontFamily: "'DM Sans', sans-serif", display: "inline-flex", alignItems: "center", gap: 4
        }}>
          <Sparkle size={10} color="#D4857A" /> {product.skinType}
        </span>
      )}
      {product.concern && (
        <span style={{
          background: "rgba(234,168,154,0.12)",
          border: "1px solid rgba(234,168,154,0.3)",
          borderRadius: 50, padding: "4px 12px",
          fontSize: 11, color: "#8B5E52", fontWeight: 500,
          fontFamily: "'DM Sans', sans-serif", display: "inline-flex", alignItems: "center", gap: 4
        }}>
          <Target size={10} color="#D4857A" /> {product.concern}
        </span>
      )}
    </div>

    {/* Rating */}
    {product.rating && (
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: "auto" }}>
        <div style={{ display: "flex", gap: 2 }}>
          {[1, 2, 3, 4, 5].map(star => (
            <span key={star} style={{
              fontSize: 14, color: star <= Math.round(product.rating) ? "#D4857A" : "#E8D5CF",
            }}>★</span>
          ))}
        </div>
        <span style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13, color: "#8B5E52", fontWeight: 600,
        }}>
          {product.rating}
        </span>
      </div>
    )}
  </motion.div>
);

const Products = () => {
  const [skinType, setSkinType] = useState("");
  const [concern, setConcern] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);
    try {
      const res = await api.get(`/products?skinType=${skinType}&concern=${concern}`);
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Shared Form Control Styling
  const inputStyle = {
    width: "100%",
    padding: "14px 20px",
    fontSize: 14,
    fontFamily: "'DM Sans', sans-serif",
    color: "#2C1810",
    background: "white",
    border: "1px solid rgba(234,168,154,0.4)",
    borderRadius: "14px",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s ease"
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #FDF6F0 0%, #FAE8E0 50%, #F5D5C8 100%)",
      paddingTop: 120, paddingBottom: 80, paddingLeft: 24, paddingRight: 24,
    }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <div style={{ 
            fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, 
            letterSpacing: 1.5, textTransform: "uppercase", color: "#D4857A", marginBottom: 12 
          }}>
            Curated for your skin
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(30px, 4vw, 42px)", fontWeight: 700, color: "#2C1810", margin: "0 0 14px",
          }}>
            Product Recommendations
          </h1>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 16,
            color: "#8B5E52", margin: 0, fontWeight: 300
          }}>
            Premium & clean dermatological solutions matched to your exact concerns.
          </p>
        </motion.div>

        {/* Filter Form Card */}
        {/* Filter Form Card */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.1 }}
  style={{
    background: "rgba(255,255,255,0.55)", backdropFilter: "blur(20px)",
    border: "1px solid rgba(234,168,154,0.25)", borderRadius: 28,
    padding: "36px 32px", marginBottom: 48,
    boxShadow: "0 20px 40px rgba(44,24,16,0.03)"
  }}
>
  <form onSubmit={handleSearch}>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24, marginBottom: 28 }}>
      
      {/* Skin Type Dropdown */}
      <div>
        <label style={{
          display: "block", marginBottom: 8,
          fontSize: 12, fontWeight: 600, color: "#6B3D35",
          fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", letterSpacing: 0.5
        }}>
          Skin Type
        </label>
        <select
          value={skinType}
          onChange={(e) => { setSkinType(e.target.value); setConcern(""); }}
          style={inputStyle}
          onFocus={(e) => e.target.style.borderColor = "#D4857A"}
          onBlur={(e) => e.target.style.borderColor = "rgba(234,168,154,0.4)"}
        >
          <option value="">Select skin type</option>
          <option value="oily">Oily</option>
          <option value="dry">Dry</option>
          <option value="combination">Combination</option>
          <option value="sensitive">Sensitive</option>
          <option value="normal">Normal</option>
        </select>
      </div>

      {/* Concern Dropdown - changes based on skinType */}
      <div>
        <label style={{
          display: "block", marginBottom: 8,
          fontSize: 12, fontWeight: 600, color: "#6B3D35",
          fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", letterSpacing: 0.5
        }}>
          Skin Concern
        </label>
        <select
          value={concern}
          onChange={(e) => setConcern(e.target.value)}
          style={inputStyle}
          disabled={!skinType}
          onFocus={(e) => e.target.style.borderColor = "#D4857A"}
          onBlur={(e) => e.target.style.borderColor = "rgba(234,168,154,0.4)"}
        >
          <option value="">
            {skinType ? "Select concern" : "Select skin type first"}
          </option>
          {skinType === "oily" && <>
            <option value="acne">Acne</option>
            <option value="pores">Pores</option>
          </>}
          {skinType === "dry" && <>
            <option value="dryness">Dryness</option>
          </>}
          {skinType === "combination" && <>
            <option value="dullness">Dullness</option>
          </>}
          {skinType === "sensitive" && <>
            <option value="sensitivity">Sensitivity</option>
          </>}
          {skinType === "normal" && <>
            <option value="anti-aging">Anti-aging</option>
            <option value="pigmentation">Pigmentation</option>
          </>}
        </select>
      </div>

    </div>

    <div style={{ textAlign: "center" }}>
      <motion.button
        whileHover={{ scale: 1.03, boxShadow: "0 8px 20px rgba(212,133,122,0.3)" }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={loading || !skinType}
        style={{
          padding: "14px 44px", fontSize: 15, fontWeight: 600,
          fontFamily: "'DM Sans', sans-serif", color: "white",
          background: (!skinType || loading)
            ? "rgba(234,168,154,0.4)"
            : "linear-gradient(135deg, #EAA89A 0%, #D4857A 100%)",
          border: "none", borderRadius: "50px",
          cursor: (!skinType || loading) ? "not-allowed" : "pointer",
          transition: "all 0.2s"
        }}
      >
        {loading ? "Finding matches..." : "Find Products"}
      </motion.button>
    </div>
  </form>
</motion.div>
              

        {/* Results Stream */}
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ textAlign: "center", padding: "80px 0" }}
            >
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                style={{ display: "inline-block", color: "#D4857A", marginBottom: 16 }}
              >
                <Search size={32} />
              </motion.div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#8B5E52" }}>
                Scanning database for perfect matches...
              </p>
            </motion.div>
          )}

          {!loading && searched && products.length === 0 && (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              style={{
                textAlign: "center", padding: "60px 24px",
                background: "rgba(255,255,255,0.4)", borderRadius: 24,
                border: "1px solid rgba(234,168,154,0.2)",
              }}
            >
              <ShoppingBag size={36} color="#A0705E" style={{ marginBottom: 16 }} />
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#2C1810", margin: "0 0 6px" }}>
                No specific products found
              </h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#8B5E52", margin: 0 }}>
                Try shifting your parameters or searching for alternative skin targets.
              </p>
            </motion.div>
          )}

          {!loading && products.length > 0 && (
            <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500,
                color: "#A0705E", marginBottom: 20, letterSpacing: 0.5
              }}>
                FOUND {products.length} MATCHING REMED{products.length !== 1 ? "IES" : "Y"}
              </div>
              
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 24,
              }}>
                {products.map((product, i) => (
                  <ProductCard key={product._id} product={product} index={i} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Products;