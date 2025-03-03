import { NumericFormat } from 'react-number-format'
import { Input } from '@/components/ui/input'

interface Props {
  name: string
  defaultValue?: number | null
}

export default function CurrencyInput({ name, defaultValue }: Props) {
  return (
    <NumericFormat
      name={name}
      defaultValue={defaultValue ?? ''}
      thousandSeparator="."
      decimalSeparator=","
      prefix="R$ "
      decimalScale={2}
      fixedDecimalScale
      customInput={Input}
      placeholder="R$ 0,00"
    />
  )
}
