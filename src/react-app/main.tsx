import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import "./index.css";
import App from "./App.tsx";

const theme = createTheme({
  colors: {
    brand: [
      "#fef7ed", // Lightest orange tint
      "#fed7aa", // Light orange tint
      "#fdba74", // Medium orange tint
      "#fb923c", // Orange tint
      "#ef8200", // Primary orange
      "#ea580c", // Darker orange
      "#c2410c", // Much darker orange
      "#9a3412", // Deep orange
      "#7c2d12", // Very deep orange
      "#431407", // Darkest orange
    ],
    blue: [
      "#eff6ff", // Lightest blue tint
      "#dbeafe", // Light blue tint
      "#93c5fd", // Medium blue tint
      "#3b82f6", // Blue tint
      "#005ea9", // Primary blue
      "#1e40af", // Darker blue
      "#1e3a8a", // Much darker blue
      "#1e3a8a", // Deep blue
      "#0C1932", // Very deep blue (darkest color)
      "#0C1932", // Darkest blue
    ],
    gray: [
      "#f7f7f7", // Lightest gray (background color)
      "#f1f5f9", // Light gray tint
      "#e2e8f0", // Medium light gray
      "#cbd5e1", // Medium gray
      "#AEA9A6", // Primary gray
      "#94a3b8", // Darker gray
      "#64748b", // Much darker gray
      "#475569", // Deep gray
      "#334155", // Very deep gray
      "#1e293b", // Darkest gray
    ],
  },
  primaryColor: "brand",
  fontFamily:
    "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",
  headings: {
    fontFamily:
      "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  </StrictMode>,
);
