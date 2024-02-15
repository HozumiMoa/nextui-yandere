/**
 * @description 获取设备类型
 */
export const getDeviceType = () => {
  const ua = navigator.userAgent

  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet'
  }
  if (
    /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/.test(
      ua
    )
  ) {
    return 'mobile'
  }
  return 'desktop'
}
