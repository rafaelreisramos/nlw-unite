import nlwUniteLogo from '../assets/pass-in-logo.svg'

export function Header() {
  return (
    <header className="flex items-center gap-5 py-2">
      <img src={nlwUniteLogo} />
      <nav className="flex items-center gap-5">
        <a href="#" className="text-zinc-300 font-medium text-sm">
          Eventos
        </a>
        <a href="#" className="font-medium text-sm">
          Participantes
        </a>
      </nav>
    </header>
  )
}
