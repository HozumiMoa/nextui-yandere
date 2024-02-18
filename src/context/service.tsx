import { createContext, ReactNode, useContext, useState } from 'react'

type Service = 'yandere' | 'danbooru'
type ServiceContextType = {
  service: Service
  setService: React.Dispatch<React.SetStateAction<Service>>
}

const ServiceContextType = createContext<ServiceContextType>(
  {} as ServiceContextType
)

export function ServiceProvider({ children }: { children: ReactNode }) {
  const [service, setService] = useState<Service>('yandere')

  return (
    <ServiceContextType.Provider value={{ service, setService }}>
      {children}
    </ServiceContextType.Provider>
  )
}

export function useService() {
  return useContext(ServiceContextType)
}
