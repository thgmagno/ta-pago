'use client'

import { useActionState } from 'react'
import { actions } from '@/actions'
import { Group } from '@prisma/client'
import { GroupFormState } from '@/lib/states/groups'
import { CardWithFooter } from './CardForm'
import { ErrorMessageForm } from './ErrorMessageForm'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export function AddGroupForm() {
  const [formState, action, isPending] = useActionState(
    actions.groups.group.create,
    {
      errors: {},
    },
  )

  return (
    <GroupForm formState={formState} action={action} isPending={isPending} />
  )
}

export function GroupForm({
  formState,
  action,
  isPending,
  group,
}: {
  formState: GroupFormState
  action: (payload: FormData) => void
  isPending: boolean
  group?: Group
}) {
  return (
    <form action={action}>
      <div className="grid w-full items-center gap-4">
        {/* ID */}
        <input type="hidden" name="id" value={group?.id} />

        {/* Description */}
        <div className="flex flex-col space-y-2">
          <Label>Nome</Label>
          <Input
            name="name"
            placeholder="Nome do grupo"
            defaultValue={group?.name ?? ''}
          />
          <ErrorMessageForm message={formState.errors.name} />
        </div>

        {/* Description */}
        <div className="flex flex-col space-y-2">
          <Label>Descrição</Label>
          <Input
            name="description"
            placeholder="Descrição do grupo"
            defaultValue={group?.description ?? ''}
          />
          <ErrorMessageForm message={formState.errors?.description} />
        </div>

        {/* Visibilidade */}
        <div className="flex flex-col space-y-2">
          <Label className="flex items-center">Visibilidade</Label>
          <Select name="visibility" defaultValue={group?.visibility ?? ''}>
            <SelectTrigger>
              <SelectValue placeholder="Selecionar a visibilidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Visibilidade</SelectLabel>
                <SelectItem key={'PUBLIC'} value={'PUBLIC'}>
                  Público
                </SelectItem>
                <SelectItem key={'PRIVATE'} value={'PRIVATE'}>
                  Privado
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <ErrorMessageForm message={formState.errors.visibility} />
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-muted-foreground">
                Como funciona a visibilidade?
              </AccordionTrigger>
              <AccordionContent className="flex flex-col space-y-2 text-sm">
                <span>
                  <b>Grupos públicos: </b>aparecem nas buscas e podem ser
                  encontrados por outros usuários.
                </span>
                <span>
                  <b>Grupos privados: </b>não aparecem em buscas e só podem ser
                  acessados por membros convidados.
                </span>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <CardWithFooter onCancelRedirectTo="/grupo" isPending={isPending} />
    </form>
  )
}
