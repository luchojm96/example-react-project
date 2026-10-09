import {
  activityRepository,
  reservationRepository,
} from "../repositories/dataStore.js";
export const reservationService = {
  list: (userId) => reservationRepository.listByUser(userId),
  async create(userId, input = {}) {
    const id = Number(input.activityId);
    if (!Number.isInteger(id) || id < 1)
      throw Object.assign(new Error("Selecciona una actividad válida."), {
        status: 400,
      });
    const activity = await activityRepository.findById(id);
    if (!activity)
      throw Object.assign(new Error("Actividad no encontrada."), {
        status: 404,
      });
    return reservationRepository.create(userId, activity);
  },
};
