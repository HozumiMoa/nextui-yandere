import { useDevice } from '@/context/device'
import {
  Button,
  Card,
  CardFooter,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from '@nextui-org/react'
import { ReactNode, useState } from 'react'
import type { YandeImage } from '../interfaces/image'
import ImageCardPopover from './ImageCardPopover'
import { EllipsisVertical } from 'lucide-react'

interface Props {
  image: YandeImage
  onPress: (id: number) => void
}

export default function ImageCard(props: Props): React.ReactElement {
  const { image, onPress } = props
  const { id, preview_url, sample_url, sample_width, sample_height } = image

  const [url, setUrl] = useState(sample_url)
  // const errorCount = useRef(0) // 图片加载失败次数，超过 3 次则不再尝试加载
  // const timeout = useRef<NodeJS.Timeout | null>(null)

  // FIXME: 图片加载失败时的处理
  const handleError = () => {
    setUrl(preview_url)
    // if (errorCount.current >= 3) return
    // errorCount.current++
    // timeout.current && clearTimeout(timeout.current)
    // timeout.current = setTimeout(() => {
    //   setUrl(sample_url)
    // }, 0)
  }

  // useEffect(() => {
  //   return () => {
  //     timeout.current && clearTimeout(timeout.current)
  //   }
  // }, [])

  return (
    <Card
      shadow="sm"
      radius="sm"
      isPressable
      className="size-full"
      onClick={() => onPress(id)}
    >
      <div
        className="w-full overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${preview_url})`,
        }}
      >
        <img
          loading="lazy"
          src={url}
          width={sample_width}
          height={sample_height}
          className="transform-gpu transition-transform hover:scale-110"
          onError={handleError}
        />
      </div>
      {/* 渐变遮罩 */}
      <div className="pointer-events-none absolute bottom-0 z-10 h-1/2 w-full bg-gradient-to-t from-black/50"></div>
      <CardFooter className="absolute bottom-0 z-10 justify-between p-2 text-small">
        <Link
          href={`https://yande.re/post/show/${id}`}
          isExternal
          color="foreground"
          isBlock
          showAnchorIcon
          className="text-white"
        >
          <strong>{id}</strong>
        </Link>
        <More
          trigger={
            <Button
              isIconOnly
              variant="light"
              className="rounded-full text-white"
            >
              <EllipsisVertical />
            </Button>
          }
          content={<ImageCardPopover image={image} />}
        />
      </CardFooter>
    </Card>
  )
}

const More = ({
  trigger,
  content,
}: {
  trigger: ReactNode
  content: ReactNode
}) => {
  const { isMobile } = useDevice()

  return isMobile ? (
    <Popover placement="top-start">
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent>{content}</PopoverContent>
    </Popover>
  ) : (
    <Tooltip placement="top-start" content={content}>
      {trigger}
    </Tooltip>
  )
}
