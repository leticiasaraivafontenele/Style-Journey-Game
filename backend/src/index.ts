import { loadEnv } from "./config/env.js";
loadEnv();

import express from "express";
import cors from "cors";
import { dbConnection } from "./db/dbconnetion.js";
import router from "./route/routes.js";
import cookie from "cookie-parser";
import { serverConfig } from "./config/database.js";
import { aiEvaluationService } from "./service/aiEvaluationService.js";

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(cookie());
app.use("/api", router);

const startServer = async () => {
  try {
    await dbConnection();
    console.log("Database initialized successfully");
    
    const server = app.listen(serverConfig.port, () => {
      console.log(`Server is running on port ${serverConfig.port}`);
      console.log(`Environment: ${serverConfig.nodeEnv}`);
      void aiEvaluationService.warmup();
    });

    server.on('error', (error: NodeJS.ErrnoException) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`\n❌ ERROR: Port ${serverConfig.port} is already in use!`);
        process.exit(1);
      } else {
        console.error("Server error:", error);
        process.exit(1);
      }
    });

    const gracefulShutdown = () => {
      console.log('\n🛑 Shutting down gracefully...');
      server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
      });

      setTimeout(() => {
        console.error('⚠️  Forcing shutdown...');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGINT', gracefulShutdown);

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
