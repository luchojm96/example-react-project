import { useEffect,useState } from 'react';
import { Link,useParams } from 'react-router-dom';
import { api } from '../api.js';
import PageHead from '../components/PageHead.jsx';
export default function Detail() {
  const { id } = useParams(),
    [item, setItem] = useState(null),
    [status, setStatus] = useState("loading"),
    [msg, setMsg] = useState("");
  useEffect(() => {
    let live = true;
    api
      .activity(id)
      .then((x) => {
        if (live) {
          setItem(x);
          setStatus("ready");
        }
      })
      .catch(() => live && setStatus("error"));
    return () => {
      live = false;
    };
  }, [id]);
  async function reserve() {
    try {
      await api.reserve(item.id);
      setMsg("Reserva guardada. Consulta el caso 03 para verla.");
    } catch (e) {
      setMsg("Inicia sesión desde el caso 04 para reservar. " + e.message);
    }
  }
  if (status === "loading")
    return (
      <PageHead
        eyebrow="DETALLE DE ACTIVIDAD"
        title="Cargando ficha…"
        desc="Consultando la API."
      />
    );
  if (status === "error" || !item)
    return (
      <>
        <PageHead
          eyebrow="DETALLE DE ACTIVIDAD"
          title="No encontramos esa actividad"
          desc="Puede que el enlace haya cambiado."
        />
        <Link to="/caso/1" className="button secondary">
          ← Volver al catálogo
        </Link>
      </>
    );
  return (
    <>
      <Link to="/caso/1" className="back-link">
        ← Todas las actividades
      </Link>
      <div className="detail-layout">
        <div className="detail-visual">
          {item.image}
          <span>{item.category}</span>
        </div>
        <div className="detail-copy">
          <div className="eyebrow">FICHA DE ACTIVIDAD · #{item.id}</div>
          <h1>{item.title}</h1>
          <p>{item.description}</p>
          <div className="detail-facts">
            <div>
              <small>FECHA</small>
              <b>
                {new Date(`${item.date}T12:00:00`).toLocaleDateString("es-BO", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </b>
            </div>
            <div>
              <small>PRECIO</small>
              <b>
                Bs {item.price} <small>/ persona</small>
              </b>
            </div>
          </div>
          <button className="button primary" onClick={reserve}>
            Reservar actividad <span>→</span>
          </button>
          {msg && <div className="inline-message">{msg}</div>}
          <div className="tech-note">
            <b>Ruta dinámica</b>
            <span>
              <code>/actividad/:id</code> lee el parámetro con{" "}
              <code>useParams</code> y solicita el recurso al backend.
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
