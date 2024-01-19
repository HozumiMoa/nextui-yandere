import { Image, Modal, ModalContent } from '@nextui-org/react'
import ArrowBack from '../assets/arrow_back_ios.svg'
import ArrowForward from '../assets/arrow_forward_ios.svg'
import { YandeImage } from '../interfaces/image'

interface Props {
  isOpen: boolean
  onOpenChange: () => void
  image: YandeImage | undefined
  /**
   * @description 模态框翻页
   * @param isUp 是否向上翻页
   */
  onModalPageChange: (isUp: boolean) => void
}

export default function ModalImage(props: Props): React.ReactElement {
  const { isOpen, onOpenChange, image, onModalPageChange } = props
  const modalSize = {
    width: 0,
    height: 0,
  }

  // 调整模态框大小不超过屏幕
  const resizeModal = (width: number = 0, height: number = 0) => {
    const { innerHeight, innerWidth } = window
    const ratio = width / height
    const resizeWidth = Math.min(innerWidth * 0.9, width)
    const resizeHeight = Math.min(innerHeight * 0.9, height)
    if (resizeHeight * ratio > resizeWidth) {
      modalSize.width = resizeWidth
      modalSize.height = resizeWidth / ratio
    } else {
      modalSize.width = resizeHeight * ratio
      modalSize.height = resizeHeight
    }
  }

  resizeModal(image?.sample_width, image?.sample_height)

  const handleKeyUp = (e: React.KeyboardEvent) => {
    e.stopPropagation()
    if (e.key === 'ArrowLeft') {
      onModalPageChange(true)
    } else if (e.key === 'ArrowRight') {
      onModalPageChange(false)
    }
  }

  return (
    <>
      {image && (
        <Modal
          backdrop="blur"
          hideCloseButton={true}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onKeyUp={handleKeyUp}
          style={{ maxWidth: modalSize.width, height: modalSize.height }}
        >
          <ModalContent>
            <Image src={image.sample_url} />
            <div
              className="absolute w-1/3 h-full z-10 left-0"
              onClick={() => onModalPageChange(true)}
              style={{ cursor: `url(${ArrowBack}), pointer` }}
            ></div>
            <div
              className="absolute w-1/3 h-full z-10 right-0"
              onClick={() => onModalPageChange(false)}
              style={{ cursor: `url(${ArrowForward}), pointer` }}
            ></div>
          </ModalContent>
        </Modal>
      )}
    </>
  )
}
