import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

export function useRouter() {
  const navigate = useNavigate()

  /**
   * @description 导航到指定的路径
   * @param {string} pathname - 要导航到的路径
   * @param {unknown} query - 要附加到路径的查询参数
   * @returns {void}
   */
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
