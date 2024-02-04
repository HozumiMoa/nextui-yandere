import {
  Button,
  Card,
  CardFooter,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Link,
} from '@nextui-org/react'
import { useState } from 'react'
import type { YandeImage } from '../interfaces/image'
import Icon from './Icon'

interface Props {
  image: YandeImage
  onPress: (id: number) => void
}

export default function ImageCard(props: Props): React.ReactElement {
  const { image, onPress } = props
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

  return (
    <Card
      shadow="sm"
      isPressable
      isFooterBlurred
      onPress={() => onPress(id)}
      className="h-[440px]"
    >
      <Image
        isZoomed
        removeWrapper
        loading="lazy"
        className="z-0 h-full w-full object-cover"
        src={sample_url}
        onError={() => setErrorMsg('图片加载失败')}
      />
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
        <Dropdown placement="top-start">
          <DropdownTrigger>
            <Button isIconOnly variant="light">
              <Icon name="manage_search" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu variant="flat" aria-label="Dropdown menu with icons">
            <DropdownItem
              key="jpeg"
              description={`${jpeg_width}x${jpeg_height}`}
              startContent={<Icon name="download" />}
              endContent={
                <span className="whitespace-nowrap text-small">
                  {fileSize(jpeg_file_size)}
                </span>
              }
              href={jpeg_url}
              target="jpeg"
            >
              JPEG
            </DropdownItem>
            <DropdownItem
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
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </CardFooter>
    </Card>
  )
}
