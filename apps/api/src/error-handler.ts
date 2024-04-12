import { FastifyInstance } from 'fastify'
import { ZodError } from 'zod'
import { BadRequest } from './routes/errors/bad-request'
import { NotFound } from './routes/errors/not-found'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      errors: error.flatten().fieldErrors,
    })
  }
  if (error instanceof BadRequest) {
    return reply.status(400).send({ message: error.message })
  }
  if (error instanceof NotFound) {
    return reply.status(404).send({ message: error.message })
  }
  return reply.status(500).send({ message: error.message })
}
