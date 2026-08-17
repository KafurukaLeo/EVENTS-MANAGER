import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import swaggerSpec from "./config/swagger.js";

import authRoutes from "./routes/auth.routes.js";
import eventRoutes from "./routes/event.routes.js";
import invitationRoutes from "./routes/invitation.routes.js";
import guestRoutes from "./routes/guest.routes.js";
import registrationRoutes from "./routes/registration.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import ticketRoutes from "./routes/ticket.routes.js";
import qrRoutes from "./routes/qr.routes.js";
import checkinRoutes from "./routes/checkin.routes.js";
import reportRoutes from "./routes/report.routes.js";

import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

/*
 * Security
 */
app.use(helmet());

/*
 * CORS
 */
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  }),
);

/*
 * Body parsers
 */
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

/*
 * Logger
 */
app.use(morgan("dev"));

/*
 * Static uploads
 */
app.use("/uploads", express.static("uploads"));

/*
 * Swagger API Documentation
 */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/*
 * Root route
 */
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Event Management API is running",
  });
});

/*
 * Authentication routes
 */
app.use("/api/auth", authRoutes);

/*
 * Event routes
 */
app.use("/api/events", eventRoutes);

/*
 * Invitation routes
 */
app.use("/api/invitations", invitationRoutes);

/*
 * Guest routes
 */
app.use("/api/guests", guestRoutes);

/*
 * Registration routes
 */
app.use("/api/registrations", registrationRoutes);

/*
 * Payment routes
 */
app.use("/api/payments", paymentRoutes);

/*
 * Ticket routes
 */
app.use("/api/tickets", ticketRoutes);

/*
 * QR routes
 */
app.use("/api/qr", qrRoutes);

/*
 * Check-in routes
 */
app.use("/api/checkin", checkinRoutes);

/*
 * Report routes
 */
app.use("/api/reports", reportRoutes);

/*
 * Global error handler
 */
app.use(errorMiddleware);

export default app;
