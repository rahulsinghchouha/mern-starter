import { Link, NavLink, Route, Routes } from "react-router-dom";
import ItemsPage from "./pages/ItemsPage.jsx";
import ItemFormPage from "./pages/ItemFormPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

export default function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand" to="/">
          MERN Starter
        </Link>
        <nav aria-label="Main navigation">
          <NavLink to="/" end>
            Items
          </NavLink>
          <NavLink className="nav-create" to="/items/new">
            Add item
          </NavLink>
        </nav>
      </header>

      <main className="page">
        <Routes>
          <Route path="/" element={<ItemsPage />} />
          <Route path="/items/new" element={<ItemFormPage />} />
          <Route path="/items/:id/edit" element={<ItemFormPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <footer className="site-footer">React · Express · MongoDB</footer>
    </div>
  );
}
