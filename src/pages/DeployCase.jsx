import { Link } from 'react-router-dom';
import PageHead from '../components/PageHead.jsx';
export default function DeployCase() {
  return (
    <>
      <PageHead
        eyebrow="CASO 05 · INTEGRACIÓN Y DESPLIEGUE"
        title="Del entorno local a producción"
        desc="La interfaz consume la misma API REST mediante una URL configurable, con manejo de estados y CORS explícito."
      />
      <div className="integration-card">
        <div className="integration-side">
          <div className="eyebrow light">INTEGRACIÓN EN VIVO</div>
          <h2>Un frontend, una API</h2>
          <p>
            El catálogo obtiene los datos del backend usando la capa de
            servicios y muestra carga, error o resultados.
          </p>
          <Link className="button primary" to="/caso/1">
            Probar integración <span>→</span>
          </Link>
        </div>
        <div className="integration-flow">
          <div className="flow-node">
            <span>◈</span>
            <b>React + Vite</b>
            <small>VITE_API_URL</small>
          </div>
          <div className="flow-connector">
            <span>HTTPS · JSON</span>
            <i />
          </div>
          <div className="flow-node">
            <span>⌘</span>
            <b>Express API</b>
            <small>FRONTEND_ORIGIN · CORS</small>
          </div>
          <div className="flow-connector">
            <span>HTTP</span>
            <i />
          </div>
          <div className="flow-node">
            <span>▤</span>
            <b>Repositorio</b>
            <small>Persistencia</small>
          </div>
        </div>
      </div>
      <div className="deploy-grid">
        <div className="deploy-card">
          <div className="eyebrow">CONFIGURACIÓN</div>
          <h3>Variables de entorno</h3>
          <pre>
            VITE_API_URL=https://api.ejemplo.com/api
            <br />
            FRONTEND_ORIGIN=https://app.ejemplo.com
            <br />
            JWT_SECRET=secreto-largo-y-aleatorio
          </pre>
          <p>
            La clave del frontend define la URL pública. Los secretos se guardan
            solo en el servidor.
          </p>
        </div>
        <div className="deploy-card">
          <div className="eyebrow">PUBLICACIÓN</div>
          <h3>Build y despliegue</h3>
          <div className="deploy-steps">
            <span>
              <b>1</b> npm run build
            </span>
            <span>
              <b>2</b> Publicar <code>dist/</code>
            </span>
            <span>
              <b>3</b> Iniciar Express con variables seguras
            </span>
            <span>
              <b>4</b> Permitir el origen del frontend en CORS
            </span>
          </div>
        </div>
      </div>
      <div className="tech-note">
        <b>Desarrollo y producción</b>
        <span>
          En local Vite usa proxy a <code>localhost:4000</code>. En producción,{" "}
          <code>VITE_API_URL</code> apunta a la API publicada y CORS permite
          únicamente el dominio del frontend.
        </span>
      </div>
    </>
  );
}
export default App;
