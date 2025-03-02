import { signIn } from '@/auth'
import Image from 'next/image'

export function SignInWithGitHub() {
  return (
    <form
      action={async () => {
        'use server'
        await signIn('github')
      }}
    >
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2.5 rounded-xl border bg-white p-3 font-medium dark:bg-neutral-300 dark:text-black"
      >
        <Image
          src="https://www.svgrepo.com/show/512317/github-142.svg"
          height={20}
          width={20}
          alt="GitHub"
        />
        Entrar com o GitHub
      </button>
    </form>
  )
}
