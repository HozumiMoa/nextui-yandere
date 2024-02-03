import { Avatar } from '@nextui-org/react'
import React from 'react'

export default function MyNavbar({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <nav
      className="fixed bottom-0 left-[50%] z-20 flex max-h-20 max-w-full -translate-x-1/2
      items-center justify-start gap-4 rounded-xl bg-background/70 p-4 shadow-md
      backdrop-blur-md backdrop-saturate-150 sm:bottom-4 sm:min-w-max"
    >
      <Avatar
        isBordered
        color="danger"
        src="https://yande.re/data/avatars/241578.jpg"
        className="flex-shrink-0"
      />
      {children}
    </nav>
  )
}
