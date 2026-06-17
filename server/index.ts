import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes";
import propertiesRoutes from "./routes/properties";
import projectsRoutes from "./routes/projects";
import leadsRoutes from "./routes/leads";
import profileRoutes from "./routes/profile";
import adminRoutes from "./routes/admin";
import notificationsRoutes from "./routes/notifications";
import { initializeDatabase } from "./db";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  app.set("trust proxy", 1);
  const server = createServer(app);

  // Middleware
  app.use(cors({
    origin: [
      "https://cobquattu.com.br",
      "https://www.cobquattu.com.br"
    ],
    credentials: true
  }));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // Inicializa banco de dados
  try {
    await initializeDatabase();
  } catch (error) {
  console.error("❌ Database initialization failed:");
  console.error(error);
  } 
  // Rotas de autenticação
  app.use("/api", authRoutes);

  // Rotas de recursos
  app.use("/api/properties", propertiesRoutes);
  app.use("/api/projects", projectsRoutes);
  app.use("/api/leads", leadsRoutes);
  app.use("/api/profile", profileRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api/notifications", notificationsRoutes);

  // Serve static files ONLY in production
  if (process.env.NODE_ENV === "production") {
    const staticPath = path.resolve(__dirname, "public");
    app.use(express.static(staticPath));

    // Handle client-side routing - serve index.html for all routes
    app.get("*", (_req, res) => {
      res.sendFile(path.join(staticPath, "index.html"));
    });
  } else {
    // In development, we only handle API routes. 
    // Vite handles the frontend on a different port.
    app.get("/", (_req, res) => {
      res.json({ message: "Cobquattu API is running in development mode" });
    });
  }

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`✅ Server running on http://localhost:${port}/`);
    console.log(`📡 API routes available at http://localhost:${port}/api`);
  });
}

startServer().catch((error) => {
  console.error("❌ Failed to start server:", error);
  process.exit(1);
});


