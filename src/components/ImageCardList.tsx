import { YandeImage } from '@/interfaces/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import ImageCard from './ImageCard'

interface Props {
  list: YandeImage[]
  handleModalOpen: (id: number) => void
}

export default function ImageCardList(props: Props): React.ReactElement {
  const { list, handleModalOpen } = props

  // 实现瀑布流布局
  const columnWidth = 300
  const gap = 16
  const [containerWidth, setContainerWidth] = useState(1200)
  const columnCount = Math.max(
    2,
    Math.floor((containerWidth + gap) / (columnWidth + gap))
  )
  const columnHeights = useMemo(() => {
    list // 为了触发重新计算
    return Array.from({ length: columnCount }, () => 0)
  }, [columnCount, list])

  // 根据图片的宽高比计算图片的高度和位置
  const styles = useMemo(() => {
    console.log('calculating styles...')
    return {
      items: list.map((item, index) => {
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
          '--delay': index,
        }
      }),
      masonry: {
        width: `${columnCount * (columnWidth + gap) - gap}px`,
        height: `${Math.max(...columnHeights) - gap}px`,
      },
    }
  }, [list, columnCount, columnHeights])

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
          <ImageCard
            key={image.id}
            image={image}
            onPress={handleModalOpen}
            className="animation-composition-add absolute left-0 top-0 animate-fade-in opacity-0"
            style={styles.items[index]}
          />
        ))}
      </div>
    </div>
  )
}
