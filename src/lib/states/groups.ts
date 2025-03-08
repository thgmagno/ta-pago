import { Group } from '@prisma/client'

export interface GroupFormState {
  errors: {
    id?: string[]
    name?: string[]
    description?: string[]
    visibility?: string[]
    _form?: string
  }
}

export interface FindGroupBySearchTermFormState {
  formSended?: boolean
  data?: {
    groups: Group[]
  }
  errors: {
    searchTerm?: string[]
    _form?: string
  }
}
