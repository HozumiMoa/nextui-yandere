import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Link,
  Listbox,
  ListboxItem,
  Tooltip,
} from '@nextui-org/react'
import { useState } from 'react'
import type { YandeImage } from '../interfaces/image'
import Icon from './Icon'

interface Props {
  image: YandeImage
  onPress: (id: number) => void
  style?: React.CSSProperties
}

export default function ImageCard(props: Props): React.ReactElement {
  const { image, onPress, style } = props
  const {
    id,
    sample_url,
    jpeg_url,
    jpeg_file_size,
    jpeg_width,
    jpeg_height,
    file_url,
    file_size,
  } = image

  const [isShow, setIsShow] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  // 计算文件大小，单位为 MB
  const fileSize = (size: number): string => {
    return (size / 1024 / 1024).toFixed(2) + ' MB'
  }

  const listbox = (
    <Listbox variant="flat" aria-label="Actions">
      <ListboxItem
        key="jpeg"
        description={`${jpeg_width}x${jpeg_height}`}
        startContent={<Icon name="download" />}
        endContent={
          <span className="whitespace-nowrap text-small">
            {jpeg_file_size ? fileSize(jpeg_file_size) : fileSize(file_size)}
          </span>
        }
        href={jpeg_url}
        target="jpeg"
      >
        JPEG
      </ListboxItem>
      <ListboxItem
        key="png"
        startContent={<Icon name="download" />}
        endContent={
          <span className="whitespace-nowrap text-small">
            {fileSize(file_size)}
          </span>
        }
        href={file_url}
        target="png"
      >
        PNG
      </ListboxItem>
    </Listbox>
  )

  return (
    <Card
      shadow="sm"
      isPressable
      isFooterBlurred
      onPress={() => onPress(id)}
      className={isShow ? 'animate-fade-in' : 'opacity-0'}
      style={style}
    >
      <CardBody className="p-0">
        <Image
          isZoomed
          loading="lazy"
          src={sample_url}
          onLoad={() => setIsShow(true)}
          onError={() => {
            setErrorMsg('图片加载失败')
            setIsShow(true)
          }}
        />
      </CardBody>
      <CardFooter className="absolute bottom-0 z-10 justify-between bg-white/30 py-2 text-small">
        <Link
          href={`https://yande.re/post/show/${id}`}
          isExternal
          color="foreground"
          isBlock
          showAnchorIcon
        >
          <strong>{id}</strong>
        </Link>
        <span className="text-danger">{errorMsg}</span>
        <Tooltip placement="top-start" content={listbox} className="p-1">
          <Button isIconOnly variant="light">
            <Icon name="more_vert" />
          </Button>
        </Tooltip>
      </CardFooter>
    </Card>
  )
}
