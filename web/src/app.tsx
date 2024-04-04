import { AttendeeList } from './components/attendee-list'
import { Header } from './components/header'

export function App() {
  return (
    <div className="max-w-7xl mx-auto my-5 flex flex-col gap-5">
      <Header />
      <AttendeeList />
    </div>
  )
}
