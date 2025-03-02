interface MessageFeedbackProps {
  type: 'info' | 'error' | 'success'
  message?: string | string[]
}

export function MessageFeedback({
  type = 'info',
  message,
}: MessageFeedbackProps) {
  if (!message) return null

  if (type === 'error') {
    return (
      <p className="p-1.5 text-xs font-semibold text-red-500 md:text-sm">
        {typeof message === 'string' ? message : message?.join('. ')}
      </p>
    )
  }

  if (type === 'success') {
    return (
      <p className="p-1.5 text-xs font-semibold text-emerald-500 md:text-sm">
        {typeof message === 'string' ? message : message?.join('. ')}
      </p>
    )
  }

  return (
    <p className="p-1.5 text-xs font-semibold md:text-sm">
      {typeof message === 'string' ? message : message?.join('. ')}
    </p>
  )
}
