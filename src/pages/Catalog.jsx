import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api.js';
import PageHead from '../components/PageHead.jsx';
export default function Catalog() {
  const [items, setItems] = useState([]),
    [category, setCategory] = useState(""),
    [state, setState] = useState("loading");
  useEffect(() => {
    let live = true;
    setState("loading");
    api
      .activities(category)
      .then((x) => {
        if (live) {
          setItems(x);
          setState("ready");
        }
      })
      .catch(() => live && setState("error"));
    return () => {
      live = false;
    };
  }, [category]);
  const categories = ["Todas", "Aventura", "Cultura"];
  return (
    <>
      <PageHead
        eyebrow="CASO 01 · COMPONENTES, ESTADO Y RUTAS"
        title="Encuentra tu próxima experiencia"
        desc="La lista llega desde la API. Filtra por categoría y abre una ficha dinámica sin recargar la página."
      />
      <div className="toolbar">
        <div>
          <span className="eyebrow">EXPLORAR ACTIVIDADES</span>
          <h2>
            Actividades disponibles{" "}
            <span className="count">{items.length}</span>
          </h2>
        </div>
        <div className="filters">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c === "Todas" ? "" : c)}
              className={`filter ${category === (c === "Todas" ? "" : c) ? "selected" : ""}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      {state === "loading" ? (
        <div className="notice">Cargando actividades…</div>
      ) : state === "error" ? (
        <div className="notice error">
          No pudimos cargar las actividades. Verifica que la API esté
          disponible.
        </div>
      ) : items.length === 0 ? (
        <div className="notice">No hay actividades en esta categoría.</div>
      ) : (
        <div className="activity-grid">
          {items.map((a) => (
            <Link
              to={`/actividad/${a.id}`}
              className="activity-card"
              key={a.id}
            >
              <div className="activity-image">
                <span>{a.image}</span>
                <small>{a.category}</small>
                <div className="activity-arrow">↗</div>
              </div>
              <div className="activity-info">
                <div className="activity-date">
                  {new Date(`${a.date}T12:00:00`).toLocaleDateString("es-BO", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
                <h3>{a.title}</h3>
                <p>{a.description}</p>
                <div className="price-row">
                  <b>Bs {a.price}</b>
                  <span>por persona →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      <div className="tech-note">
        <b>En la defensa</b>
        <span>
          El filtro actualiza el estado del componente, la lista usa{" "}
          <code>key={"{activity.id}"}</code> y <code>useEffect</code> vuelve a
          consultar al cambiar la categoría.
        </span>
      </div>
    </>
  );
}
