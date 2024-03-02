import { NextUIProvider } from '@nextui-org/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { DeviceProvider } from './context/device.tsx'
import { ThemeProvider } from './context/theme.tsx'
import './index.css'
import { router } from './routes'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <ThemeProvider>
        <DeviceProvider>
          <RouterProvider router={router} />
        </DeviceProvider>
      </ThemeProvider>
    </NextUIProvider>
  </React.StrictMode>
)
