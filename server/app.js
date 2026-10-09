import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "./config/env.js";
import { openapi } from "./docs/openapi.js";
import activityRoutes from "./routes/activityRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";

const app = express();
app.use(cors({ origin: config.frontendOrigin }));
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapi));
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api/activities", activityRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/reservations", reservationRoutes);
app.use((err, _req, res, _next) => {
  console.error(err.message);
  res
    .status(500)
    .json({ message: "Ocurrió un error interno. Intenta nuevamente." });
});
if (config.isProduction) {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  app.use(express.static(path.join(root, "dist")));
  app.get("*", (req, res) =>
    res.sendFile(path.join(root, "dist", "index.html")),
  );
}
export default app;
