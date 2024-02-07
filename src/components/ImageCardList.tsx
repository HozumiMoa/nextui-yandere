import { YandeImage } from '@/interfaces/image'
import { useEffect, useState } from 'react'
import ImageCard from './ImageCard'

interface Props {
  list: YandeImage[]
  handleModalOpen: (id: number) => void
}

export default function ImageCardList(props: Props): React.ReactElement {
  const { list, handleModalOpen } = props

  const [columnCount, setColumnCount] = useState(3)
  const columnHeight = Array(columnCount).fill(0)
  const columnList = Array(columnCount)
    .fill(0)
    .map(() => [] as YandeImage[])

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setColumnCount(1)
      } else if (width < 1024) {
        setColumnCount(2)
      } else if (width < 1280) {
        setColumnCount(3)
      } else {
        setColumnCount(4)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  list.forEach((image) => {
    const minHeight = Math.min(...columnHeight)
    const minIndex = columnHeight.indexOf(minHeight)
    columnList[minIndex].push(image)
    columnHeight[minIndex] += image.sample_height / image.sample_width
  })

  return (
    <div className="flex flex-nowrap gap-4 px-16 py-4 pb-28">
      {columnList.map((list, index1) => (
        <div key={index1} className="flex flex-1 flex-col gap-4">
          {list.map((image, index2) => {
            return (
              <ImageCard
                key={image.id}
                image={image}
                onPress={handleModalOpen}
                style={{ '--delay': index1 + index2 } as React.CSSProperties}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}
