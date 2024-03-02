import { Image, Modal, ModalContent } from '@nextui-org/react'
import { YandeImage } from '../interfaces/image'

interface Props {
  isOpen: boolean
  onOpenChange: () => void
  image: YandeImage
  onModalPageChange: (action: 'prev' | 'next') => void
}

export default function ModalImage(props: Props): React.ReactElement {
  const { isOpen, onOpenChange, image, onModalPageChange } = props
  const { sample_url, sample_width, sample_height } = image

  const handleKeyUp = (e: React.KeyboardEvent) => {
    e.stopPropagation()
    if (e.key === 'ArrowLeft') {
      onModalPageChange('prev')
    } else if (e.key === 'ArrowRight') {
      onModalPageChange('next')
    }
  }

  return (
    <>
      <Modal
        backdrop="blur"
        hideCloseButton
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onKeyUp={handleKeyUp}
        classNames={{
          wrapper: 'items-center',
        }}
        style={{
          // 模态框宽度不超过屏幕宽度的 90%，高度不超过屏幕高度的 90%，保持图片比例
          maxWidth: `min(90dvw, calc(90dvh * ${sample_width} / ${sample_height}), ${sample_width}px)`,
          height: `min(90dvh, calc(90dvw * ${sample_height} / ${sample_width}), ${sample_height}px)`,
        }}
      >
        <ModalContent>
          <Image src={sample_url} width={sample_width} height={sample_height} />
          <div
            className="absolute left-0 z-10 h-full w-1/3 cursor-[url(@/assets/arrow_back_ios.svg),_pointer]"
            onClick={() => onModalPageChange('prev')}
          ></div>
          <div
            className="absolute right-0 z-10 h-full w-1/3 cursor-[url(@/assets/arrow_forward_ios.svg),_pointer]"
            onClick={() => onModalPageChange('next')}
          ></div>
        </ModalContent>
      </Modal>
    </>
  )
}
