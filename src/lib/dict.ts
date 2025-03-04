import {
  PaymentMethodType,
  PaymentStatus,
  ReceiptMethodType,
  ReceiptStatus,
  ReserveStatus,
} from '@prisma/client'

export const dict = {
  PaymentMethods: [
    { value: PaymentMethodType.CREDIT_CARD, label: 'Cartão de Crédito' },
    { value: PaymentMethodType.DEBIT_CARD, label: 'Cartão de Débito' },
    { value: PaymentMethodType.CASH, label: 'Dinheiro' },
    { value: PaymentMethodType.TRANSFER, label: 'Transferência' },
    { value: PaymentMethodType.PIX, label: 'PIX' },
    { value: PaymentMethodType.BOLETO, label: 'Boleto' },
    { value: PaymentMethodType.CHECK, label: 'Cheque' },
    { value: PaymentMethodType.OTHER, label: 'Outro' },
  ],
  ReceiptMethods: [
    { value: ReceiptMethodType.TRANSFER, label: 'Transferência' },
    { value: ReceiptMethodType.PIX, label: 'PIX' },
    { value: ReceiptMethodType.CASH, label: 'Dinheiro' },
    { value: ReceiptMethodType.CHECK, label: 'Cheque' },
    { value: ReceiptMethodType.OTHER, label: 'Outro' },
  ],
  PaymentStatus: [
    { value: PaymentStatus.PENDING, label: 'Pendente' },
    { value: PaymentStatus.PAID, label: 'Pago' },
    { value: PaymentStatus.CANCELLED, label: 'Cancelado' },
  ],

  ReceiptStatus: [
    { value: ReceiptStatus.PENDING, label: 'Pendente' },
    { value: ReceiptStatus.RECEIVED, label: 'Recebido' },
    { value: ReceiptStatus.CANCELLED, label: 'Cancelado' },
  ],

  ReserveStatus: [
    { value: ReserveStatus.PENDING, label: 'Pendente' },
    { value: ReserveStatus.ACTIVE, label: 'Ativo' },
    { value: ReserveStatus.REDEEMED, label: 'Resgatado' },
  ],
}
