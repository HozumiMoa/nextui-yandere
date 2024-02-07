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

  // 计算文件大小，单位为 MB
  const fileSize = (size: number): string => {
    return (size / 1024 / 1024).toFixed(2) + ' MB'
  }

  const [errorMsg, setErrorMsg] = useState('')

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
      className="animate-fade-in"
      style={style}
    >
      <CardBody className="overflow-visible p-0">
        <Image
          isZoomed
          width="100%"
          loading="lazy"
          className="z-0 h-[400px] w-full object-cover"
          src={sample_url}
          onError={() => setErrorMsg('图片加载失败')}
        />
      </CardBody>
      <CardFooter className="absolute bottom-0 z-10 justify-between bg-white/40 text-small">
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
            <Icon name="manage_search" />
          </Button>
        </Tooltip>
      </CardFooter>
    </Card>
  )
}
