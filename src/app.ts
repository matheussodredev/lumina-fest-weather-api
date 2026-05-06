import express from "express";
import cors from "cors";
import { healthRoutes } from "./routes/health.routes";
import { weatherRoutes } from "./routes/weather.routes";
import { errorHandler } from "./middlewares/errorHandler";

export const app = express();

app.use(cors());
app.use(express.json());
app.use("/health", healthRoutes);
app.use("/weather", weatherRoutes);
app.use(errorHandler);