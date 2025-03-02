interface DatabaseResponse<T> {
  status: 'success' | 'error'
  message: string
  data?: T
}

const ERROR_MESSAGES = {
  UNIQUE_CONSTRAINT: 'Já existe um registro com esses dados.',
  UNKNOWN: 'Erro desconhecido no banco de dados.',
}

export async function handleDatabaseOperation<T>(
  operation: () => Promise<T>,
  successMessage: string = 'Operação realizada com sucesso',
): Promise<DatabaseResponse<T>> {
  try {
    const data = await operation()
    return {
      status: 'success',
      message: successMessage,
      data,
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message.includes('Unique constraint')
          ? ERROR_MESSAGES.UNIQUE_CONSTRAINT
          : error.message
        : ERROR_MESSAGES.UNKNOWN

    return {
      status: 'error',
      message: errorMessage,
    }
  }
}
