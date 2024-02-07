import { YandeImage } from '@/interfaces/image'
import ImageCard from './ImageCard'

interface Props {
  list: YandeImage[]
  handleModalOpen: (id: number) => void
}

export default function ImageCardList(props: Props): React.ReactElement {
  const { list, handleModalOpen } = props
  return (
    <div className="px-0 py-4 pb-28 sm:columns-2 sm:px-16 lg:columns-3 xl:columns-4">
      {list.map((image, index) => (
        <ImageCard
          key={image.id}
          image={image}
          onPress={handleModalOpen}
          style={{ '--delay': index } as React.CSSProperties}
        />
      ))}
    </div>
  )
}
