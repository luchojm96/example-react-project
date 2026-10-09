import { activityRepository } from "../repositories/dataStore.js";
export const activityService = {
  list: (category) => activityRepository.list(category),
  get: (id) => activityRepository.findById(id),
  findUser: (email) => activityRepository.findUserByEmail(email),
  async create(input = {}) {
    const fields = {};
    for (const key of ["title", "category", "date"])
      if (typeof input[key] !== "string" || !input[key].trim())
        fields[key] = "Este campo es obligatorio.";
    if (!Number.isFinite(Number(input.price)) || Number(input.price) <= 0)
      fields.price = "Debe ser un número mayor que cero.";
    if (Object.keys(fields).length)
      throw Object.assign(new Error("Revisa los datos enviados."), {
        status: 400,
        fields,
      });
    return activityRepository.create({
      title: input.title.trim(),
      category: input.category.trim(),
      date: input.date,
      price: Number(input.price),
      description: String(input.description || "").trim(),
    });
  },
};
