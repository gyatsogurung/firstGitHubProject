import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <header className="app-header">
        <h1>
          <span style={{ color: 'var(--col-accent)' }}>REP</span>LOG
        </h1>
        <span className="badge badge-dim">v1.0</span>
      </header>
      <Outlet />
    </div>
  );
}

export default App;



