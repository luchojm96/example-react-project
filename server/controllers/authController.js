import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { activityService } from "../services/activityService.js";
import { config } from "../config/env.js";
export const authController = {
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body || {};
      const user = await activityService.findUser(email);
      if (!user || !(await bcrypt.compare(password || "", user.passwordHash)))
        return res
          .status(401)
          .json({ message: "Correo o contraseña incorrectos" });
      const token = jwt.sign(
        { sub: user.id, email: user.email, role: user.role },
        config.jwtSecret,
        { expiresIn: "2h" },
      );
      res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        expiresIn: 7200,
      });
    } catch (e) {
      next(e);
    }
  },
};
