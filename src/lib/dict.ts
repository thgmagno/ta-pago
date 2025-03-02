import {
  PaymentMethodType,
  PaymentStatus,
  ReceiptMethodType,
  ReceiptStatus,
  ReserveStatus,
} from '@prisma/client'

export const dict = {
  PaymentMethods: [
    { value: PaymentMethodType.CARD, label: 'Cartão' },
    { value: PaymentMethodType.CASH, label: 'Dinheiro' },
    { value: PaymentMethodType.TRANSFER, label: 'Transferência' },
    { value: PaymentMethodType.PIX, label: 'PIX' },
    { value: PaymentMethodType.BOLETO, label: 'Boleto' },
    { value: PaymentMethodType.CHECK, label: 'Cheque' },
    { value: PaymentMethodType.OTHER, label: 'Outro' },
  ],
  ReceiptMethods: [
    { value: ReceiptMethodType.SALARY, label: 'Salário' },
    { value: ReceiptMethodType.SALE, label: 'Venda' },
    { value: ReceiptMethodType.EXTRA, label: 'Extra' },
    { value: ReceiptMethodType.TICKET, label: 'Ticket' },
    { value: ReceiptMethodType.INVESTMENT, label: 'Investimento' },
    { value: ReceiptMethodType.DIVIDEND, label: 'Dividendo' },
    {
      value: ReceiptMethodType.REIMBURSEMENT,
      label: 'Reembolso',
    },
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
