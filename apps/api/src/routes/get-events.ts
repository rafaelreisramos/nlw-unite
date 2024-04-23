import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function getEvents(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/events/',
    {
      schema: {
        summary: 'Get events',
        tags: ['events'],
        querystring: z.object({
          pageIndex: z.string().nullish().default('0').transform(Number),
          query: z.string().nullish(),
        }),
        response: {
          200: z.object({
            events: z.array(
              z.object({
                id: z.string().uuid(),
                title: z.string(),
                details: z.string().nullable(),
                slug: z.string(),
                maximumAttendees: z.number().int().nullable(),
                attendeesAmount: z.number().int().nullable(),
              })
            ),
            total: z.number(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { pageIndex, query } = request.query
      const [events, total] = await Promise.all([
        prisma.event.findMany({
          where: query
            ? {
                title: {
                  contains: query,
                },
              }
            : {},
          select: {
            id: true,
            title: true,
            details: true,
            slug: true,
            maximumAttendees: true,
            _count: { select: { attendees: true } },
          },
          take: 10,
          skip: pageIndex * 10,
          orderBy: {
            title: 'desc',
          },
        }),
        prisma.event.count({
          where: query
            ? {
                title: {
                  contains: query,
                },
              }
            : {},
        }),
      ])
      return reply.send({
        events: events.map((event) => ({
          id: event.id,
          title: event.title,
          details: event.details,
          slug: event.slug,
          maximumAttendees: event.maximumAttendees,
          attendeesAmount: event._count.attendees,
        })),
        total,
      })
    }
  )
}
