import { useDevice } from '@/context/device'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from '@nextui-org/react'
import { ReactNode, useRef, useState } from 'react'
import type { YandeImage } from '../interfaces/image'
import Icon from './Icon'
import ImageCardPopover from './ImageCardPopover'

interface Props {
  image: YandeImage
  onPress: (id: number) => void
  style?: React.CSSProperties
}

export default function ImageCard(props: Props): React.ReactElement {
  const { image, onPress, style } = props
  const { id, preview_url, sample_url, sample_width, sample_height } = image
  const { isMobile } = useDevice()

  const [url, setUrl] = useState(isMobile ? preview_url : sample_url)
  const errorCount = useRef(0) // 图片加载失败次数，超过 3 次则不再尝试加载
  const timer = useRef<NodeJS.Timeout | null>(null) // 重试定时器
  const [errorMsg, setErrorMsg] = useState('')

  // 图片加载完成时的处理
  const handleLoad = () => {
    setErrorMsg('')
    timer.current && clearTimeout(timer.current)
  }

  // 图片加载失败时的处理
  const handleError = () => {
    if (errorCount.current >= 3) {
      setErrorMsg('图片加载失败')
      timer.current && clearTimeout(timer.current)
      return
    }

    errorCount.current++
    setErrorMsg('加载失败，正在重试...')
    setUrl('')
    timer.current = setTimeout(() => setUrl(sample_url), 0)
  }

  return (
    <Card
      shadow="sm"
      isPressable
      onPress={() => onPress(id)}
      className="animate-fade-in"
      style={style}
    >
      <CardBody className="p-0">
        <Image
          isZoomed
          loading="lazy"
          src={url}
          width={sample_width}
          height={sample_height}
          onLoad={handleLoad}
          onError={handleError}
        />
      </CardBody>
      {/* 渐变遮罩 */}
      <div className="pointer-events-none absolute bottom-0 z-10 h-1/2 w-full bg-gradient-to-t from-black/50"></div>
      <CardFooter className="absolute bottom-0 z-10 justify-between py-2 text-small">
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
        <span className="whitespace-nowrap text-danger">{errorMsg}</span>
        <More
          trigger={
            <Button isIconOnly variant="light" className="rounded-full">
              <Icon name="more_vert" className="text-white" />
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
