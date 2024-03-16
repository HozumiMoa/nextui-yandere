import { YandeImage } from '@/interfaces/image'
import { remToPx } from '@/utils'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import ImageCard from './ImageCard'

interface Props {
  list: YandeImage[]
  handleModalOpen: (id: number) => void
}

export default function ImageCardList(props: Props): React.ReactElement {
  const { list, handleModalOpen } = props

  const gap = remToPx(0.75)
  const columnWidth = 300
  const [containerWidth, setContainerWidth] = useState(2 * columnWidth + gap)
  const columnCount = Math.max(
    2,
    Math.floor((containerWidth + gap) / (columnWidth + gap))
  )

  // 根据图片的宽高比计算图片的高度和位置
  const styles = useMemo(() => {
    const columnHeights = Array.from({ length: columnCount }, () => 0)

    return {
      items: list.map((item) => {
        const columnIndex = columnHeights.indexOf(Math.min(...columnHeights))
        const width = (containerWidth - gap * (columnCount - 1)) / columnCount
        const height = (width / item.width) * item.height
        const x = columnIndex * (width + gap)
        const y = columnHeights[columnIndex]
        columnHeights[columnIndex] += height + gap

        return {
          width: `${width}px`,
          height: `${height}px`,
          transform: `translate3d(${x}px, ${y}px, 0)`,
        }
      }),
      masonry: {
        height: `${Math.max(...columnHeights) - gap}px`,
      },
    }
  }, [columnCount, containerWidth, gap, list])

  // 监视 containerRef 的宽度变化
  const containerRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<ResizeObserver | null>(null)
  const handleResize = useDebouncedCallback((width: number) => {
    setContainerWidth(width)
  }, 500)

  useEffect(() => {
    const getObserver = () => {
      if (observerRef.current) return observerRef.current
      const observer = new ResizeObserver((entries) => {
        handleResize(entries[0].target.firstElementChild!.clientWidth)
      })
      observerRef.current = observer
      return observer
    }

    const observer = getObserver()
    observer.observe(containerRef.current!)

    return () => {
      observer.disconnect()
    }
  }, [handleResize])

  return (
    <div ref={containerRef} className="container mx-auto mb-28 p-3 pb-0">
      <ul className="relative" style={styles.masonry}>
        {list.map((image, index) => (
          <li
            key={image.id}
            className="absolute left-0 top-0 transition-[transform,width,height] !duration-500"
            style={styles.items[index]}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, type: 'spring' }}
            >
              <ImageCard image={image} onPress={handleModalOpen} />
            </motion.div>
          </li>
        ))}
      </ul>
    </div>
  )
}
