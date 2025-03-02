import { z } from 'zod'

const schema = z.object({
  AUTH_SECRET: z.string(),
  AUTH_GOOGLE_ID: z.string(),
  AUTH_GOOGLE_SECRET: z.string(),
  AUTH_GITHUB_ID: z.string(),
  AUTH_GITHUB_SECRET: z.string(),
  DATABASE_URL: z.string().url(),
})

export const env = schema.parse(process.env)
