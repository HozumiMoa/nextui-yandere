import { useNavigate } from 'react-router-dom'

export function useRouter() {
  const navigate = useNavigate()

  const push = (pathname: string, query?: unknown) => {
    navigate(
      `${pathname}${query ? `?${new URLSearchParams(query as URLSearchParams)}` : ''}`
    )
  }

  return { push }
}
