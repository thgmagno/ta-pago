'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import { loginWithGoogle } from '@/actions/models/session'
import Image from 'next/image'

export function AccessAccount() {
  const pathname = usePathname()

  if (pathname.includes('/entrar')) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Acessar</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-44">
          <DropdownMenuItem
            onClick={loginWithGoogle}
            className="flex items-center text-sm md:text-base"
          >
            <Image
              src="https://www.svgrepo.com/show/452216/google.svg"
              width={16}
              height={16}
              alt="Google"
            />
            Conectar com Google
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return null
}
