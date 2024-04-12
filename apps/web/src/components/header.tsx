import nlwUniteLogo from '../assets/pass-in-logo.svg'
import { NavLink } from './nav-link'

export function Header() {
  return (
    <header className="flex items-center gap-5 py-2">
      <img src={nlwUniteLogo} />
      <nav className="flex items-center gap-5">
        {/* non-active -> text-zinc-300 */}
        <NavLink href="/events">Eventos</NavLink>
        <NavLink href="/attendees">Participantes</NavLink>
      </nav>
    </header>
  )
}
