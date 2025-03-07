import { z } from 'zod'

const schema = z.object({
  AUTH_URL: z.string().url(),
  AUTH_SECRET: z.string(),
  AUTH_GOOGLE_ID: z.string(),
  AUTH_GOOGLE_SECRET: z.string(),
  POSTGRES_PRISMA_URL: z.string().url(),
})

export const env = schema.parse(process.env)
