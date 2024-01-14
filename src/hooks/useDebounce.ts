import { useState } from 'react'

// 防抖函数
export default function useDebounce<T>(
  func: (...args: T[]) => void,
  delay: number
) {
  const [timer, setTimer] = useState<number>()
  return function (this: unknown, ...args: T[]) {
    if (timer) {
      clearTimeout(timer)
    }
    setTimer(
      setTimeout(() => {
        func.apply(this, args)
      }, delay)
    )
  }
}
