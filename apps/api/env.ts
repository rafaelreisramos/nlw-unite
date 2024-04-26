import { z } from 'zod'

const envSchema = z.object({
  API_PORT: z.string().transform(Number),
  DATABASE_URL: z.string().url(),
})

export const env = envSchema.parse(process.env)
