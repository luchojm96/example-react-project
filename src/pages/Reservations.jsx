import { useEffect,useState } from 'react';
import { api } from '../api.js';
import PageHead from '../components/PageHead.jsx';
export default function Reservations({ user }) {
  const [rows, setRows] = useState([]),
    [error, setError] = useState("");
  useEffect(() => {
    if (user)
      api
        .reservations()
        .then(setRows)
        .catch((e) => setError(e.message));
  }, [user]);
  return (
    <>
      <PageHead
        eyebrow="CASO 03 · PERSISTENCIA Y ARQUITECTURA POR CAPAS"
        title="Reservas que se conservan"
        desc="La ruta delega en el controlador, el servicio aplica las reglas y el repositorio persiste en disco."
      />
      <div className="layer-diagram">
        {[
          ["01", "RUTA", "POST /reservations"],
          ["02", "SERVICIO", "Valida actividad y usuario"],
          ["03", "REPOSITORIO", "Lee y guarda data.json"],
          ["04", "RESPUESTA", "Reserva ordenada por fecha"],
        ].map(([n, a, b], i) => (
          <div className="layer" key={n}>
            <small>{n}</small>
            <b>{a}</b>
            <span>{b}</span>
            {i < 3 && <i>→</i>}
          </div>
        ))}
      </div>
      <div className="toolbar">
        <div>
          <span className="eyebrow">CUENTA DEMO</span>
          <h2>
            Mis reservas <span className="count">{rows.length}</span>
          </h2>
        </div>
        {user && <span className="muted">{user.email}</span>}
      </div>
      {!user ? (
        <div className="notice">
          Inicia sesión en el caso 04 y luego reserva una actividad para verla
          aquí.
        </div>
      ) : error ? (
        <div className="notice error">{error}</div>
      ) : rows.length === 0 ? (
        <div className="notice">
          Aún no hay reservas. Abre el caso 01, entra a una actividad y
          resérvala.
        </div>
      ) : (
        <div className="reservation-list">
          {rows.map((r) => (
            <div className="reservation" key={r.id}>
              <span className="res-icon">✓</span>
              <div>
                <b>{r.title}</b>
                <small>
                  {new Date(`${r.date}T12:00:00`).toLocaleDateString("es-BO", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </small>
              </div>
              <span className="res-status">CONFIRMADA</span>
            </div>
          ))}
        </div>
      )}
      <div className="tech-note">
        <b>Persistencia demostrable</b>
        <span>
          Reinicia el servidor y vuelve a consultar. Los registros de{" "}
          <code>server/data.json</code> permanecen guardados y los errores no
          exponen detalles internos.
        </span>
      </div>
    </>
  );
}
