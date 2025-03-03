interface Props {
  message?: string | string[]
}

export function ErrorMessageForm({ message }: Props) {
  if (!message) return null

  if (typeof message === 'string') {
    return <p className="text-red-500">{message}</p>
  }

  return <p className="text-red-500">{message.join('. ')}</p>
}
