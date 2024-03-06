function getRootFontSize(): number {
  const rootElement = document.documentElement
  const computedStyle = window.getComputedStyle(rootElement)
  const fontSize = computedStyle.getPropertyValue('font-size')
  return parseFloat(fontSize)
}

export function remToPx(rem: number): number {
  return rem * getRootFontSize()
}
