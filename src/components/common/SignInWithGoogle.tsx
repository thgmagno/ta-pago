import { signIn } from '@/auth'
import Image from 'next/image'

export function SignInWithGoogle() {
  return (
    <form
      action={async () => {
        'use server'
        await signIn('google')
      }}
    >
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2.5 rounded-xl border bg-white p-3 font-medium text-blue-600 dark:bg-neutral-300"
      >
        <Image
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          height={20}
          width={20}
          alt="Google"
        />
        Entrar com o Google
      </button>
    </form>
  )
}
