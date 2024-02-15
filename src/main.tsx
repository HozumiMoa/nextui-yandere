import { NextUIProvider } from '@nextui-org/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { DeviceProvider } from './context/device.tsx'
import { ThemeProvider } from './context/theme.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <ThemeProvider>
        <DeviceProvider>
          <App />
        </DeviceProvider>
      </ThemeProvider>
    </NextUIProvider>
  </React.StrictMode>
)
