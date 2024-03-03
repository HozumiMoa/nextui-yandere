import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

export function useRouter() {
  const navigate = useNavigate()

  const push = useCallback(
    (pathname: string, query?: unknown) => {
      navigate(
        `${pathname}${query ? `?${new URLSearchParams(query as URLSearchParams)}` : ''}`
      )
    },
    [navigate]
  )

  return { push }
}
