import { useDevice } from '@/context/device'
import { YandeImage } from '@/interfaces/image'
import { remToPx } from '@/utils'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import ImageCard from './ImageCard'

interface Props {
  list: YandeImage[]
  handleModalOpen: (id: number) => void
}

export default function ImageCardList(props: Props): React.ReactElement {
  const { list, handleModalOpen } = props
  const { isMobile } = useDevice()

  const gap = remToPx(1)
  const columnWidth = isMobile ? (window.innerWidth - 3 * gap) / 2 : 300
  const [containerWidth, setContainerWidth] = useState(window.innerWidth)
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
        const x = columnIndex * (columnWidth + gap)
        const y = columnHeights[columnIndex]
        const width = columnWidth
        const height = item.height * (columnWidth / item.width)
        columnHeights[columnIndex] += height + gap
        return {
          width: `${width}px`,
          height: `${height}px`,
          transform: `translate3d(${x}px, ${y}px, 0)`,
        }
      }),
      masonry: {
        width: `${columnCount * (columnWidth + gap) - gap}px`,
        height: `${Math.max(...columnHeights) - gap}px`,
      },
    }
  }, [columnCount, columnWidth, gap, list])

  // 监视 containerRef 的宽度变化
  const containerRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<ResizeObserver | null>(null)
  const handleResize = useDebouncedCallback((width: number) => {
    setContainerWidth(width)
  }, 500)
  const getObserver = useCallback(() => {
    if (observerRef.current) return observerRef.current
    const observer = new ResizeObserver((entries) => {
      handleResize(entries[0].contentRect.width)
    })
    observerRef.current = observer
    return observer
  }, [handleResize])

  useEffect(() => {
    const observer = getObserver()
    observer.observe(containerRef.current!)

    return () => {
      observer.disconnect()
    }
  }, [getObserver])

  return (
    <div ref={containerRef} className="flex w-full justify-center">
      <div className="relative" style={styles.masonry}>
        {list.map((image, index) => (
          <div
            key={image.id}
            className="absolute left-0 top-0 transition-transform"
            style={styles.items[index]}
          >
            <div
              className="animate-fade-in opacity-0"
              style={{ '--delay': index } as React.CSSProperties}
            >
              <ImageCard image={image} onPress={handleModalOpen} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
