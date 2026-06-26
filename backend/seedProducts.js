const products = [
  // --- OILY ---
  { name: "COSRX Low pH Good Morning Cleanser", brand: "COSRX", skinType: "oily", concern: "acne", category: "Cleanser", timeOfDay: "both", ingredients: ["Salicylic Acid"], benefits: ["Deep Cleansing", "Oil Control"], rating: 4.7 },
  { name: "Minimalist Niacinamide 10% + Zinc", brand: "Minimalist", skinType: "oily", concern: "acne", category: "Serum", timeOfDay: "both", ingredients: ["Niacinamide", "Zinc PCA"], benefits: ["Oil Control", "Acne Reduction"], rating: 4.5 },
  { name: "Neutrogena Hydro Boost Gel Cream", brand: "Neutrogena", skinType: "oily", concern: "acne", category: "Moisturizer", timeOfDay: "both", ingredients: ["Hyaluronic Acid"], benefits: ["Lightweight Hydration"], rating: 4.6 },
  { name: "Bioré UV Aqua Rich Sunscreen SPF50", brand: "Bioré", skinType: "oily", concern: "acne", category: "Sunscreen", timeOfDay: "morning", ingredients: ["SPF50"], benefits: ["Sun Protection", "Lightweight"], rating: 4.8 },
  { name: "COSRX Salicylic Acid Cleanser", brand: "COSRX", skinType: "oily", concern: "pores", category: "Cleanser", timeOfDay: "both", ingredients: ["Salicylic Acid"], benefits: ["Unclogs Pores"], rating: 4.6 },
  { name: "The Ordinary Niacinamide 10%", brand: "The Ordinary", skinType: "oily", concern: "pores", category: "Serum", timeOfDay: "both", ingredients: ["Niacinamide"], benefits: ["Pore Minimizing"], rating: 4.5 },
  { name: "Minimalist Oil Free Moisturizer", brand: "Minimalist", skinType: "oily", concern: "pores", category: "Moisturizer", timeOfDay: "both", ingredients: ["Niacinamide", "Zinc"], benefits: ["Oil Control"], rating: 4.4 },

  // --- DRY ---
  { name: "CeraVe Hydrating Facial Cleanser", brand: "CeraVe", skinType: "dry", concern: "dryness", category: "Cleanser", timeOfDay: "both", ingredients: ["Ceramides", "Hyaluronic Acid"], benefits: ["Deep Hydration"], rating: 4.8 },
  { name: "The Ordinary Hyaluronic Acid 2%", brand: "The Ordinary", skinType: "dry", concern: "dryness", category: "Serum", timeOfDay: "both", ingredients: ["Hyaluronic Acid"], benefits: ["Intense Hydration"], rating: 4.7 },
  { name: "CeraVe Moisturising Cream", brand: "CeraVe", skinType: "dry", concern: "dryness", category: "Moisturizer", timeOfDay: "both", ingredients: ["Ceramides"], benefits: ["Barrier Repair"], rating: 4.9 },
  { name: "COSRX Snail Mucin Essence", brand: "COSRX", skinType: "dry", concern: "dryness", category: "Essence", timeOfDay: "night", ingredients: ["Snail Secretion Filtrate"], benefits: ["Repair", "Hydration"], rating: 4.8 },
  { name: "La Roche-Posay Toleriane Cleanser", brand: "La Roche-Posay", skinType: "dry", concern: "dryness", category: "Cleanser", timeOfDay: "both", ingredients: ["Glycerin"], benefits: ["Gentle Cleansing"], rating: 4.7 },

  // --- COMBINATION ---
  { name: "Cetaphil Gentle Skin Cleanser", brand: "Cetaphil", skinType: "combination", concern: "dullness", category: "Cleanser", timeOfDay: "both", ingredients: ["Glycerin"], benefits: ["Gentle Cleansing"], rating: 4.6 },
  { name: "Dot & Key Vitamin C Sunscreen", brand: "Dot & Key", skinType: "combination", concern: "dullness", category: "Sunscreen", timeOfDay: "morning", ingredients: ["SPF50", "Vitamin C"], benefits: ["Brightening", "Sun Protection"], rating: 4.4 },
  { name: "The Ordinary Vitamin C Suspension", brand: "The Ordinary", skinType: "combination", concern: "dullness", category: "Serum", timeOfDay: "morning", ingredients: ["Vitamin C"], benefits: ["Brightening", "Radiance"], rating: 4.3 },
  { name: "Neutrogena Oil Free Moisturizer", brand: "Neutrogena", skinType: "combination", concern: "dullness", category: "Moisturizer", timeOfDay: "both", ingredients: ["Hyaluronic Acid"], benefits: ["Balanced Hydration"], rating: 4.5 },

  // --- SENSITIVE ---
  { name: "Cetaphil Gentle Skin Cleanser", brand: "Cetaphil", skinType: "sensitive", concern: "sensitivity", category: "Cleanser", timeOfDay: "both", ingredients: ["Glycerin"], benefits: ["Gentle Cleansing", "Calming"], rating: 4.7 },
  { name: "La Roche-Posay Cicaplast Serum", brand: "La Roche-Posay", skinType: "sensitive", concern: "sensitivity", category: "Serum", timeOfDay: "both", ingredients: ["Centella Asiatica"], benefits: ["Calming", "Repair"], rating: 4.6 },
  { name: "Kiehl's Ultra Facial Cream", brand: "Kiehl's", skinType: "sensitive", concern: "sensitivity", category: "Moisturizer", timeOfDay: "both", ingredients: ["Squalane"], benefits: ["24-Hour Hydration"], rating: 4.6 },
  { name: "Altamodis Mineral Sunscreen SPF50", brand: "Altamodis", skinType: "sensitive", concern: "sensitivity", category: "Sunscreen", timeOfDay: "morning", ingredients: ["Zinc Oxide"], benefits: ["Gentle Sun Protection"], rating: 4.5 },

  // --- NORMAL ---
  { name: "Simple Kind to Skin Cleanser", brand: "Simple", skinType: "normal", concern: "anti-aging", category: "Cleanser", timeOfDay: "both", ingredients: ["Vitamin B3"], benefits: ["Gentle Cleansing"], rating: 4.5 },
  { name: "The Ordinary Retinol 0.5%", brand: "The Ordinary", skinType: "normal", concern: "anti-aging", category: "Serum", timeOfDay: "night", ingredients: ["Retinol", "Squalane"], benefits: ["Anti-Aging", "Cell Turnover"], rating: 4.3 },
  { name: "Olay Regenerist Moisturizer", brand: "Olay", skinType: "normal", concern: "anti-aging", category: "Moisturizer", timeOfDay: "both", ingredients: ["Niacinamide", "Peptides"], benefits: ["Firming", "Hydration"], rating: 4.6 },
  { name: "The Derma Co Vitamin C Serum", brand: "The Derma Co", skinType: "normal", concern: "pigmentation", category: "Serum", timeOfDay: "morning", ingredients: ["Vitamin C", "Niacinamide"], benefits: ["Brightening", "Pigmentation Control"], rating: 4.2 },
  { name: "Minimalist SPF 50 Sunscreen", brand: "Minimalist", skinType: "normal", concern: "pigmentation", category: "Sunscreen", timeOfDay: "morning", ingredients: ["SPF50"], benefits: ["Sun Protection"], rating: 4.5 },
];