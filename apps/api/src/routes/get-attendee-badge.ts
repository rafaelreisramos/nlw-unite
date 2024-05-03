import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { NotFound } from './errors/not-found'

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
              id: z.number().positive(),
              name: z.string().min(3),
              email: z.string().email(),
              eventTitle: z.string(),
              checkInUrl: z.string().url(),
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
        throw new NotFound('Attendee not found.')
      }
      const baseUrl = `${request.protocol}://${request.hostname}`
      const checkInUrl = new URL(`/attendees/${attendeeId}/check-in`, baseUrl)

      return reply.send({
        badge: {
          id: attendeeId,
          name: attendee.name,
          email: attendee.email,
          eventTitle: attendee.event.title,
          checkInUrl: checkInUrl.toString(),
        },
      })
    }
  )
}
