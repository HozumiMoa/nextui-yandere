import { createContext, ReactNode, useContext, useState } from 'react'

type Service = {
  source: 'yandere' | 'danbooru'
  limit: number
}
type ServiceContextType = {
  service: Service
  setService: React.Dispatch<React.SetStateAction<Service>>
}

const ServiceContextType = createContext<ServiceContextType>(
  {} as ServiceContextType
)

export function ServiceProvider({ children }: { children: ReactNode }) {
  const [service, setService] = useState<Service>({
    source: 'yandere',
    limit: 12,
  })

  return (
    <ServiceContextType.Provider value={{ service, setService }}>
      {children}
    </ServiceContextType.Provider>
  )
}

export function useService() {
  return useContext(ServiceContextType)
}
