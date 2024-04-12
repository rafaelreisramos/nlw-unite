import { z } from 'zod'

const envSchema = z.object({
  SERVER_PORT: z.string().transform(Number),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  DATABASE_URL: z.string(),
})

export const env = envSchema.parse(process.env)
