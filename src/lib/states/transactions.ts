export interface PaymentFormState {
  errors: {
    id?: string[]
    description?: string[]
    amount?: string[]
    categoryId?: string[]
    paidAt?: string[]
    scheduledDate?: string[]
    paymentMethod?: string[]
    status?: string[]
    _form?: string
  }
}

export interface ReceiptFormState {
  errors: {
    id?: string[]
    description?: string[]
    amount?: string[]
    categoryId?: string[]
    receivedAt?: string[]
    scheduledDate?: string[]
    receiptMethod?: string[]
    status?: string[]
    _form?: string
  }
}

export interface ReserveFormState {
  errors: {
    id?: string[]
    description?: string[]
    amount?: string[]
    categoryId?: string[]
    yield?: string[]
    startDate?: string[]
    endDate?: string[]
    status?: string[]
    _form?: string
  }
}
