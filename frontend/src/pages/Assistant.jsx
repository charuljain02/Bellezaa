import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

// Import Premium Lucide Icons
import { LuBot, LuSparkles, LuSend } from "react-icons/lu";

const suggestions = [
  "What's the best routine for oily skin?",
  "How do I fade dark spots naturally?",
  "Which vitamin C serum should I try?",
  "Is retinol safe for sensitive skin?",
];

const Assistant = () => {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! I'm your AI beauty assistant ✨ Ask me anything about skincare, ingredients, routines, or product recommendations!",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  
  // Responsive Device State
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleAsk = async (msg) => {
    const query = msg || message;
    if (!query.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text: query }]);
    setMessage("");
    setLoading(true);
    try {
      const res = await api.post(
        "/chat",
        { message: query },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: res.data.answer },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Sorry, I couldn't process that. Please try again! 🌸",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #FDF6F0 0%, #FAE8E0 50%, #F5D5C8 100%)",
        paddingTop: isMobile ? 70 : 100,
        paddingBottom: isMobile ? 16 : 40,
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box"
      }}
    >
      <style>{`
        .chat-scroll::-webkit-scrollbar { width: 5px; }
        .chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .chat-scroll::-webkit-scrollbar-thumb { background: rgba(212,133,122,0.4); border-radius: 10px; }
        .chat-scroll::-webkit-scrollbar-thumb:hover { background: rgba(212,133,122,0.7); }
      `}</style>

      <div
        style={{
          maxWidth: 760,
          margin: "0 auto",
          width: "100%",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: isMobile ? "0 14px" : "0 24px",
          boxSizing: "border-box"
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: isMobile ? 20 : 32 }}
        >
          <div
            style={{
              width: isMobile ? 48 : 64, 
              height: isMobile ? 48 : 64, 
              borderRadius: "50%",
              background: "linear-gradient(135deg, #EAA89A, #D4857A)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 12px",
              color: "#FFF",
              boxShadow: "0 8px 20px rgba(212,133,122,0.2)"
            }}
          >
            <LuBot size={isMobile ? 22 : 28} />
          </div>
          <div
            style={{
              marginBottom: 6, fontSize: 10, fontWeight: 600,
              letterSpacing: 1.5, textTransform: "uppercase",
              color: "#D4857A", fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Powered by AI
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: isMobile ? 26 : 32, fontWeight: 700, color: "#2C1810", margin: "0 0 6px",
            }}
          >
            Beauty Assistant
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: isMobile ? 13.5 : 15, color: "#8B5E52", margin: 0,
            }}
          >
            Your personal skincare expert, available 24/7
          </p>
        </motion.div>

        {/* Suggestions */}
        {messages.length === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              display: "flex", flexWrap: "wrap", gap: 8,
              marginBottom: 20, justifyContent: "center",
            }}
          >
            {suggestions.map((s, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAsk(s)}
                style={{
                  padding: isMobile ? "8px 14px" : "9px 18px", 
                  borderRadius: 50, 
                  fontSize: isMobile ? 12 : 13,
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
                  border: "1.5px solid rgba(234,168,154,0.45)",
                  background: "rgba(255,255,255,0.6)", color: "#6B3D35",
                  cursor: "pointer", backdropFilter: "blur(8px)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(212,133,122,0.1)";
                  e.currentTarget.style.borderColor = "rgba(212,133,122,0.6)";
                  e.currentTarget.style.color = "#D4857A";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.6)";
                  e.currentTarget.style.borderColor = "rgba(234,168,154,0.45)";
                  e.currentTarget.style.color = "#6B3D35";
                }}
              >
                {s}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Chat Window */}
        <div
          style={{
            background: "rgba(255,255,255,0.6)", backdropFilter: "blur(20px)",
            border: "1px solid rgba(234,168,154,0.3)", borderRadius: 24,
            display: "flex", flexDirection: "column",
            height: isMobile ? "calc(100vh - 280px)" : "60vh", 
            minHeight: isMobile ? "380px" : "450px",
            marginBottom: 16, overflow: "hidden",
            boxShadow: "0 8px 32px rgba(212,133,122,0.08)",
          }}
        >
          {/* Messages Container */}
          <div
            className="chat-scroll"
            style={{
              flex: 1, overflowY: "auto", padding: isMobile ? "16px" : "24px",
              display: "flex", flexDirection: "column", gap: 14,
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(212,133,122,0.3) transparent",
            }}
          >
            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    display: "flex",
                    justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                    gap: isMobile ? 8 : 12, alignItems: "flex-end",
                  }}
                >
                  {msg.role === "assistant" && (
                    <div
                      style={{
                        width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                        background: "linear-gradient(135deg, #EAA89A, #D4857A)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#FFF", marginBottom: 2
                      }}
                    >
                      <LuSparkles size={14} />
                    </div>
                  )}

                  <div
                    style={{
                      maxWidth: isMobile ? "85%" : "70%", 
                      padding: isMobile ? "10px 14px" : "14px 18px", 
                      borderRadius: 18,
                      borderBottomLeftRadius: msg.role === "assistant" ? 4 : 18,
                      borderBottomRightRadius: msg.role === "user" ? 4 : 18,
                      background: msg.role === "user"
                        ? "linear-gradient(135deg, #EAA89A, #D4857A)"
                        : "rgba(255,255,255,0.85)",
                      border: msg.role === "user" ? "none" : "1px solid rgba(234,168,154,0.3)",
                      color: msg.role === "user" ? "white" : "#2C1810",
                      fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 13.5 : 14.5,
                      lineHeight: 1.6,
                      boxShadow: "0 4px 16px rgba(212,133,122,0.1)",
                      wordBreak: "break-word"
                    }}
                  >
                    {msg.role === "assistant" ? (
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => (
                            <p style={{ margin: "0 0 6px", lineHeight: 1.6 }}>{children}</p>
                          ),
                          strong: ({ children }) => (
                            <strong style={{ color: "#2C1810", fontWeight: 600 }}>{children}</strong>
                          ),
                          ul: ({ children }) => (
                            <ul style={{ paddingLeft: 18, margin: "6px 0" }}>{children}</ul>
                          ),
                          li: ({ children }) => (
                            <li style={{ marginBottom: 4 }}>{children}</li>
                          ),
                          ol: ({ children }) => (
                            <ol style={{ paddingLeft: 18, margin: "6px 0" }}>{children}</ol>
                          ),
                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>
                    ) : (
                      msg.text
                    )}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ display: "flex", gap: isMobile ? 8 : 12, alignItems: "flex-end" }}
                >
                  <div
                    style={{
                      width: 28, height: 28, borderRadius: "50%",
                      background: "linear-gradient(135deg, #EAA89A, #D4857A)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#FFF",
                    }}
                  >
                    <LuSparkles size={14} />
                  </div>
                  <div
                    style={{
                      padding: "12px 16px", borderRadius: 18, borderBottomLeftRadius: 4,
                      background: "rgba(255,255,255,0.85)",
                      border: "1px solid rgba(234,168,154,0.3)",
                      display: "flex", gap: 5, alignItems: "center",
                    }}
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.15 }}
                        style={{
                          width: 7, height: 7, borderRadius: "50%",
                          background: "linear-gradient(135deg, #EAA89A, #D4857A)",
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={bottomRef} />
          </div>

          {/* Action Footer Input */}
          <div
            style={{
              padding: isMobile ? "12px 14px" : "16px 20px",
              borderTop: "1px solid rgba(234,168,154,0.2)",
              background: "rgba(255,255,255,0.5)",
              display: "flex", gap: 10, alignItems: "flex-end",
            }}
          >
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleAsk();
                }
              }}
              placeholder="Ask me anything..."
              rows={1}
              style={{
                flex: 1, padding: "10px 14px",
                border: "1.5px solid rgba(234,168,154,0.35)",
                borderRadius: 14, background: "rgba(255,255,255,0.7)",
                fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 13.5 : 14.5,
                color: "#2C1810", resize: "none", outline: "none",
                backdropFilter: "blur(8px)", lineHeight: 1.4,
                maxHeight: 100,
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#EAA89A")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(234,168,154,0.35)")}
            />
            <motion.button
              whileHover={{ scale: message.trim() ? 1.04 : 1 }}
              whileTap={{ scale: message.trim() ? 0.96 : 1 }}
              onClick={() => handleAsk()}
              disabled={loading || !message.trim()}
              style={{
                width: isMobile ? 40 : 46, 
                height: isMobile ? 40 : 46, 
                borderRadius: "50%",
                background: message.trim()
                  ? "linear-gradient(135deg, #EAA89A, #D4857A)"
                  : "rgba(234,168,154,0.25)",
                border: "none",
                cursor: message.trim() ? "pointer" : "default",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, transition: "all 0.2s",
                color: message.trim() ? "white" : "rgba(44,24,16,0.35)"
              }}
            >
              <LuSend size={isMobile ? 14 : 16} />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assistant;