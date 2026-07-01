/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      // ── Brand Color Palette ────────────────────────────────────────────────
      // Extracted directly from the reference image
      colors: {
        // Deep navy-blacks used for backgrounds
        zion: {
          black:    "#0A0C10",   // page background (near-black with blue undertone)
          navy:     "#0D1117",   // section alternate bg
          dark:     "#141820",   // card / panel backgrounds
          darker:   "#0F1319",   // footer, deep panels
          card:     "#1A1F2B",   // elevated card surface
          border:   "#252B38",   // subtle borders / dividers
          muted:    "#3A4255",   // muted text / icons
        },

        // Gold / yellow — the signature brand accent
        gold: {
          50:  "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          DEFAULT: "#F5A623",   // primary CTA gold (from "BOOK NOW" button)
          500: "#F5A623",
          600: "#D4891A",       // hover / pressed state
          700: "#B36A10",
          deep: "#C8860D",      // price text gold
        },

        // White / light text scale
        cream: {
          DEFAULT: "#F0EDE6",   // warm off-white headings
          muted:   "#B0BAD0",   // body text on dark
          subtle:  "#6B7794",   // meta / labels
        },

        // Status badges
        available: "#22C55E",   // green "Available" badge
        limited:   "#F59E0B",   // amber "Limited" badge
        full:      "#EF4444",   // red "Full" badge
      },

      // ── Typography ─────────────────────────────────────────────────────────
      fontFamily: {
        // Display: strong, geometric — matches the bold "COMFORT." headline
        display: ["'Montserrat'", "ui-sans-serif", "system-ui", "sans-serif"],
        // Body: clean, readable
        body:    ["'Inter'", "ui-sans-serif", "system-ui", "sans-serif"],
        // Monospace for prices / numbers
        mono:    ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },

      // ── Type scale ─────────────────────────────────────────────────────────
      fontSize: {
        "hero":   ["clamp(2.5rem, 6vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "section": ["clamp(1.4rem, 3vw, 2rem)",  { lineHeight: "1.2",  letterSpacing: "-0.01em" }],
      },

      // ── Spacing & Layout ───────────────────────────────────────────────────
      spacing: {
        "18":  "4.5rem",
        "22":  "5.5rem",
        "30":  "7.5rem",
        "section": "6rem",   // consistent section vertical padding
      },

      // ── Border radius ──────────────────────────────────────────────────────
      borderRadius: {
        "card": "0.75rem",   // 12px — matches the card corners in the image
        "btn":  "0.375rem",  // 6px  — button radius (slightly rounded)
        "badge":"0.25rem",   // 4px  — availability badges
      },

      // ── Box shadows ────────────────────────────────────────────────────────
      boxShadow: {
        "card":    "0 4px 24px rgba(0, 0, 0, 0.45)",
        "card-hover": "0 8px 40px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(245,166,35,0.15)",
        "gold":    "0 0 20px rgba(245,166,35,0.25)",
        "gold-lg": "0 0 40px rgba(245,166,35,0.35)",
        "nav":     "0 2px 20px rgba(0, 0, 0, 0.6)",
        "btn-gold":"0 4px 15px rgba(245,166,35,0.4)",
      },

      // ── Gradients ──────────────────────────────────────────────────────────
      backgroundImage: {
        "hero-gradient":    "linear-gradient(105deg, rgba(10,12,16,0.97) 0%, rgba(10,12,16,0.80) 55%, rgba(10,12,16,0.30) 100%)",
        "gold-gradient":    "linear-gradient(135deg, #F5A623 0%, #D4891A 100%)",
        "dark-gradient":    "linear-gradient(180deg, #0A0C10 0%, #141820 100%)",
        "card-gradient":    "linear-gradient(145deg, #1A1F2B 0%, #141820 100%)",
        "footer-gradient":  "linear-gradient(180deg, #0D1117 0%, #080A0E 100%)",
        "section-divider":  "linear-gradient(90deg, transparent 0%, #F5A623 50%, transparent 100%)",
      },

      // ── Animations ─────────────────────────────────────────────────────────
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          "0%":   { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulse_gold: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(245,166,35,0.4)" },
          "50%":      { boxShadow: "0 0 0 8px rgba(245,166,35,0)" },
        },
      },
      animation: {
        "fade-up":        "fade-up 0.6s ease-out forwards",
        "slide-in-left":  "slide-in-left 0.6s ease-out forwards",
        "shimmer":        "shimmer 2s linear infinite",
        "pulse-gold":     "pulse_gold 2s ease-in-out infinite",
      },

      // ── Transitions ────────────────────────────────────────────────────────
      transitionTimingFunction: {
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      transitionDuration: {
        "250": "250ms",
        "350": "350ms",
      },
    },
  },

  plugins: [],
};
