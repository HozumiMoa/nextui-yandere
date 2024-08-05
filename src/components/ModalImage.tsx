import { useEffect } from 'react'
import { YandeImage } from '../interfaces/image'
import { AnimatePresence, motion } from 'framer-motion'
import { imageAccelerate } from '@/utils'

interface Props {
  isOpen: boolean
  onOpenChange: () => void
  image: YandeImage
  onModalPageChange: (action: 'prev' | 'next') => void
}

export default function ModalImage(props: Props): React.ReactElement {
  const { isOpen, onOpenChange, image, onModalPageChange } = props
  const { sample_url, sample_width, sample_height } = image

  const handleClick = (e: React.MouseEvent) => {
    if (e.target !== e.currentTarget) return
    onOpenChange()
  }

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        onModalPageChange('prev')
      } else if (e.key === 'ArrowRight') {
        onModalPageChange('next')
      }
    }

    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [onModalPageChange])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex bg-overlay/30 backdrop-blur-md backdrop-saturate-150"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClick}
        >
          <div
            className="relative m-auto select-none overflow-hidden rounded-xl"
            style={{
              // 模态框宽度不超过屏幕宽度的 90%，高度不超过屏幕高度的 90%，保持图片比例
              width: `min(90dvw, calc(90dvh * ${sample_width} / ${sample_height}), ${sample_width}px)`,
              height: `min(90dvh, calc(90dvw * ${sample_height} / ${sample_width}), ${sample_height}px)`,
            }}
          >
            <img
              className="size-full object-cover"
              src={imageAccelerate(sample_url)}
              width={sample_width}
              height={sample_height}
            />
            <div
              className="absolute left-0 top-0 z-10 h-full w-1/3 cursor-[url(@/assets/arrow_back_ios.svg),_pointer]"
              onClick={() => onModalPageChange('prev')}
            ></div>
            <div
              className="absolute right-0 top-0 z-10 h-full w-1/3 cursor-[url(@/assets/arrow_forward_ios.svg),_pointer]"
              onClick={() => onModalPageChange('next')}
            ></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
