import { YandeImage } from '@/interfaces/image'
import { Divider, Link } from '@nextui-org/react'
import Icon from './Icon'

interface Props {
  image: YandeImage
}

export default function ImageCardPopover(props: Props): React.ReactElement {
  const { image } = props
  const { tags, jpeg_url, width, height, file_url, file_ext } = image

  const isFilePng = file_ext === 'png'

  const handleTagPress = (tag: string) => {
    navigator.clipboard.writeText(tag)
  }

  return (
    <div className="flex max-w-60 flex-col gap-1 text-xs">
      <div className="flex flex-wrap gap-1">
        {tags.split(' ').map((tag) => (
          <Link
            key={tag}
            color="foreground"
            className="pr-1 text-xs"
            onPress={() => handleTagPress(tag)}
          >
            {tag}
          </Link>
        ))}
      </div>
      <Divider />
      <div className="flex items-center justify-between gap-1">
        <div className="flex">
          <Link
            isBlock
            href={jpeg_url}
            isExternal
            color="foreground"
            className="text-xs"
          >
            <Icon name="download" />
            JPEG
          </Link>
          {isFilePng && (
            <Link
              isBlock
              href={file_url}
              isExternal
              color="foreground"
              className="text-xs"
            >
              <Icon name="download" />
              PNG
            </Link>
          )}
        </div>
        <span>
          {width}x{height}
        </span>
      </div>
    </div>
  )
}
