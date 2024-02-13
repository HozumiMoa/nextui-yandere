import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Link,
  Tooltip,
} from '@nextui-org/react'
import { useState } from 'react'
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
  const { id, sample_url, sample_width, sample_height } = image

  const [sampleUrl, setSampleUrl] = useState(sample_url)
  const [errorCount, setErrorCount] = useState(0) // 图片加载失败次数，超过 3 次则不再尝试加载
  const [errorMsg, setErrorMsg] = useState('')

  // 图片加载完成时的处理
  const handleLoad = () => {
    setErrorCount(0)
    setErrorMsg('')
  }

  // 图片加载失败时的处理
  const handleError = () => {
    if (errorCount < 3) {
      setErrorCount(errorCount + 1)
      setErrorMsg(`加载失败，正在重试第 ${errorCount + 1} 次...`)
      setSampleUrl(sampleUrl + '?t=' + Date.now())
    } else {
      setErrorMsg('图片加载失败')
    }
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
          width={sample_width}
          height={sample_height}
          src={sampleUrl}
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
        <span className="text-danger">{errorMsg}</span>
        <Tooltip
          placement="top-start"
          content={<ImageCardPopover image={image} />}
        >
          <Button isIconOnly variant="light">
            <Icon name="more_vert" className="text-white" />
          </Button>
        </Tooltip>
      </CardFooter>
    </Card>
  )
}
