import { activityService } from "../services/activityService.js";
export const activityController = {
  list: async (req, res, next) => {
    try {
      res.json(await activityService.list(req.query.category));
    } catch (e) {
      next(e);
    }
  },
  get: async (req, res, next) => {
    try {
      const item = await activityService.get(Number(req.params.id));
      if (!item)
        return res.status(404).json({ message: "Actividad no encontrada" });
      res.json(item);
    } catch (e) {
      next(e);
    }
  },
  create: async (req, res, next) => {
    try {
      res.status(201).json(await activityService.create(req.body));
    } catch (e) {
      if (e.status)
        return res
          .status(e.status)
          .json({ message: e.message, fields: e.fields });
      next(e);
    }
  },
};
