'use client'

import { CardWithFooter } from './CardForm'

export function AddReceiptForm() {
  const isPending = false

  return (
    <form>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <label htmlFor="name">Receipt</label>
          <input id="name" placeholder="Name of your project" />
        </div>
      </div>
      <CardWithFooter
        onCancelRedirectTo="/financas/recebimentos"
        isPending={isPending}
      />
    </form>
  )
}
