import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="card mx-auto max-w-lg border border-base-300 bg-base-100 shadow-sm">
      <div className="card-body items-center text-center">
        <p className="text-sm font-semibold text-primary">404</p>
        <h1 className="card-title">Page not found</h1>
        <p className="text-base-content/65">
          The page you are looking for does not exist.
        </p>
        <Link className="btn btn-primary mt-2" to="/">
          Back to overview
        </Link>
      </div>
    </section>
  );
}
