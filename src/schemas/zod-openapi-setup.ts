import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

// Extend Zod with OpenAPI functionality first, before any schemas are imported
extendZodWithOpenApi(z);

export { z };
