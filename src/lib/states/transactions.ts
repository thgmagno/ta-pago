export interface PaymentFormState {
  errors: {
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
    description?: string[]
    categoryId?: string[]
    amount?: string[]
    yield?: string[]
    startDate?: string[]
    endDate?: string[]
    status?: string[]
    _form?: string
  }
}
