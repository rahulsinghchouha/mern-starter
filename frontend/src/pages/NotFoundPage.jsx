import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="content-card empty-state">
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <p className="message">The page you requested does not exist.</p>
      <Link className="button-link" to="/">
        Back to items
      </Link>
    </section>
  );
}
