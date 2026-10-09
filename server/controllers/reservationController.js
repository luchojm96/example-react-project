import { reservationService } from "../services/reservationService.js";
export const reservationController = {
  list: async (req, res, next) => {
    try {
      res.json(await reservationService.list(req.user.sub));
    } catch (e) {
      next(e);
    }
  },
  create: async (req, res, next) => {
    try {
      res
        .status(201)
        .json(await reservationService.create(req.user.sub, req.body));
    } catch (e) {
      if (e.status) return res.status(e.status).json({ message: e.message });
      next(e);
    }
  },
};
