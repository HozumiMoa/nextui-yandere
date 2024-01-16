import { Modal, ModalContent, Image } from '@nextui-org/react'

interface Props {
  isOpen: boolean
  onOpenChange: () => void
  src: string
  style?: React.CSSProperties
}

export default function ModalImage(props: Props): React.ReactElement {
  const { isOpen, onOpenChange, src, style } = props

  return (
    <Modal
      backdrop="blur"
      hideCloseButton={true}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      style={style}
    >
      <ModalContent>
        <Image src={src} />
      </ModalContent>
    </Modal>
  )
}
