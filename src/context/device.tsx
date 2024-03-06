import { ReactNode, createContext, useContext } from 'react'

type DeviceContextType = {
  isMobile: boolean
}

const DeviceContext = createContext({} as DeviceContextType)

export function DeviceProvider({ children }: { children: ReactNode }) {
  const isMobile = window.matchMedia('(max-width: 640px)').matches

  return (
    <DeviceContext.Provider value={{ isMobile }}>
      {children}
    </DeviceContext.Provider>
  )
}

export function useDevice() {
  return useContext(DeviceContext)
}
