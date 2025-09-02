import { Hono } from "hono";
import { cors } from "hono/cors";
import { validateProcess, type Process } from "../schemas/process";
import { validateTerm, type Term } from "../schemas/term";
import { fitsmTerms } from "../data/fitsm-terms";
import { openApiDocument } from "../schemas/openapi";

interface Env {
  ASSETS: Fetcher;
}

const app = new Hono<{ Bindings: Env }>();

// Add CORS middleware for API routes
app.use(
  "/api/*",
  cors({
    origin: [
      "http://localhost:5173",
      "https://fitsm.dev",
      "https://*.fitsm.dev",
    ],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  }),
);

// API Routes
const api = new Hono<{ Bindings: Env }>();

// Root API endpoint
api.get("/", (c) =>
  c.json({
    name: "FitSM API",
    version: "1.0.0",
    description: "FitSM standard implementation for developers",
    documentation: "https://fitsm.dev/docs",
  }),
);

// FitSM standard processes as defined in the framework
const sampleProcesses: Process[] = [
  {
    id: "spm",
    name: "Service Portfolio Management",
    description:
      "Ensures that services are clearly defined and that appropriate service portfolio decisions are made",
    type: "strategic",
    objective:
      "To ensure that the service provider has the right mix of services to meet business outcomes at an appropriate level of investment",
    inputs: ["Business requirements", "Service strategy", "Market analysis"],
    outputs: ["Service portfolio", "Service pipeline", "Service catalog"],
  },
  {
    id: "rlm",
    name: "Service Level Management",
    description:
      "Ensures that all current and planned IT services are delivered to agreed achievable targets",
    type: "tactical",
    objective:
      "To define, document, agree, monitor, measure, report and review the level of IT services provided",
    inputs: ["Business requirements", "Service catalog", "Performance data"],
    outputs: [
      "Service level agreements",
      "Service level reports",
      "Improvement plans",
    ],
  },
  {
    id: "ism",
    name: "Incident Management",
    description:
      "Ensures that normal service operation is restored as quickly as possible with minimal impact",
    type: "operational",
    objective:
      "To restore normal service operation as quickly as possible and to minimize the impact on business operations",
    inputs: ["Incident reports", "Service information", "Known error database"],
    outputs: [
      "Resolved incidents",
      "Incident records",
      "Management information",
    ],
  },
];

// Processes endpoint
api.get("/processes", (c) => {
  return c.json({
    processes: sampleProcesses,
    total: sampleProcesses.length,
  });
});

api.get("/processes/:id", (c) => {
  const id = c.req.param("id");
  const process = sampleProcesses.find((p) => p.id === id);

  if (!process) {
    return c.json({ error: "Process not found" }, 404);
  }

  return c.json(process);
});

// Create a new process with Zod validation
api.post("/processes", async (c) => {
  try {
    const body = await c.req.json();
    const validation = validateProcess(body);

    if (!validation.success) {
      return c.json(
        {
          error: "Validation failed",
          details: validation.error,
        },
        400,
      );
    }

    // In a real app, you'd save to database here
    const newProcess = validation.data!;
    sampleProcesses.push(newProcess);

    return c.json(newProcess, 201);
  } catch {
    return c.json({ error: "Invalid JSON" }, 400);
  }
});

// FitSM terms from the official vocabulary (Chapter 6)
const allTerms: Term[] = fitsmTerms;

// Terms endpoints
api.get("/terms", (c) => {
  return c.json({
    terms: allTerms,
    total: allTerms.length,
  });
});

// Get all term names (simple list for autocomplete/reference)
api.get("/terms/all", (c) => {
  const termNames = allTerms.map((term) => term.term).sort();
  return c.json({
    terms: termNames,
    total: termNames.length,
  });
});

// Get a single term by ID or slug
api.get("/terms/:identifier", (c) => {
  const identifier = c.req.param("identifier");

  // Try to find by ID first (if it's a number)
  const numId = parseInt(identifier, 10);
  let term = !isNaN(numId) ? allTerms.find((t) => t.id === numId) : null;

  // If not found by ID, try to find by slug
  if (!term) {
    term = allTerms.find((t) => t.slug === identifier);
  }

  if (!term) {
    return c.json({ error: "Term not found" }, 404);
  }

  return c.json(term);
});

// Create a new term with Zod validation
api.post("/terms", async (c) => {
  try {
    const body = await c.req.json();
    const validation = validateTerm(body);

    if (!validation.success) {
      return c.json(
        {
          error: "Validation failed",
          details: validation.error,
        },
        400,
      );
    }

    // In a real app, you'd save to database here
    const newTerm = validation.data!;
    allTerms.push(newTerm);

    return c.json(newTerm, 201);
  } catch {
    return c.json({ error: "Invalid JSON" }, 400);
  }
});

// Mount API routes
app.route("/api/v1", api);

// Health check endpoint
app.get("/health", (c) =>
  c.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  }),
);

// OpenAPI specification endpoints
app.get("/api/openapi.json", (c) => {
  c.header("Content-Type", "application/json");
  return c.json(openApiDocument);
});

// Swagger UI / API Documentation
app.get("/docs", (c) => {
  const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>FitSM API Documentation</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui.css" />
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui-bundle.js" crossorigin></script>
    <script>
      window.onload = () => {
        window.ui = SwaggerUIBundle({
          url: '/api/openapi.json',
          dom_id: '#swagger-ui',
          presets: [
            SwaggerUIBundle.presets.apis,
            SwaggerUIBundle.presets.standalone,
          ],
        });
      };
    </script>
  </body>
</html>
  `;
  return c.html(html);
});

// Serve static assets (React app)
app.get("*", async (c) => {
  // If the request is for an API route that doesn't exist, return 404
  if (c.req.url.includes("/api/")) {
    return c.json({ error: "API endpoint not found" }, 404);
  }

  // Otherwise, serve the React app
  return c.env.ASSETS.fetch(c.req.raw);
});

export default app;
