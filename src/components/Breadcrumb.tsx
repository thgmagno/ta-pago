'use client'

import {
  Breadcrumb as BreadcrumbCn,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function Breadcrumb() {
  const pathname = usePathname()
  const pathSegments = pathname.split('/').filter(Boolean)

  const lastSegmentIsID =
    pathSegments.length > 0 && pathSegments[pathSegments.length - 1].length > 10
  if (lastSegmentIsID) pathSegments[pathSegments.length - 1] = 'Editar'

  return (
    <BreadcrumbCn className="border p-3 pl-5">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Início</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join('/')}`
          const isLast = index === pathSegments.length - 1

          return (
            <div key={href} className="flex items-center">
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="cursor-default capitalize select-none">
                    {segment}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href} className="capitalize">
                    {segment}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          )
        })}
      </BreadcrumbList>
    </BreadcrumbCn>
  )
}
