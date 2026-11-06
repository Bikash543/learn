import { NavLink } from 'react-router-dom';

const linkClass = ({ isActive }) =>
  `btn btn-sm ${isActive ? 'btn-primary' : 'btn-ghost'}`;

export default function AppHeader() {
  return (
    <header className="border-b border-base-300 bg-base-100">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <NavLink className="flex items-center gap-3" to="/">
          <span className="grid size-10 place-items-center rounded-xl bg-primary font-bold text-primary-content">
            N
          </span>
          <span>
            <span className="block font-bold leading-tight">Paisa</span>
            <span className="block text-xs text-base-content/55">
              Personal finance tracker
            </span>
          </span>
        </NavLink>
        <nav className="flex items-center gap-2" aria-label="Main navigation">
          <NavLink className={linkClass} to="/" end>
            Overview
          </NavLink>
          <NavLink className={linkClass} to="/transactions">
            Transactions
          </NavLink>
          <span className="badge badge-outline hidden sm:inline-flex">NPR · Nepal</span>
        </nav>
      </div>
    </header>
  );
}
