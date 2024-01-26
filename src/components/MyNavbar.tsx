import { Avatar } from '@nextui-org/react'

interface Props {
  children?: React.ReactNode
}

export default function MyNavbar({ children }: Props) {
  return (
    <nav
      className="fixed bottom-4 left-[50%] z-20
      flex -translate-x-1/2 items-center gap-4 rounded-xl bg-background/70 p-4
      shadow-md backdrop-blur-md backdrop-saturate-150"
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
