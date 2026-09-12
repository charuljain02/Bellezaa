// import { useState, useEffect, useRef, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FiCamera,
//   FiUpload,
//   FiRefreshCw,
//   FiAlertCircle,
//   FiCheckCircle,
// } from "react-icons/fi";
// import { LuScanFace, LuSparkles } from "react-icons/lu";
// import api from "../services/api";
// import { useAuth } from "../context/AuthContext";

// const AREA_LABELS = {
//   forehead: "Forehead",
//   nose: "Nose",
//   cheeks: "Cheeks",
//   chin: "Chin",
// };

// const SEVERITY_STYLES = {
//   none: { label: "None", color: "#4C9A6A", bg: "rgba(76,154,106,0.12)" },
//   low: { label: "Low", color: "#4C9A6A", bg: "rgba(76,154,106,0.12)" },
//   smooth: { label: "Smooth", color: "#4C9A6A", bg: "rgba(76,154,106,0.12)" },
//   mild: { label: "Mild", color: "#C9A227", bg: "rgba(201,162,39,0.12)" },
//   medium: { label: "Medium", color: "#C9A227", bg: "rgba(201,162,39,0.12)" },
//   "slightly uneven": {
//     label: "Slightly Uneven",
//     color: "#C9A227",
//     bg: "rgba(201,162,39,0.12)",
//   },
//   moderate: {
//     label: "Moderate",
//     color: "#D4857A",
//     bg: "rgba(212,133,122,0.14)",
//   },
//   high: { label: "High", color: "#D4857A", bg: "rgba(212,133,122,0.14)" },
//   severe: { label: "Severe", color: "#C4453A", bg: "rgba(196,69,58,0.12)" },
//   rough: { label: "Rough", color: "#C4453A", bg: "rgba(196,69,58,0.12)" },
// };

// const severityStyle = (key) =>
//   SEVERITY_STYLES[String(key || "").toLowerCase()] || {
//     label: key || "—",
//     color: "#8B5E52",
//     bg: "rgba(139,94,82,0.1)",
//   };

// const fontHead = "'Playfair Display', serif";
// const fontBody = "'DM Sans', sans-serif";

// // ---------- Small building blocks ----------

// const ScoreRing = ({ score, isMobile }) => {
//   const circumference = 2 * Math.PI * 54;
//   const progress = ((score || 0) / 100) * circumference;

//   return (
//     <div style={{ position: "relative", width: 148, height: 148, margin: "0 auto 20px" }}>
//       <svg width="148" height="148" style={{ transform: "rotate(-90deg)" }}>
//         <circle cx="74" cy="74" r="54" fill="none" stroke="rgba(234,168,154,0.15)" strokeWidth="10" />
//         <motion.circle
//           cx="74" cy="74" r="54" fill="none"
//           stroke="url(#skinScoreGradient)" strokeWidth="10"
//           strokeLinecap="round" strokeDasharray={circumference}
//           initial={{ strokeDashoffset: circumference }}
//           animate={{ strokeDashoffset: circumference - progress }}
//           transition={{ duration: 1.2, ease: "easeOut" }}
//         />
//         <defs>
//           <linearGradient id="skinScoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
//             <stop offset="0%" stopColor="#EAA89A" />
//             <stop offset="100%" stopColor="#D4857A" />
//           </linearGradient>
//         </defs>
//       </svg>
//       <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
//         <span style={{ fontFamily: fontHead, fontSize: isMobile ? 32 : 38, fontWeight: 700, color: "#2C1810" }}>
//           {score ?? "—"}
//         </span>
//         <span style={{ fontSize: 12, color: "#A0705E", fontFamily: fontBody }}>/ 100</span>
//       </div>
//     </div>
//   );
// };

// const ConditionCard = ({ title, severityKey, detail, areas }) => {
//   const s = severityStyle(severityKey);
//   return (
//     <div style={{
//       background: "white", borderRadius: 18, padding: "16px 18px",
//       border: "1px solid rgba(234,168,154,0.25)", boxShadow: "0 6px 18px rgba(212,133,122,0.06)",
//     }}>
//       <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
//         <span style={{ fontFamily: fontBody, fontWeight: 600, fontSize: 14, color: "#2C1810" }}>{title}</span>
//         <span style={{
//           fontFamily: fontBody, fontSize: 11, fontWeight: 600, color: s.color,
//           background: s.bg, padding: "3px 10px", borderRadius: 50,
//         }}>
//           {s.label}
//         </span>
//       </div>
//       {detail && (
//         <p style={{ fontFamily: fontBody, fontSize: 12.5, color: "#8B5E52", margin: "4px 0 0", lineHeight: 1.5, fontWeight: 300 }}>
//           {detail}
//         </p>
//       )}
//       {areas && areas.length > 0 && (
//         <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
//           {areas.map((a) => (
//             <span key={a} style={{
//               fontFamily: fontBody, fontSize: 11, color: "#6B3D35",
//               background: "rgba(234,168,154,0.12)", padding: "3px 9px", borderRadius: 50,
//             }}>
//               {a}
//             </span>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// // ---------- Main page ----------

// const SkinAnalysis = () => {
//   const { user } = useAuth();
//   const [isMobile, setIsMobile] = useState(false);
//   const [mode, setMode] = useState("upload"); // "upload" | "webcam"
//   const [imageFile, setImageFile] = useState(null); // Blob to upload
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [cameraActive, setCameraActive] = useState(false);
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const videoRef = useRef(null);
//   const streamRef = useRef(null);
//   const fileInputRef = useRef(null);

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth <= 640);
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     return () => stopCamera();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const stopCamera = useCallback(() => {
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach((t) => t.stop());
//       streamRef.current = null;
//     }
//     setCameraActive(false);
//   }, []);

//   const startCamera = async () => {
//     setError(null);
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: { facingMode: "user", width: { ideal: 720 }, height: { ideal: 720 } },
//       });
//       streamRef.current = stream;
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//       }
//       setCameraActive(true);
//     } catch (err) {
//       console.log(err);
//       setError("Couldn't access your camera. Please allow camera access, or upload a photo instead.");
//     }
//   };

//   const capturePhoto = () => {
//     const video = videoRef.current;
//     if (!video) return;
//     const canvas = document.createElement("canvas");
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     const ctx = canvas.getContext("2d");
//     ctx.translate(canvas.width, 0);
//     ctx.scale(-1, 1); // mirror, since preview is mirrored
//     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
//     canvas.toBlob((blob) => {
//       if (blob) {
//         setImageFile(blob);
//         setPreviewUrl(URL.createObjectURL(blob));
//       }
//     }, "image/jpeg", 0.92);
//     stopCamera();
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setError(null);
//     setResult(null);
//     setImageFile(file);
//     setPreviewUrl(URL.createObjectURL(file));
//   };

//   const switchMode = (nextMode) => {
//     setMode(nextMode);
//     setError(null);
//     setResult(null);
//     if (nextMode === "upload") stopCamera();
//   };

//   const resetAll = () => {
//     setImageFile(null);
//     setPreviewUrl(null);
//     setResult(null);
//     setError(null);
//     stopCamera();
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   };

//   const handleAnalyze = async () => {
//     if (!imageFile) return;
//     setLoading(true);
//     setError(null);
//     try {
//       const formData = new FormData();
//       const filename = imageFile.name || "face-photo.jpg";
//       formData.append("image", imageFile, filename);

//       const res = await api.post("/skin-analysis/analyze", formData, {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       setResult(res.data);
//     } catch (err) {
//       console.log(err);
//       setError(
//         err.response?.data?.message ||
//           "We couldn't analyze that photo. Please try a clear, front-facing, well-lit photo."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const c = result?.conditions || {};
//   const areas = result?.areaAnalysis || {};

//   return (
//     <div style={{
//       minHeight: "100vh",
//       background: "linear-gradient(135deg, #FDF6F0 0%, #FAE8E0 50%, #F5D5C8 100%)",
//       paddingTop: isMobile ? 80 : 120,
//       paddingBottom: isMobile ? 40 : 80,
//       paddingLeft: isMobile ? 16 : 24,
//       paddingRight: isMobile ? 16 : 24,
//       boxSizing: "border-box",
//     }}>
//       <div style={{ maxWidth: 640, margin: "0 auto" }}>

//         {/* Header */}
//         <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center", marginBottom: isMobile ? 24 : 36 }}>
//           <div style={{ fontFamily: fontBody, fontSize: 11, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", color: "#D4857A", marginBottom: 8 }}>
//             AI Photo Analysis
//           </div>
//           <h1 style={{ fontFamily: fontHead, fontSize: isMobile ? 28 : 34, fontWeight: 700, color: "#2C1810", margin: "0 0 8px" }}>
//             Skin & Face Scan
//           </h1>
//           <p style={{ fontFamily: fontBody, fontSize: 14, color: "#8B5E52", margin: 0, fontWeight: 300, lineHeight: 1.6 }}>
//             Capture or upload a clear, front-facing photo and our AI will scan your acne, pores, tone, texture and more — area by area.
//           </p>
//         </motion.div>

//         {!result ? (
//           <motion.div
//             initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
//             style={{
//               background: "rgba(255,255,255,0.65)", backdropFilter: "blur(20px)",
//               border: "1px solid rgba(234,168,154,0.25)", borderRadius: 28,
//               padding: isMobile ? "24px 18px" : "32px 32px",
//               boxShadow: "0 20px 48px rgba(212,133,122,0.06)",
//               boxSizing: "border-box",
//             }}
//           >
//             {/* Mode toggle */}
//             {!previewUrl && (
//               <div style={{ display: "flex", gap: 8, marginBottom: 20, background: "rgba(234,168,154,0.12)", padding: 6, borderRadius: 50 }}>
//                 {[
//                   { key: "upload", label: "Upload Photo", icon: <FiUpload size={15} /> },
//                   { key: "webcam", label: "Use Webcam", icon: <FiCamera size={15} /> },
//                 ].map((opt) => (
//                   <button
//                     key={opt.key}
//                     onClick={() => switchMode(opt.key)}
//                     style={{
//                       flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
//                       padding: "10px 14px", borderRadius: 50, border: "none", cursor: "pointer",
//                       fontFamily: fontBody, fontSize: 13, fontWeight: 600,
//                       background: mode === opt.key ? "white" : "transparent",
//                       color: mode === opt.key ? "#D4857A" : "#8B5E52",
//                       boxShadow: mode === opt.key ? "0 4px 12px rgba(212,133,122,0.15)" : "none",
//                       transition: "all 0.2s ease",
//                     }}
//                   >
//                     {opt.icon} {opt.label}
//                   </button>
//                 ))}
//               </div>
//             )}

//             {/* Preview / capture area */}
//             <div style={{
//               position: "relative", width: "100%", aspectRatio: "1 / 1", maxWidth: 360, margin: "0 auto",
//               borderRadius: 24, overflow: "hidden", background: "#2C1810",
//               display: "flex", alignItems: "center", justifyContent: "center",
//               border: "1px solid rgba(234,168,154,0.3)",
//             }}>
//               {previewUrl ? (
//                 <img src={previewUrl} alt="Your photo preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
//               ) : mode === "webcam" && cameraActive ? (
//                 <video
//                   ref={videoRef} autoPlay playsInline muted
//                   style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scaleX(-1)" }}
//                 />
//               ) : (
//                 <div style={{ textAlign: "center", padding: 24 }}>
//                   <LuScanFace size={44} color="rgba(234,168,154,0.6)" />
//                   <p style={{ fontFamily: fontBody, fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 12 }}>
//                     {mode === "upload" ? "No photo selected yet" : "Camera preview will appear here"}
//                   </p>
//                 </div>
//               )}
//             </div>

//             {/* Error */}
//             {error && (
//               <div style={{
//                 display: "flex", gap: 8, alignItems: "flex-start", marginTop: 16,
//                 background: "rgba(196,69,58,0.08)", border: "1px solid rgba(196,69,58,0.2)",
//                 borderRadius: 14, padding: "12px 14px",
//               }}>
//                 <FiAlertCircle size={16} color="#C4453A" style={{ flexShrink: 0, marginTop: 1 }} />
//                 <span style={{ fontFamily: fontBody, fontSize: 13, color: "#8B4A44", lineHeight: 1.5 }}>{error}</span>
//               </div>
//             )}

//             {/* Action buttons */}
//             <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
//               {mode === "upload" && !previewUrl && (
//                 <>
//                   <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} id="skin-photo-input" />
//                   <label htmlFor="skin-photo-input" style={{
//                     display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
//                     padding: "14px", borderRadius: 50, cursor: "pointer",
//                     fontFamily: fontBody, fontSize: 14, fontWeight: 600, color: "white",
//                     background: "linear-gradient(135deg, #EAA89A 0%, #D4857A 100%)",
//                   }}>
//                     <FiUpload size={16} /> Choose a Photo
//                   </label>
//                 </>
//               )}

//               {mode === "webcam" && !previewUrl && !cameraActive && (
//                 <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={startCamera} style={{
//                   display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
//                   padding: "14px", borderRadius: 50, border: "none", cursor: "pointer",
//                   fontFamily: fontBody, fontSize: 14, fontWeight: 600, color: "white",
//                   background: "linear-gradient(135deg, #EAA89A 0%, #D4857A 100%)",
//                 }}>
//                   <FiCamera size={16} /> Turn On Camera
//                 </motion.button>
//               )}

//               {mode === "webcam" && cameraActive && !previewUrl && (
//                 <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={capturePhoto} style={{
//                   display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
//                   padding: "14px", borderRadius: 50, border: "none", cursor: "pointer",
//                   fontFamily: fontBody, fontSize: 14, fontWeight: 600, color: "white",
//                   background: "linear-gradient(135deg, #EAA89A 0%, #D4857A 100%)",
//                 }}>
//                   <FiCamera size={16} /> Capture Photo
//                 </motion.button>
//               )}

//               {previewUrl && (
//                 <>
//                   <motion.button
//                     whileHover={{ scale: loading ? 1 : 1.02 }} whileTap={{ scale: loading ? 1 : 0.98 }}
//                     onClick={handleAnalyze} disabled={loading}
//                     style={{
//                       display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
//                       padding: "14px", borderRadius: 50, border: "none", cursor: loading ? "not-allowed" : "pointer",
//                       fontFamily: fontBody, fontSize: 14, fontWeight: 600, color: "white",
//                       background: loading ? "#E5D1C9" : "linear-gradient(135deg, #EAA89A 0%, #D4857A 100%)",
//                     }}
//                   >
//                     <LuSparkles size={16} /> {loading ? "Analyzing Your Skin..." : "Analyze My Skin"}
//                   </motion.button>
//                   <button onClick={resetAll} disabled={loading} style={{
//                     display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
//                     padding: "12px", borderRadius: 50, border: "1.5px solid rgba(44,24,16,0.15)",
//                     background: "transparent", color: "#6B3D35", cursor: "pointer",
//                     fontFamily: fontBody, fontSize: 13, fontWeight: 500,
//                   }}>
//                     <FiRefreshCw size={14} /> Retake / Choose Different Photo
//                   </button>
//                 </>
//               )}
//             </div>

//             <p style={{ fontFamily: fontBody, fontSize: 11.5, color: "#A0705E", textAlign: "center", marginTop: 18, lineHeight: 1.5 }}>
//               Your photo is analyzed to generate cosmetic skincare insights only — this is not a medical diagnosis. Use a well-lit, front-facing photo for best results.
//             </p>
//           </motion.div>
//         ) : (
//           <AnimatePresence>
//             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: "flex", flexDirection: "column", gap: 18 }}>

//               {/* Score summary */}
//               <div style={{
//                 background: "rgba(255,255,255,0.85)", backdropFilter: "blur(20px)",
//                 border: "1px solid rgba(234,168,154,0.35)", borderRadius: 28,
//                 padding: isMobile ? "28px 20px" : "36px 32px", textAlign: "center",
//                 boxShadow: "0 24px 64px rgba(212,133,122,0.12)",
//               }}>
//                 <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(212,133,122,0.1)", border: "1px solid rgba(212,133,122,0.2)", borderRadius: 50, padding: "6px 16px", marginBottom: 16 }}>
//                   <FiCheckCircle size={14} color="#D4857A" />
//                   <span style={{ fontFamily: fontBody, fontSize: 13, fontWeight: 600, color: "#D4857A" }}>
//                     Skin Type: {result.skinType || "—"}
//                   </span>
//                 </div>
//                 <ScoreRing score={result.overallSkinScore} isMobile={isMobile} />
//                 <p style={{ fontFamily: fontBody, fontSize: 13, color: "#8B5E52", margin: 0, fontWeight: 300 }}>
//                   Overall Skin Score
//                 </p>
//               </div>

//               {/* Conditions grid */}
//               <div>
//                 <h3 style={{ fontFamily: fontHead, fontSize: 19, color: "#2C1810", margin: "0 0 12px" }}>Condition Breakdown</h3>
//                 <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12 }}>
//                   <ConditionCard
//                     title={`Acne${c.acne?.type ? " — " + c.acne.type : ""}`}
//                     severityKey={c.acne?.severity}
//                     areas={c.acne?.affectedAreas}
//                   />
//                   <ConditionCard
//                     title="Blackheads & Whiteheads"
//                     severityKey={c.blackheadsWhiteheads?.severity}
//                     areas={c.blackheadsWhiteheads?.affectedAreas}
//                   />
//                   <ConditionCard
//                     title="Open / Visible Pores"
//                     severityKey={c.pores?.visibility}
//                     areas={c.pores?.affectedAreas}
//                   />
//                   <ConditionCard
//                     title="Dark Spots / Pigmentation"
//                     severityKey={c.pigmentation?.severity}
//                     areas={c.pigmentation?.affectedAreas}
//                   />
//                   <ConditionCard
//                     title="Uneven Skin Tone"
//                     severityKey={c.unevenTone?.severity}
//                   />
//                   <ConditionCard
//                     title="Fine Lines & Wrinkles"
//                     severityKey={c.fineLinesWrinkles?.severity}
//                     areas={c.fineLinesWrinkles?.affectedAreas}
//                   />
//                   <ConditionCard
//                     title="Skin Texture"
//                     severityKey={c.texture?.rating}
//                     detail={c.texture?.notes}
//                   />
//                   <ConditionCard
//                     title="Oiliness / Dryness"
//                     severityKey={c.oilinessDryness?.type}
//                     detail={c.oilinessDryness?.notes}
//                   />
//                   <ConditionCard
//                     title="Sun Damage"
//                     severityKey={c.sunDamage?.severity}
//                     detail={c.sunDamage?.notes}
//                   />
//                 </div>
//               </div>

//               {/* Area-wise analysis */}
//               {Object.keys(areas).length > 0 && (
//                 <div>
//                   <h3 style={{ fontFamily: fontHead, fontSize: 19, color: "#2C1810", margin: "0 0 12px" }}>Area-by-Area Analysis</h3>
//                   <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12 }}>
//                     {Object.entries(AREA_LABELS).map(([key, label]) =>
//                       areas[key] ? (
//                         <div key={key} style={{
//                           background: "white", borderRadius: 18, padding: "16px 18px",
//                           border: "1px solid rgba(234,168,154,0.25)",
//                         }}>
//                           <span style={{ fontFamily: fontBody, fontWeight: 600, fontSize: 13, color: "#D4857A" }}>{label}</span>
//                           <p style={{ fontFamily: fontBody, fontSize: 12.5, color: "#6B3D35", margin: "4px 0 0", lineHeight: 1.5, fontWeight: 300 }}>
//                             {areas[key]}
//                           </p>
//                         </div>
//                       ) : null
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* Recommendations */}
//               {result.recommendations?.length > 0 && (
//                 <div style={{
//                   background: "rgba(255,255,255,0.75)", borderRadius: 22, padding: isMobile ? "20px" : "24px 28px",
//                   border: "1px solid rgba(234,168,154,0.3)",
//                 }}>
//                   <h3 style={{ fontFamily: fontHead, fontSize: 18, color: "#2C1810", margin: "0 0 12px", display: "flex", alignItems: "center", gap: 8 }}>
//                     <LuSparkles size={17} color="#D4857A" /> Recommendations
//                   </h3>
//                   <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }}>
//                     {result.recommendations.map((r, i) => (
//                       <li key={i} style={{ fontFamily: fontBody, fontSize: 13.5, color: "#6B3D35", lineHeight: 1.6, fontWeight: 300 }}>{r}</li>
//                     ))}
//                   </ul>
//                 </div>
//               )}

//               {result.disclaimer && (
//                 <p style={{ fontFamily: fontBody, fontSize: 11.5, color: "#A0705E", textAlign: "center", margin: 0, lineHeight: 1.5 }}>
//                   {result.disclaimer}
//                 </p>
//               )}

//               <motion.button
//                 whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
//                 onClick={resetAll}
//                 style={{
//                   width: "100%", padding: "14px", borderRadius: 50, fontSize: 14, fontWeight: 600,
//                   fontFamily: fontBody, border: "1.5px solid rgba(44,24,16,0.15)", background: "transparent",
//                   color: "#2C1810", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
//                 }}
//               >
//                 <FiRefreshCw size={14} /> Scan Another Photo
//               </motion.button>
//             </motion.div>
//           </AnimatePresence>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SkinAnalysis;
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCamera,
  FiUpload,
  FiRefreshCw,
  FiAlertCircle,
  FiCheckCircle,
} from "react-icons/fi";
import { LuScanFace, LuSparkles } from "react-icons/lu";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

// Constants & Mappings
const AREA_LABELS = {
  forehead: "Forehead",
  nose: "Nose",
  cheeks: "Cheeks",
  chin: "Chin",
};

const SEVERITY_STYLES = {
  none: { label: "None", color: "#4C9A6A", bg: "rgba(76,154,106,0.12)" },
  low: { label: "Low", color: "#4C9A6A", bg: "rgba(76,154,106,0.12)" },
  smooth: { label: "Smooth", color: "#4C9A6A", bg: "rgba(76,154,106,0.12)" },
  mild: { label: "Mild", color: "#C9A227", bg: "rgba(201,162,39,0.12)" },
  medium: { label: "Medium", color: "#C9A227", bg: "rgba(201,162,39,0.12)" },
  "slightly uneven": {
    label: "Slightly Uneven",
    color: "#C9A227",
    bg: "rgba(201,162,39,0.12)",
  },
  moderate: {
    label: "Moderate",
    color: "#D4857A",
    bg: "rgba(212,133,122,0.14)",
  },
  high: { label: "High", color: "#D4857A", bg: "rgba(212,133,122,0.14)" },
  severe: { label: "Severe", color: "#C4453A", bg: "rgba(196,69,58,0.12)" },
  rough: { label: "Rough", color: "#C4453A", bg: "rgba(196,69,58,0.12)" },
};

const getSeverityStyle = (key) =>
  SEVERITY_STYLES[String(key || "").toLowerCase()] || {
    label: key || "—",
    color: "#8B5E52",
    bg: "rgba(139,94,82,0.1)",
  };

const FONT_HEAD = "'Playfair Display', serif";
const FONT_BODY = "'DM Sans', sans-serif";

// ---------- Subcomponents ----------

const ScoreRing = ({ score, isMobile }) => {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const progress = ((score || 0) / 100) * circumference;

  return (
    <div style={{ position: "relative", width: 148, height: 148, margin: "0 auto 20px" }}>
      <svg width="148" height="148" style={{ transform: "rotate(-90deg)" }} aria-hidden="true">
        <circle cx="74" cy="74" r={radius} fill="none" stroke="rgba(234,168,154,0.15)" strokeWidth="10" />
        <motion.circle
          cx="74" cy="74" r={radius} fill="none"
          stroke="url(#skinScoreGradient)" strokeWidth="10"
          strokeLinecap="round" strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="skinScoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EAA89A" />
            <stop offset="100%" stopColor="#D4857A" />
          </linearGradient>
        </defs>
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: FONT_HEAD, fontSize: isMobile ? 32 : 38, fontWeight: 700, color: "#2C1810" }}>
          {score ?? "—"}
        </span>
        <span style={{ fontSize: 12, color: "#A0705E", fontFamily: FONT_BODY }}>/ 100</span>
      </div>
    </div>
  );
};

const ConditionCard = ({ title, severityKey, detail, areas }) => {
  const s = getSeverityStyle(severityKey);
  return (
    <div style={{
      background: "white", borderRadius: 18, padding: "16px 18px",
      border: "1px solid rgba(234,168,154,0.25)", boxShadow: "0 6px 18px rgba(212,133,122,0.06)",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontFamily: FONT_BODY, fontWeight: 600, fontSize: 14, color: "#2C1810" }}>{title}</span>
        <span style={{
          fontFamily: FONT_BODY, fontSize: 11, fontWeight: 600, color: s.color,
          background: s.bg, padding: "3px 10px", borderRadius: 50,
        }}>
          {s.label}
        </span>
      </div>
      {detail && (
        <p style={{ fontFamily: FONT_BODY, fontSize: 12.5, color: "#8B5E52", margin: "4px 0 0", lineHeight: 1.5, fontWeight: 300 }}>
          {detail}
        </p>
      )}
      {areas && areas.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
          {areas.map((a) => (
            <span key={a} style={{
              fontFamily: FONT_BODY, fontSize: 11, color: "#6B3D35",
              background: "rgba(234,168,154,0.12)", padding: "3px 9px", borderRadius: 50,
            }}>
              {a}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

// ---------- Main Container ----------

const SkinAnalysis = () => {
  const { user } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [mode, setMode] = useState("upload");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);

  // Clean up Object URL references to prevent memory leaks
  const updatePreviewUrl = useCallback((newUrl) => {
    setPreviewUrl((prevUrl) => {
      if (prevUrl) URL.revokeObjectURL(prevUrl);
      return newUrl;
    });
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    return () => {
      stopCamera();
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [stopCamera, previewUrl]);

  const startCamera = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 720 }, height: { ideal: 720 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraActive(true);
    } catch (err) {
      setError("Couldn't access your camera. Please allow camera access, or upload a photo instead.");
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob) {
          setImageFile(blob);
          updatePreviewUrl(URL.createObjectURL(blob));
        }
      }, "image/jpeg", 0.92);
    }
    stopCamera();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setResult(null);
    setImageFile(file);
    updatePreviewUrl(URL.createObjectURL(file));
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setError(null);
    setResult(null);
    if (nextMode === "upload") stopCamera();
  };

  const resetAll = () => {
    setImageFile(null);
    updatePreviewUrl(null);
    setResult(null);
    setError(null);
    stopCamera();
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleAnalyze = async () => {
    if (!imageFile) return;
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      const filename = imageFile.name || "face-photo.jpg";
      formData.append("image", imageFile, filename);

      const res = await api.post("/skin-analysis/analyze", formData, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setResult(res.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "We couldn't analyze that photo. Please try a clear, front-facing, well-lit photo."
      );
    } finally {
      setLoading(false);
    }
  };

  const c = result?.conditions || {};
  const areas = result?.areaAnalysis || {};

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #FDF6F0 0%, #FAE8E0 50%, #F5D5C8 100%)",
      paddingTop: isMobile ? 80 : 120,
      paddingBottom: isMobile ? 40 : 80,
      paddingLeft: isMobile ? 16 : 24,
      paddingRight: isMobile ? 16 : 24,
      boxSizing: "border-box",
    }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center", marginBottom: isMobile ? 24 : 36 }}>
          <div style={{ fontFamily: FONT_BODY, fontSize: 11, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", color: "#D4857A", marginBottom: 8 }}>
            AI Photo Analysis
          </div>
          <h1 style={{ fontFamily: FONT_HEAD, fontSize: isMobile ? 28 : 34, fontWeight: 700, color: "#2C1810", margin: "0 0 8px" }}>
            Skin & Face Scan
          </h1>
          <p style={{ fontFamily: FONT_BODY, fontSize: 14, color: "#8B5E52", margin: 0, fontWeight: 300, lineHeight: 1.6 }}>
            Capture or upload a clear, front-facing photo and our AI will scan your skin conditions and key facial areas.
          </p>
        </motion.div>

        {!result ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            style={{
              background: "rgba(255,255,255,0.65)", backdropFilter: "blur(20px)",
              border: "1px solid rgba(234,168,154,0.25)", borderRadius: 28,
              padding: isMobile ? "24px 18px" : "32px 32px",
              boxShadow: "0 20px 48px rgba(212,133,122,0.06)",
              boxSizing: "border-box",
            }}
          >
            {/* Mode selection toggle */}
            {!previewUrl && (
              <div role="tablist" aria-label="Input mode selection" style={{ display: "flex", gap: 8, marginBottom: 20, background: "rgba(234,168,154,0.12)", padding: 6, borderRadius: 50 }}>
                {[
                  { key: "upload", label: "Upload Photo", icon: <FiUpload size={15} /> },
                  { key: "webcam", label: "Use Webcam", icon: <FiCamera size={15} /> },
                ].map((opt) => (
                  <button
                    key={opt.key}
                    role="tab"
                    aria-selected={mode === opt.key}
                    onClick={() => switchMode(opt.key)}
                    style={{
                      flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                      padding: "10px 14px", borderRadius: 50, border: "none", cursor: "pointer",
                      fontFamily: FONT_BODY, fontSize: 13, fontWeight: 600,
                      background: mode === opt.key ? "white" : "transparent",
                      color: mode === opt.key ? "#D4857A" : "#8B5E52",
                      boxShadow: mode === opt.key ? "0 4px 12px rgba(212,133,122,0.15)" : "none",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {opt.icon} {opt.label}
                  </button>
                ))}
              </div>
            )}

            {/* Media Canvas Viewport */}
            <div style={{
              position: "relative", width: "100%", aspectRatio: "1 / 1", maxWidth: 360, margin: "0 auto",
              borderRadius: 24, overflow: "hidden", background: "#2C1810",
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "1px solid rgba(234,168,154,0.3)",
            }}>
              {previewUrl ? (
                <img src={previewUrl} alt="Your captured photo preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : mode === "webcam" && cameraActive ? (
                <video
                  ref={videoRef} autoPlay playsInline muted
                  style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scaleX(-1)" }}
                />
              ) : (
                <div style={{ textAlign: "center", padding: 24 }}>
                  <LuScanFace size={44} color="rgba(234,168,154,0.6)" />
                  <p style={{ fontFamily: FONT_BODY, fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 12 }}>
                    {mode === "upload" ? "No photo selected yet" : "Camera preview will appear here"}
                  </p>
                </div>
              )}
            </div>

            {/* Error Banner */}
            {error && (
              <div role="alert" style={{
                display: "flex", gap: 8, alignItems: "flex-start", marginTop: 16,
                background: "rgba(196,69,58,0.08)", border: "1px solid rgba(196,69,58,0.2)",
                borderRadius: 14, padding: "12px 14px",
              }}>
                <FiAlertCircle size={16} color="#C4453A" style={{ flexShrink: 0, marginTop: 1 }} />
                <span style={{ fontFamily: FONT_BODY, fontSize: 13, color: "#8B4A44", lineHeight: 1.5 }}>{error}</span>
              </div>
            )}

            {/* Actions */}
            <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
              {mode === "upload" && !previewUrl && (
                <>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} id="skin-photo-input" />
                  <label htmlFor="skin-photo-input" style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    padding: "14px", borderRadius: 50, cursor: "pointer",
                    fontFamily: FONT_BODY, fontSize: 14, fontWeight: 600, color: "white",
                    background: "linear-gradient(135deg, #EAA89A 0%, #D4857A 100%)",
                  }}>
                    <FiUpload size={16} /> Choose a Photo
                  </label>
                </>
              )}

              {mode === "webcam" && !previewUrl && !cameraActive && (
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={startCamera} style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  padding: "14px", borderRadius: 50, border: "none", cursor: "pointer",
                  fontFamily: FONT_BODY, fontSize: 14, fontWeight: 600, color: "white",
                  background: "linear-gradient(135deg, #EAA89A 0%, #D4857A 100%)",
                }}>
                  <FiCamera size={16} /> Turn On Camera
                </motion.button>
              )}

              {mode === "webcam" && cameraActive && !previewUrl && (
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={capturePhoto} style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  padding: "14px", borderRadius: 50, border: "none", cursor: "pointer",
                  fontFamily: FONT_BODY, fontSize: 14, fontWeight: 600, color: "white",
                  background: "linear-gradient(135deg, #EAA89A 0%, #D4857A 100%)",
                }}>
                  <FiCamera size={16} /> Capture Photo
                </motion.button>
              )}

              {previewUrl && (
                <>
                  <motion.button
                    whileHover={{ scale: loading ? 1 : 1.02 }} whileTap={{ scale: loading ? 1 : 0.98 }}
                    onClick={handleAnalyze} disabled={loading}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      padding: "14px", borderRadius: 50, border: "none", cursor: loading ? "not-allowed" : "pointer",
                      fontFamily: FONT_BODY, fontSize: 14, fontWeight: 600, color: "white",
                      background: loading ? "#E5D1C9" : "linear-gradient(135deg, #EAA89A 0%, #D4857A 100%)",
                    }}
                  >
                    <LuSparkles size={16} /> {loading ? "Analyzing Your Skin..." : "Analyze My Skin"}
                  </motion.button>
                  <button onClick={resetAll} disabled={loading} style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    padding: "12px", borderRadius: 50, border: "1.5px solid rgba(44,24,16,0.15)",
                    background: "transparent", color: "#6B3D35", cursor: "pointer",
                    fontFamily: FONT_BODY, fontSize: 13, fontWeight: 500,
                  }}>
                    <FiRefreshCw size={14} /> Retake / Choose Different Photo
                  </button>
                </>
              )}
            </div>

            <p style={{ fontFamily: FONT_BODY, fontSize: 11.5, color: "#A0705E", textAlign: "center", marginTop: 18, lineHeight: 1.5 }}>
              Your photo is analyzed to generate cosmetic skincare insights only — this is not a medical diagnosis. Use a well-lit, front-facing photo for best results.
            </p>
          </motion.div>
        ) : (
          <AnimatePresence>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: "flex", flexDirection: "column", gap: 18 }}>

              {/* Score Summary */}
              <div style={{
                background: "rgba(255,255,255,0.85)", backdropFilter: "blur(20px)",
                border: "1px solid rgba(234,168,154,0.35)", borderRadius: 28,
                padding: isMobile ? "28px 20px" : "36px 32px", textAlign: "center",
                boxShadow: "0 24px 64px rgba(212,133,122,0.12)",
              }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(212,133,122,0.1)", border: "1px solid rgba(212,133,122,0.2)", borderRadius: 50, padding: "6px 16px", marginBottom: 16 }}>
                  <FiCheckCircle size={14} color="#D4857A" />
                  <span style={{ fontFamily: FONT_BODY, fontSize: 13, fontWeight: 600, color: "#D4857A" }}>
                    Skin Type: {result.skinType || "—"}
                  </span>
                </div>
                <ScoreRing score={result.overallSkinScore} isMobile={isMobile} />
                <p style={{ fontFamily: FONT_BODY, fontSize: 13, color: "#8B5E52", margin: 0, fontWeight: 300 }}>
                  Overall Skin Score
                </p>
              </div>

              {/* Conditions breakdown grid */}
              <div>
                <h2 style={{ fontFamily: FONT_HEAD, fontSize: 19, color: "#2C1810", margin: "0 0 12px" }}>Condition Breakdown</h2>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12 }}>
                  <ConditionCard
                    title={`Acne${c.acne?.type ? " — " + c.acne.type : ""}`}
                    severityKey={c.acne?.severity}
                    areas={c.acne?.affectedAreas}
                  />
                  <ConditionCard
                    title="Blackheads & Whiteheads"
                    severityKey={c.blackheadsWhiteheads?.severity}
                    areas={c.blackheadsWhiteheads?.affectedAreas}
                  />
                  <ConditionCard
                    title="Open / Visible Pores"
                    severityKey={c.pores?.visibility}
                    areas={c.pores?.affectedAreas}
                  />
                  <ConditionCard
                    title="Dark Spots / Pigmentation"
                    severityKey={c.pigmentation?.severity}
                    areas={c.pigmentation?.affectedAreas}
                  />
                  <ConditionCard
                    title="Uneven Skin Tone"
                    severityKey={c.unevenTone?.severity}
                  />
                  <ConditionCard
                    title="Fine Lines & Wrinkles"
                    severityKey={c.fineLinesWrinkles?.severity}
                    areas={c.fineLinesWrinkles?.affectedAreas}
                  />
                  <ConditionCard
                    title="Skin Texture"
                    severityKey={c.texture?.rating}
                    detail={c.texture?.notes}
                  />
                  <ConditionCard
                    title="Oiliness / Dryness"
                    severityKey={c.oilinessDryness?.type}
                    detail={c.oilinessDryness?.notes}
                  />
                  <ConditionCard
                    title="Sun Damage"
                    severityKey={c.sunDamage?.severity}
                    detail={c.sunDamage?.notes}
                  />
                </div>
              </div>

              {/* Area-wise breakdown */}
              {Object.keys(areas).length > 0 && (
                <div>
                  <h2 style={{ fontFamily: FONT_HEAD, fontSize: 19, color: "#2C1810", margin: "0 0 12px" }}>Area-by-Area Analysis</h2>
                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12 }}>
                    {Object.entries(AREA_LABELS).map(([key, label]) =>
                      areas[key] ? (
                        <div key={key} style={{
                          background: "white", borderRadius: 18, padding: "16px 18px",
                          border: "1px solid rgba(234,168,154,0.25)",
                        }}>
                          <span style={{ fontFamily: FONT_BODY, fontWeight: 600, fontSize: 13, color: "#D4857A" }}>{label}</span>
                          <p style={{ fontFamily: FONT_BODY, fontSize: 12.5, color: "#6B3D35", margin: "4px 0 0", lineHeight: 1.5, fontWeight: 300 }}>
                            {areas[key]}
                          </p>
                        </div>
                      ) : null
                    )}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {result.recommendations?.length > 0 && (
                <div style={{
                  background: "rgba(255,255,255,0.75)", borderRadius: 22, padding: isMobile ? "20px" : "24px 28px",
                  border: "1px solid rgba(234,168,154,0.3)",
                }}>
                  <h2 style={{ fontFamily: FONT_HEAD, fontSize: 18, color: "#2C1810", margin: "0 0 12px", display: "flex", alignItems: "center", gap: 8 }}>
                    <LuSparkles size={17} color="#D4857A" /> Recommendations
                  </h2>
                  <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }}>
                    {result.recommendations.map((r, i) => (
                      <li key={i} style={{ fontFamily: FONT_BODY, fontSize: 13.5, color: "#6B3D35", lineHeight: 1.6, fontWeight: 300 }}>{r}</li>
                    ))}
                  </ul>
                </div>
              )}

              {result.disclaimer && (
                <p style={{ fontFamily: FONT_BODY, fontSize: 11.5, color: "#A0705E", textAlign: "center", margin: 0, lineHeight: 1.5 }}>
                  {result.disclaimer}
                </p>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={resetAll}
                style={{
                  width: "100%", padding: "14px", borderRadius: 50, fontSize: 14, fontWeight: 600,
                  fontFamily: FONT_BODY, border: "1.5px solid rgba(44,24,16,0.15)", background: "transparent",
                  color: "#2C1810", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}
              >
                <FiRefreshCw size={14} /> Scan Another Photo
              </motion.button>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default SkinAnalysis;