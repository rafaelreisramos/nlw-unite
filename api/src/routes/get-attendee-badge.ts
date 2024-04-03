import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../lib/prima'

export async function getAttendeeBadge(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/attendees/:attendeeId/badge',
    {
      schema: {
        summary: 'Get an attendee badge',
        tags: ['attendees'],
        params: z.object({ attendeeId: z.coerce.number() }),
        response: {
          200: z.object({
            badge: z.object({
              name: z.string().min(3),
              email: z.string().email(),
              eventTitle: z.string(),
              eventUrl: z.string().url(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const { attendeeId } = request.params
      const attendee = await prisma.attendee.findUnique({
        where: { id: attendeeId },
        select: {
          name: true,
          email: true,
          event: {
            select: {
              title: true,
            },
          },
        },
      })
      if (attendee === null) {
        throw new Error('Attendee not found.')
      }
      const baseUrl = `${request.protocol}://${request.hostname}`
      const checkInUrl = new URL(`/attendees/${attendeeId}/check-in`, baseUrl)

      return reply.send({
        badge: {
          name: attendee.name,
          email: attendee.email,
          eventTitle: attendee.event.title,
          eventUrl: checkInUrl.toString(),
        },
      })
    }
  )
}
