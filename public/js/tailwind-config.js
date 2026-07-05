// Config de Tailwind (vía CDN) con el sistema de diseño de Barley.
// Se incluye en <head> antes de cargar el script de Tailwind.
tailwind.config = {
  theme: {
    extend: {
      colors: {
        barbg: "#171310",
        barsurface: "#221c16",
        barsurface2: "#2b241c",
        barline: "#3a2f22",
        gold: "#e3a548",
        golddeep: "#b9803a",
        cream: "#f3ead9",
        muted: "#a4967d",
        brick: "#c9563a",
        greenok: "#7a9b5e",
      },
      fontFamily: {
        display: ["Anton", "sans-serif"],
        body: ["Work Sans", "sans-serif"],
        mono2: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        xl2: "14px",
      },
      maxWidth: {
        app: "640px",
      },
    },
  },
};
