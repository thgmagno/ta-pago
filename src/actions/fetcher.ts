const baseUrl = `${process.env.AUTH_URL}/api`

type FetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: string
  headers?: Record<string, string>
  next?: {
    tags?: string[]
    revalidate?: number
  }
}

export async function fetcher<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const defaultOptions: FetchOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: String(process.env.API_SECRET),
    },
    next: {
      revalidate: 24 * 60 * 60,
    },
  }

  const mergedOptions: FetchOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
    next: {
      ...defaultOptions.next,
      ...options.next,
    },
  }

  const response = await fetch(
    `${baseUrl}${endpoint}`,
    mergedOptions as RequestInit,
  )
  return response.json()
}
