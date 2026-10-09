import { useState } from 'react';
import { Link,NavLink,Route,Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Catalog from './pages/Catalog.jsx';
import Detail from './pages/Detail.jsx';
import ApiCase from './pages/ApiCase.jsx';
import Reservations from './pages/Reservations.jsx';
import AuthCase from './pages/AuthCase.jsx';
import DeployCase from './pages/DeployCase.jsx';

const cases=[['01','Componentes y rutas','React · estado · useEffect'],['02','API y validación','REST · HTTP · OpenAPI'],['03','Persistencia por capas','Repositorio · reservas'],['04','Autenticación','JWT · roles · hashing'],['05','Integración y despliegue','CORS · variables · build']];
function App() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });
  function onLogin(data) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
  }
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }
  return (
    <div className="shell">
      <aside className="sidebar">
        <Link to="/" className="brand">
          <span className="brand-mark">R</span>
          <span>
            Rutas<span className="brand-light"> / defensa</span>
          </span>
        </Link>
        <div className="side-label">MÓDULO DE DEFENSA</div>
        <nav>
          {cases.map(([n, title]) => (
            <NavLink
              key={n}
              to={`/caso/${Number(n)}`}
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
            >
              <span className="nav-number">{n}</span>
              {title}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="status-dot" />
          API local <span className="api-port">:4000</span>
          <a href="/docs" target="_blank" rel="noreferrer">
            Documentación ↗
          </a>
        </div>
      </aside>
      <main className="main">
        <header className="topbar">
          <div className="breadcrumb">
            PROGRAMA DE TITULACIÓN <span>/</span> PROGRAMACIÓN WEB
          </div>
          <div className="top-user">
            {user ? (
              <>
                <span className="avatar">{user.name?.[0]}</span>
                <span>{user.name}</span>
                <button className="text-button" onClick={logout}>
                  Salir
                </button>
              </>
            ) : (
              <Link className="login-link" to="/caso/4">
                Acceder <span>↗</span>
              </Link>
            )}
          </div>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/caso/1" element={<Catalog />} />
          <Route path="/actividad/:id" element={<Detail />} />
          <Route path="/caso/2" element={<ApiCase />} />
          <Route path="/caso/3" element={<Reservations user={user} />} />
          <Route
            path="/caso/4"
            element={<AuthCase user={user} onLogin={onLogin} />}
          />
          <Route path="/caso/5" element={<DeployCase />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <footer>
          PROYECTO DEMOSTRATIVO <span>·</span> PROGRAMACIÓN WEB
        </footer>
      </main>
    </div>
  );
}

export default App;
