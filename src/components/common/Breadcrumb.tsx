'use client'

import {
  Breadcrumb as BreadcrumbCn,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import clsx from 'clsx'

import { Slash } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React from 'react'

export function Breadcrumb() {
  const currentPath = usePathname()
  const pathnames = currentPath.split('/').filter((item) => item)

  return (
    <BreadcrumbCn>
      <BreadcrumbList>
        <BreadcrumbItem key="home">
          <BreadcrumbLink href="/">Início</BreadcrumbLink>
        </BreadcrumbItem>
        {pathnames.map((item, index) => {
          const href = '/' + pathnames.slice(0, index + 1).join('/')
          const isCurrentPage = currentPath === href

          return (
            <React.Fragment key={index}>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={!isCurrentPage ? href : undefined}
                  className={clsx({
                    'hover:text-muted-foreground cursor-default capitalize select-none':
                      isCurrentPage,
                  })}
                >
                  {item}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </BreadcrumbCn>
  )
}
