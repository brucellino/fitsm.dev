import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from "@asteasolutions/zod-to-openapi";
import { z } from "./zod-openapi-setup";
import { ProcessSchema } from "./process";
import { TermSchema } from "./term";

// Create OpenAPI registry
const registry = new OpenAPIRegistry();

// Register our schemas with OpenAPI metadata
const ProcessSchemaWithOpenApi = ProcessSchema.openapi("Process", {
  description: "A FitSM process definition from the standard framework",
  example: {
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
});

const TermSchemaWithOpenApi = TermSchema.openapi("Term", {
  description: "A vocabulary term from the FitSM standard (Chapter 6)",
  example: {
    id: 1,
    number: "6.1",
    term: "Activity",
    slug: "activity",
    definition: "Set of actions carried out within a process",
  },
});

// Register schemas
registry.register("Process", ProcessSchemaWithOpenApi);
registry.register("Term", TermSchemaWithOpenApi);

// Response schemas
const ProcessListResponse = z
  .object({
    processes: z.array(ProcessSchemaWithOpenApi),
    total: z.number(),
  })
  .openapi("ProcessListResponse");

const TermListResponse = z
  .object({
    terms: z.array(TermSchemaWithOpenApi),
    total: z.number(),
  })
  .openapi("TermListResponse");

const TermNamesResponse = z
  .object({
    terms: z.array(z.string()),
    total: z.number(),
  })
  .openapi("TermNamesResponse", {
    description: "List of term names only",
    example: {
      terms: ["Activity", "Assessment", "Audit", "Availability"],
      total: 4,
    },
  });

const ErrorResponse = z
  .object({
    error: z.string(),
    details: z.string().optional(),
  })
  .openapi("ErrorResponse");

const ApiInfoResponse = z
  .object({
    name: z.string(),
    version: z.string(),
    description: z.string(),
    documentation: z.string(),
  })
  .openapi("ApiInfoResponse");

registry.register("ProcessListResponse", ProcessListResponse);
registry.register("TermListResponse", TermListResponse);
registry.register("TermNamesResponse", TermNamesResponse);
registry.register("ErrorResponse", ErrorResponse);
registry.register("ApiInfoResponse", ApiInfoResponse);

// Register API paths
registry.registerPath({
  method: "get",
  path: "/api/v1",
  description: "Get API information and status",
  summary: "API Information",
  tags: ["General"],
  responses: {
    200: {
      description: "API information",
      content: {
        "application/json": {
          schema: ApiInfoResponse,
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/api/v1/processes",
  description: "Get all FitSM processes",
  summary: "List all processes",
  tags: ["Processes"],
  responses: {
    200: {
      description: "List of FitSM processes",
      content: {
        "application/json": {
          schema: ProcessListResponse,
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/api/v1/processes/{id}",
  description: "Get a specific FitSM process by ID",
  summary: "Get process by ID",
  tags: ["Processes"],
  request: {
    params: z.object({
      id: z.string().openapi({ description: "Process ID" }),
    }),
  },
  responses: {
    200: {
      description: "FitSM process details",
      content: {
        "application/json": {
          schema: ProcessSchemaWithOpenApi,
        },
      },
    },
    404: {
      description: "Process not found",
      content: {
        "application/json": {
          schema: ErrorResponse,
        },
      },
    },
  },
});

registry.registerPath({
  method: "post",
  path: "/api/v1/processes",
  description: "Create a new FitSM process",
  summary: "Create process",
  tags: ["Processes"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: ProcessSchemaWithOpenApi,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Process created successfully",
      content: {
        "application/json": {
          schema: ProcessSchemaWithOpenApi,
        },
      },
    },
    400: {
      description: "Validation error",
      content: {
        "application/json": {
          schema: ErrorResponse,
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/api/v1/terms",
  description: "Get all FitSM vocabulary terms from Chapter 6",
  summary: "List all terms",
  tags: ["Terms"],
  responses: {
    200: {
      description: "List of FitSM vocabulary terms",
      content: {
        "application/json": {
          schema: TermListResponse,
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/api/v1/terms/all",
  description:
    "Get all FitSM vocabulary term names only (useful for autocomplete or quick reference)",
  summary: "List all term names",
  tags: ["Terms"],
  responses: {
    200: {
      description: "List of term names only",
      content: {
        "application/json": {
          schema: TermNamesResponse,
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/api/v1/terms/{identifier}",
  description:
    "Get a specific term by slug (e.g., 'activity') or ID (e.g., '1')",
  summary: "Get term by slug or ID",
  tags: ["Terms"],
  request: {
    params: z.object({
      identifier: z.string().openapi({
        description:
          "Term slug (e.g., 'activity', 'configuration-item') or numeric ID (e.g., '1', '16')",
        example: "activity",
      }),
    }),
  },
  responses: {
    200: {
      description: "FitSM vocabulary term",
      content: {
        "application/json": {
          schema: TermSchemaWithOpenApi,
        },
      },
    },
    404: {
      description: "Term not found",
      content: {
        "application/json": {
          schema: ErrorResponse,
        },
      },
    },
  },
});

registry.registerPath({
  method: "post",
  path: "/api/v1/terms",
  description: "Create a new vocabulary term",
  summary: "Create term",
  tags: ["Terms"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: TermSchemaWithOpenApi,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Term created successfully",
      content: {
        "application/json": {
          schema: TermSchemaWithOpenApi,
        },
      },
    },
    400: {
      description: "Validation error",
      content: {
        "application/json": {
          schema: ErrorResponse,
        },
      },
    },
  },
});

// Generate OpenAPI specification
const generator = new OpenApiGeneratorV3(registry.definitions);

export const openApiDocument = generator.generateDocument({
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "FitSM API",
    description:
      "A comprehensive API implementing the FitSM standard for IT Service Management. This API provides access to FitSM processes, vocabulary terms, and other standard entities for developers building ITSM solutions.",
    contact: {
      name: "FitSM.dev",
      url: "https://fitsm.dev",
    },
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
  },
  servers: [
    {
      url: "https://fitsm.dev",
      description: "Production server",
    },
    {
      url: "http://localhost:8787",
      description: "Development server",
    },
  ],
  tags: [
    {
      name: "General",
      description: "General API information and health checks",
    },
    {
      name: "Processes",
      description: "FitSM process definitions and management",
    },
    {
      name: "Terms",
      description: "FitSM vocabulary terms from Chapter 6",
    },
  ],
});

// Export the JSON specification
export const openApiJson = JSON.stringify(openApiDocument, null, 2);
