import { Link } from 'react-router-dom';
import PageHead from '../components/PageHead.jsx';
export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow light">PROGRAMA DE TITULACIÓN · UNIFRANZ</div>
          <h1>
            Defensa de
            <br />
            Programación Web
          </h1>
          <p>
            Cinco casos prácticos resueltos en una plataforma de reservas.
            Explora cada implementación y presenta las decisiones técnicas.
          </p>
          <Link className="button primary" to="/caso/1">
            Explorar casos <span>→</span>
          </Link>
        </div>
        <div className="hero-art">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="hero-icon">✦</div>
          <div className="floating-card fc-top">
            <span className="mini-dot" /> API conectada{" "}
            <span className="tiny-check">✓</span>
          </div>
          <div className="floating-card fc-bottom">
            <span className="code-mark">&lt;/&gt;</span> React + Express
          </div>
          <div className="hero-caption">
            ACTIVIDADES · RESERVAS · EXPERIENCIAS
          </div>
        </div>
      </section>
      <div className="stats-row">
        <div>
          <strong>05</strong>
          <span>casos prácticos</span>
        </div>
        <div>
          <strong>01</strong>
          <span>plataforma integrada</span>
        </div>
        <div>
          <strong>REST</strong>
          <span>API documentada</span>
        </div>
        <div>
          <strong>45′</strong>
          <span>formato de defensa</span>
        </div>
      </div>
      <section className="case-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">RECORRIDO TÉCNICO</div>
            <h2>Casos de defensa</h2>
          </div>
          <span className="muted">
            Selecciona un caso para revisar su solución →
          </span>
        </div>
        <div className="case-grid">
          {cases.map(([n, t, d], i) => (
            <Link className="case-card" to={`/caso/${i + 1}`} key={n}>
              <div className="case-card-top">
                <span className="case-chip">CASO {n}</span>
                <span className="arrow">↗</span>
              </div>
              <h3>{t}</h3>
              <p>{d}</p>
              <div className="card-line" />
            </Link>
          ))}
        </div>
      </section>
      <section className="presentation">
        <div>
          <div className="eyebrow light">GUÍA DE TIEMPO</div>
          <h2>Una defensa, cinco momentos</h2>
        </div>
        <div className="timeline">
          {[
            ["05′", "Preparación"],
            ["10′", "Análisis"],
            ["20′", "Resolución"],
            ["08′", "Defensa"],
            ["02′", "Cierre"],
          ].map((x) => (
            <div key={x[0]}>
              <b>{x[0]}</b>
              <span>{x[1]}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="rubric">
        <div>
          <div className="eyebrow">EVALUACIÓN</div>
          <h2>
            Rúbrica de defensa <span>100 pts</span>
          </h2>
        </div>
        <div className="rubric-items">
          {[
            ["Corrección técnica", "40"],
            ["Dominio conceptual", "25"],
            ["Manejo ante el tribunal", "20"],
            ["Buenas prácticas", "15"],
          ].map(([a, b]) => (
            <div key={a}>
              <span>{a}</span>
              <b>
                {b} <small>pts</small>
              </b>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
