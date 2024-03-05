import { YandeImage } from '@/interfaces/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import ImageCard from './ImageCard'

interface Props {
  list: YandeImage[]
  handleModalOpen: (id: number) => void
}

export default function ImageCardList(props: Props): React.ReactElement {
  const { list, handleModalOpen } = props

  // TODO: 优化瀑布流布局
  const columnWidth =
    window.innerWidth > 640 ? 300 : (window.innerWidth - 40) / 2
  const gap = 16
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
  }, [columnCount, list, columnWidth])

  // 监视 containerRef 的宽度变化
  const containerRef = useRef<HTMLDivElement>(null)
  const observer = useRef<ResizeObserver | null>(null)
  useEffect(() => {
    observer.current = new ResizeObserver((entries) => {
      setContainerWidth(entries[0].contentRect.width)
    })
    observer.current.observe(containerRef.current!)

    return () => {
      observer.current?.disconnect()
    }
  }, [])

  return (
    <div ref={containerRef} className="flex w-full justify-center">
      <div className="relative" style={styles.masonry}>
        {list.map((image, index) => (
          <div
            key={image.id}
            className="absolute left-0 top-0 transition-transform"
            style={styles.items[index]}
          >
            <ImageCard
              image={image}
              onPress={handleModalOpen}
              className="size-full animate-fade-in opacity-0"
              style={{ '--delay': index } as React.CSSProperties}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
