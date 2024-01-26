import { Avatar } from '@nextui-org/react'

interface Props {
  children?: React.ReactNode
}

export default function MyNavbar({ children }: Props) {
  return (
    <nav
      className="flex items-center gap-4 shadow-md
      fixed z-20 bottom-4 left-[50%] -translate-x-1/2 p-4 rounded-xl
      backdrop-saturate-150 backdrop-blur-md bg-background/70"
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
