import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import bcrypt from "bcryptjs";
const file = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "data.json",
);
const initial = {
  activities: [
    {
      id: 1,
      title: "Trekking Valle de la Luna",
      category: "Aventura",
      date: "2026-10-12",
      price: 180,
      description: "Recorrido guiado al atardecer por formaciones únicas.",
      image: "🏜️",
    },
    {
      id: 2,
      title: "Taller de cocina andina",
      category: "Cultura",
      date: "2026-10-18",
      price: 120,
      description: "Sabores tradicionales e ingredientes locales.",
      image: "🍲",
    },
    {
      id: 3,
      title: "Kayak en el lago",
      category: "Aventura",
      date: "2026-10-24",
      price: 240,
      description: "Una mañana tranquila sobre el agua.",
      image: "🛶",
    },
    {
      id: 4,
      title: "Ruta de arquitectura paceña",
      category: "Cultura",
      date: "2026-11-02",
      price: 90,
      description: "Historias y fachadas del centro histórico.",
      image: "🏛️",
    },
  ],
  reservations: [],
  users: [
    {
      id: "u1",
      name: "Admin Demo",
      email: "admin@demo.com",
      role: "admin",
      passwordHash: await bcrypt.hash("admin123", 10),
    },
    {
      id: "u2",
      name: "Ana Pérez",
      email: "ana@demo.com",
      role: "customer",
      passwordHash: await bcrypt.hash("ana123", 10),
    },
  ],
};
let writeQueue = Promise.resolve();
async function read() {
  try {
    return JSON.parse(await fs.readFile(file, "utf8"));
  } catch (err) {
    if (err.code !== "ENOENT") throw err;
    await write(initial);
    return structuredClone(initial);
  }
}
async function write(data) {
  writeQueue = writeQueue.then(() =>
    fs.writeFile(file, JSON.stringify(data, null, 2)),
  );
  return writeQueue;
}
export const activityRepository = {
  async list(category) {
    return (await read()).activities.filter(
      (a) => !category || a.category === category,
    );
  },
  async findById(id) {
    return (await read()).activities.find((a) => a.id === id);
  },
  async create(input) {
    const db = await read();
    const item = {
      ...input,
      id: Math.max(0, ...db.activities.map((a) => a.id)) + 1,
      image: "✨",
    };
    db.activities.push(item);
    await write(db);
    return item;
  },
  async findUserByEmail(email) {
    return (await read()).users.find((u) => u.email === email);
  },
};
export const reservationRepository = {
  async listByUser(userId) {
    return (await read()).reservations
      .filter((r) => r.userId === userId)
      .sort((a, b) => a.date.localeCompare(b.date));
  },
  async create(userId, activity) {
    const db = await read();
    const item = {
      id: crypto.randomUUID(),
      userId,
      activityId: activity.id,
      title: activity.title,
      date: activity.date,
      createdAt: new Date().toISOString(),
    };
    db.reservations.push(item);
    await write(db);
    return item;
  },
};
