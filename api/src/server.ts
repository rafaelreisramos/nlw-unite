import fastify from 'fastify'
import { createEvent } from './routes/create-event'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { registerForEvent } from './routes/register-for-event'
import { getEvent } from './routes/get-event'
import { getAttendeeBadge } from './routes/get-attendee-badge'
import { checkIn } from './routes/check-in'
import { getEventAttendees } from './routes/get-event-attendees'

export const app = fastify()
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)
app.register(createEvent)
app.register(registerForEvent)
app.register(getEvent)
app.register(getEventAttendees)
app.register(getAttendeeBadge)
app.register(checkIn)
app
  .listen({ port: Number(process.env.SERVER_PORT) })
  .then(() => console.log('Http server is running!'))
