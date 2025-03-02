'use server'

import { signIn as authenticate } from '@/auth'
import { z } from 'zod'

interface SignInFormState {
  provider?: 'github' | 'google'
  error?: string
}

export async function signIn(
  formState: SignInFormState,
  formData: FormData,
): Promise<SignInFormState> {
  const schema = z.object({
    provider: z.enum(['github', 'google']),
  })

  const parsed = schema.safeParse(formData.get('provider'))

  if (!parsed.success) {
    return { error: 'Dados de login inválidos' }
  }

  try {
    if (parsed.data.provider === 'github') await authenticate('github')
    if (parsed.data.provider === 'google') await authenticate('google')
  } catch {
    return {
      error: 'Não foi possível estabelecer uma conexão segura com o servidor',
    }
  }
  return {}
}
