function getRootFontSize(): number {
  const rootElement = document.documentElement
  const computedStyle = window.getComputedStyle(rootElement)
  const fontSize = computedStyle.getPropertyValue('font-size')
  return parseFloat(fontSize)
}

export function remToPx(rem: number): number {
  return rem * getRootFontSize()
}

/**
 * 图片加速服务
 * @param url 图片地址
 * @returns
 */
export function imageAccelerate(url: string): string {
  // i0、i1、i2、i3 均可
  return url.replace('https://', 'https://i3.wp.com/')
}
