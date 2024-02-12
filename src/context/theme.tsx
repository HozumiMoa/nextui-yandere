import { ReactNode, createContext, useContext, useState } from 'react'

type Theme = 'light' | 'dark'
type ThemeContextType = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext({} as ThemeContextType)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <main className={`bg-background text-foreground ${theme}`}>
        {children}
      </main>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
