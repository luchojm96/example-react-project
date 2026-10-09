import { useState } from 'react';
import { api } from '../api.js';
import PageHead from '../components/PageHead.jsx';
export default function ApiCase() {
  const [result, setResult] = useState("");
  async function call() {
    try {
      const r = await api.activities();
      setResult(
        JSON.stringify(
          { status: 200, count: r.length, example: r[0] },
          null,
          2,
        ),
      );
    } catch (e) {
      setResult(e.message);
    }
  }
  return (
    <>
      <PageHead
        eyebrow="CASO 02 · API REST Y VALIDACIÓN"
        title="Una API clara y predecible"
        desc="Consulta las actividades, crea registros válidos y revisa el contrato OpenAPI."
      />
      <div className="endpoint-list">
        <div className="endpoint">
          <span className="method get">GET</span>
          <code>/api/activities</code>
          <span>Lista de actividades</span>
          <b>200</b>
        </div>
        <div className="endpoint">
          <span className="method post">POST</span>
          <code>/api/activities</code>
          <span>Crear actividad · requiere rol admin</span>
          <b>201 · 400</b>
        </div>
        <div className="endpoint">
          <span className="method get">GET</span>
          <code>/api/activities/:id</code>
          <span>Detalle de actividad</span>
          <b>200 · 404</b>
        </div>
        <div className="endpoint">
          <span className="method post">POST</span>
          <code>/api/auth/login</code>
          <span>Iniciar sesión</span>
          <b>200 · 401</b>
        </div>
      </div>
      <div className="demo-row">
        <div>
          <div className="eyebrow">PRUEBA EN VIVO</div>
          <h2>Consultar el catálogo</h2>
          <p>
            Realiza una solicitud real al backend local y observa la respuesta
            JSON.
          </p>
          <button className="button primary" onClick={call}>
            Enviar GET <span>→</span>
          </button>
        </div>
        <pre className="response-box">
          {result || "// La respuesta aparecerá aquí\n// GET /api/activities"}
        </pre>
      </div>
      <div className="api-cta">
        <div>
          <b>Contrato completo en Swagger</b>
          <span>Esquemas, códigos, seguridad y ejemplos interactivos.</span>
        </div>
        <a
          className="button secondary"
          href="/docs"
          target="_blank"
          rel="noreferrer"
        >
          Abrir Swagger UI ↗
        </a>
      </div>
      <div className="tech-note">
        <b>Validación</b>
        <span>
          La creación verifica título, categoría, fecha y precio; devuelve{" "}
          <code>400</code> con los campos inválidos. Un ID inexistente produce{" "}
          <code>404</code>.
        </span>
      </div>
    </>
  );
}
