import { NextUIProvider } from '@nextui-org/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { DeviceProvider } from './context/device.tsx'
import { ThemeProvider } from './context/theme.tsx'
import './index.css'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
    },
  ],
  {
    basename: '/nextui-yandere',
  }
)

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
