import jwt from "jsonwebtoken";
import { config } from "../config/env.js";
export function authenticate(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer "))
    return res.status(401).json({ message: "Token requerido" });
  try {
    req.user = jwt.verify(header.slice(7), config.jwtSecret);
    next();
  } catch {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
}
export function authorize(...roles) {
  return (req, res, next) =>
    roles.includes(req.user.role)
      ? next()
      : res
          .status(403)
          .json({ message: "No tienes permisos para esta operación" });
}
