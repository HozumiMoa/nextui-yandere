import { Avatar } from '@nextui-org/react'

interface Props {
  children?: React.ReactNode
}

export default function MyNavbar({ children }: Props) {
  return (
    <nav
      className="fixed bottom-0 left-[50%] z-20 flex max-h-20 max-w-full -translate-x-1/2
      items-center gap-4 overflow-scroll rounded-xl bg-background/70 p-4 shadow-md
      backdrop-blur-md backdrop-saturate-150 scrollbar-hide sm:bottom-4 sm:min-w-max"
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
