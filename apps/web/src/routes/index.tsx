import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Search,
} from 'lucide-react'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import { IconButton } from '../components/icon-button'
import { Table } from '../components/table/table'
import { TableHeader } from '../components/table/table-header'
import { TableCell } from '../components/table/table-cell'
import { ChangeEvent } from 'react'
import { Link } from '@tanstack/react-router'

interface Event {
  id: string
  title: string
  slug: string
  details?: string
  maximumAttendees?: number
  attendeesAmount?: number
}

async function fetchEvents(
  page: number = 1,
  search: string = ''
): Promise<{ events: Event[]; total: number }> {
  const url = new URL(`${import.meta.env.VITE_API_URL}/events/`)
  url.searchParams.set('pageIndex', String(page - 1))
  if (search.length > 0) url.searchParams.set('query', search)
  return fetch(url)
    .then((response) => response.json())
    .then((data) => ({
      events: data.events,
      total: data.total,
    }))
}

const searchParamsSchema = z.object({
  page: z.number().positive().catch(1),
  search: z.string().optional(),
})

type SearchParams = z.infer<typeof searchParamsSchema>

export const Route = createFileRoute('/')({
  component: () => <EventsList />,
  loaderDeps: ({ search: { page, search } }) => ({ page, search }),
  loader: ({ deps: { page, search } }) => fetchEvents(page, search),
  validateSearch: searchParamsSchema,
})

dayjs.extend(relativeTime)
dayjs.locale('pt-br')
const EVENTS_PER_PAGE = 10

function EventsList() {
  const { page, search } = Route.useSearch()
  const { events, total } = Route.useLoaderData()
  const totalPages = Math.max(Math.ceil(total / EVENTS_PER_PAGE), 1)
  const navigate = Route.useNavigate()

  function updateSearch(searchItem: keyof SearchParams, value: unknown) {
    navigate({ search: (prev) => ({ ...prev, [searchItem]: value }) })
  }

  function onSearchInputChange(event: ChangeEvent<HTMLInputElement>) {
    updateSearch('search', event.target.value)
    updateSearch('page', 1)
  }

  function goToFirstPage() {
    updateSearch('page', 1)
  }

  function goToPreviousPage() {
    updateSearch('page', page - 1)
  }

  function goToNextPage() {
    updateSearch('page', page + 1)
  }

  function goToLastPage() {
    updateSearch('page', totalPages)
  }

  if (page > totalPages) {
    updateSearch('page', totalPages)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-gray-400">Eventos</h1>
        <div className="w-72 flex items-center gap-3 px-3 py-1.5 border border-white/10 rounded-lg focus-within:border-white/50">
          <Search className="size-4 text-emerald-300" />
          <input
            onChange={onSearchInputChange}
            value={search}
            className="bg-transparent flex-1 text-sm outline-none border-0 p-0 placeholder:text-zinc-500 focus:ring-0"
            placeholder="Buscar evento..."
          />
        </div>
      </div>
      <Table>
        <thead>
          <tr className="border-b border-white/10">
            <TableHeader style={{ width: 48 }}>
              <input
                type="checkbox"
                className="size-4 bg-black/20 border border-white/10 rounded"
                name=""
                id=""
              />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Evento</TableHeader>
            <TableHeader>Detalhes</TableHeader>
            <TableHeader>Vagas</TableHeader>
            <TableHeader>Inscritos</TableHeader>
            <TableHeader style={{ width: 64 }}></TableHeader>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => {
            return (
              <tr
                key={event.id}
                className="border-b border-white/10 hover:bg-white/5"
              >
                <TableCell>
                  <input
                    type="checkbox"
                    className="size-4 bg-black/20 border border-white/10 rounded checked:hover:bg-orange-500 checked:focus:bg-orange-500 checked:bg-orange-500"
                    name=""
                    id=""
                  />
                </TableCell>
                <TableCell>
                  <Link to={`/events/${event.id}/attendees`} params={event.id}>
                    {event.id}
                  </Link>
                </TableCell>
                <TableCell>
                  <span className="font-semibold text-white">
                    {event.title}
                  </span>
                </TableCell>
                <TableCell>{event.details}</TableCell>
                <TableCell>{event.maximumAttendees}</TableCell>
                <TableCell>{event.attendeesAmount}</TableCell>
                <TableCell>
                  <IconButton transparent>
                    <MoreHorizontal className="size-4" />
                  </IconButton>
                </TableCell>
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr>
            <TableCell className="text-left" colSpan={3}>
              {`Mostrando ${events.length} de ${total} itens`}
            </TableCell>
            <TableCell className="text-right" colSpan={3}>
              <div className="inline-flex items-center gap-8">
                <span>{`Página ${page} de ${totalPages}`}</span>
                <div className="inline-flex gap-1.5">
                  <IconButton onClick={goToFirstPage} disabled={page === 1}>
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                    <ChevronLeft className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToNextPage}
                    disabled={page === totalPages}
                  >
                    <ChevronRight className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToLastPage}
                    disabled={page === totalPages}
                  >
                    <ChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </tr>
        </tfoot>
      </Table>
    </div>
  )
}
