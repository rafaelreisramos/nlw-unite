import { ComponentProps } from 'react'

interface NavLinkProps extends ComponentProps<'a'> {
  children: string
}

export function NavLink(props: NavLinkProps) {
  return <a {...props} className="text-zinc-300 font-medium text-sm" />
}
