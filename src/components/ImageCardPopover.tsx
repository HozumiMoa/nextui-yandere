import pixivLogo from '@/assets/pixiv-logo.png'
import twitterLogo from '@/assets/twitter-logo.png'
import { YandeImage } from '@/interfaces/image'
import { Divider, Link } from '@nextui-org/react'
import Icon from './Icon'

interface Props {
  image: YandeImage
}

export default function ImageCardPopover(props: Props): React.ReactElement {
  const { image } = props
  const { tags, jpeg_url, width, height, file_url, file_ext, source } = image

  const isFilePng = file_ext === 'png'

  const handleTagPress = (tag: string) => {
    navigator.clipboard.writeText(tag)
  }

  const sourceButton = () => {
    if (!source.includes('twitter') && !source.includes('pximg')) {
      return null
    }

    let href = source
    let logo = twitterLogo

    if (source.includes('pximg')) {
      const pixivId = source.split('/').pop()!.split('_').shift()
      href = `https://www.pixiv.net/artworks/${pixivId}`
      logo = pixivLogo
    }

    return (
      <Link
        isBlock
        href={href}
        isExternal
        color="foreground"
        className="size-6 rounded-full p-0"
      >
        <img src={logo} alt="source" />
      </Link>
    )
  }

  return (
    <div className="flex max-w-60 flex-col gap-1 text-xs">
      <div className="flex flex-wrap gap-x-2 gap-y-1">
        {tags.split(' ').map((tag) => (
          <Link
            key={tag}
            color="foreground"
            className="text-xs"
            onPress={() => handleTagPress(tag)}
          >
            {tag}
          </Link>
        ))}
      </div>
      <Divider />
      <div className="flex items-center justify-start gap-1">
        <Link
          isBlock
          href={jpeg_url}
          isExternal
          color="foreground"
          className="h-8 text-xs after:rounded-full"
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
            className="h-8 text-xs after:rounded-full"
          >
            <Icon name="download" />
            PNG
          </Link>
        )}
        {sourceButton()}
        <span className="ml-auto">
          {width}x{height}
        </span>
      </div>
    </div>
  )
}
