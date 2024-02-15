import { getDeviceType } from '@/tools'
import { ReactNode, createContext, useContext } from 'react'

type Device = 'mobile' | 'desktop' | 'tablet'
type DeviceContextType = {
  device: Device
  isMobile: boolean
}

const DeviceContext = createContext({} as DeviceContextType)

export function DeviceProvider({ children }: { children: ReactNode }) {
  const device = getDeviceType()
  const isMobile = device === 'mobile'

  return (
    <DeviceContext.Provider value={{ device, isMobile }}>
      {children}
    </DeviceContext.Provider>
  )
}

export function useDevice() {
  return useContext(DeviceContext)
}
