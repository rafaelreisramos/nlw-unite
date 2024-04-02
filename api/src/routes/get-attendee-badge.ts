import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../lib/prima'

export async function getAttendeeBadge(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/attendees/:attendeeId/badge',
    {
      schema: {
        params: z.object({ attendeeId: z.coerce.number() }),
        response: {
          200: z.object({
            attendee: z.object({
              name: z.string().min(3),
              email: z.string().email(),
              event: z.object({
                title: z.string(),
              }),
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
      return reply.send({ attendee })
    }
  )
}
