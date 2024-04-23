import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Link } from '@tanstack/react-router'
import nlwUniteLogo from '../assets/pass-in-logo.svg'

export const Route = createRootRoute({
  component: () => (
    <div className="max-w-7xl mx-auto my-5 flex flex-col gap-5">
      <header className="flex items-center gap-5 py-2">
        <Link to="/" search={{ page: 1 }}>
          <img src={nlwUniteLogo} />
        </Link>
      </header>
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
})
