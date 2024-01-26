import { useRef } from 'react'

// 防抖函数
export default function useDebounce<T>(
  func: (...args: T[]) => void,
  delay: number
) {
  const timerRef = useRef<NodeJS.Timeout>()

  return function (this: unknown, ...args: T[]) {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
