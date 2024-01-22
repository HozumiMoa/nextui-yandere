import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Link,
} from '@nextui-org/react'
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

  return (
    <Card shadow="sm" key={id} isPressable onPress={() => onPress(id)}>
      <CardBody className="overflow-visible p-0">
        <Image
          isZoomed
          shadow="sm"
          radius="none"
          width="100%"
          loading="lazy"
          className="w-full object-cover h-[400px]"
          src={sample_url}
        />
      </CardBody>
      <CardFooter className="text-small justify-between">
        <Link
          href={`https://yande.re/post/show/${id}`}
          isExternal
          color="foreground"
          isBlock
          showAnchorIcon
        >
          <strong>{id}</strong>
        </Link>
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
                <span className="text-small whitespace-nowrap">
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
                <span className="text-small whitespace-nowrap">
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
