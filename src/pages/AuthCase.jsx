import { useState } from 'react';
import { api } from '../api.js';
import PageHead from '../components/PageHead.jsx';
export default function AuthCase({ user, onLogin }) {
  const [email, setEmail] = useState("admin@demo.com"),
    [password, setPassword] = useState("admin123"),
    [error, setError] = useState(""),
    [created, setCreated] = useState(false);
  async function login(e) {
    e.preventDefault();
    setError("");
    try {
      onLogin(await api.login(email, password));
    } catch (x) {
      setError(x.message);
    }
  }
  async function create() {
    try {
      await api.createActivity({
        title: "Actividad creada en defensa",
        category: "Cultura",
        date: "2026-11-20",
        price: 150,
        description: "Registro de ejemplo mediante POST protegido.",
      });
      setCreated(true);
      setError("");
    } catch (x) {
      setError(x.message);
    }
  }
  return (
    <>
      <PageHead
        eyebrow="CASO 04 · AUTENTICACIÓN Y ENDPOINTS PROTEGIDOS"
        title="Acceso seguro por roles"
        desc="Las contraseñas se comparan con un hash. El token JWT identifica al usuario y el middleware autoriza cada operación."
      />
      <div className="auth-layout">
        <div className="auth-panel">
          <div className="eyebrow">INICIO DE SESIÓN</div>
          {user ? (
            <>
              <div className="logged-in">
                <span className="avatar large">{user.name?.[0]}</span>
                <div>
                  <h2>Sesión iniciada</h2>
                  <p>
                    {user.name} · rol <b>{user.role}</b>
                  </p>
                </div>
              </div>
              <div className="token-box">
                <small>TOKEN JWT ACTIVO</small>
                <code>{localStorage.getItem("token")?.slice(0, 48)}…</code>
              </div>
              <button
                className="button primary"
                onClick={create}
                disabled={user.role !== "admin"}
              >
                Probar POST protegido <span>→</span>
              </button>
              {user.role !== "admin" && (
                <p className="form-hint">
                  Esta cuenta no tiene rol administrador.
                </p>
              )}
              {created && (
                <div className="inline-message">
                  Actividad creada con éxito · respuesta 201
                </div>
              )}
            </>
          ) : (
            <form onSubmit={login}>
              <label>
                Correo electrónico
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                />
              </label>
              <label>
                Contraseña
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  required
                />
              </label>
              <button className="button primary" type="submit">
                Iniciar sesión <span>→</span>
              </button>
              <div className="demo-credentials">
                <b>Credenciales para la defensa</b>
                <span>admin@demo.com / admin123</span>
                <span>ana@demo.com / ana123</span>
              </div>
              {error && <div className="inline-error">{error}</div>}
            </form>
          )}
        </div>
        <div className="auth-explain">
          <div className="eyebrow">FLUJO DE SEGURIDAD</div>
          <h2>De credencial a permiso</h2>
          {[
            [
              "01",
              "Hash",
              "bcrypt compara la contraseña con el hash almacenado.",
            ],
            [
              "02",
              "Token",
              "JWT firmado con secreto de entorno; incluye id y rol.",
            ],
            [
              "03",
              "Autenticación",
              "Middleware valida firma y vencimiento del token.",
            ],
            [
              "04",
              "Autorización",
              "El rol admin habilita cambios en el catálogo.",
            ],
          ].map(([n, t, d]) => (
            <div className="security-step" key={n}>
              <span>{n}</span>
              <div>
                <b>{t}</b>
                <p>{d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="auth-codes">
        <div>
          <span className="method bad">401</span>
          <b>Sin token o token inválido</b>
          <small>La identidad no puede verificarse.</small>
        </div>
        <div>
          <span className="method warn">403</span>
          <b>Autenticado sin rol</b>
          <small>Identidad válida; permiso insuficiente.</small>
        </div>
        <div>
          <span className="method get">201</span>
          <b>Admin autorizado</b>
          <small>Recurso creado correctamente.</small>
        </div>
      </div>
      {error && !user && <div className="inline-error">{error}</div>}
    </>
  );
}
