export const config = {
  port: Number(process.env.PORT || 4000),
  jwtSecret: process.env.JWT_SECRET || "dev-only-secret-change-me",
  frontendOrigin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
  isProduction: process.env.NODE_ENV === "production",
};
