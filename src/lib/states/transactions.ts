export interface PaymentFormState {
  errors: {
    dueDate?: string[]
    amountPaid?: string[]
    status?: string[]
    paymentMethod?: string[]
    categoryId?: string[]
    description?: string[]
    _form?: string
  }
}

export interface ReceiptFormState {
  errors: {
    receiptDate?: string[]
    amountReceived?: string[]
    status?: string[]
    receiptMethod?: string[]
    _form?: string
  }
}

export interface ReserveFormState {
  errors: {
    startDate?: string[]
    endDate?: string[]
    yield?: string[]
    status?: string[]
    _form?: string
  }
}
