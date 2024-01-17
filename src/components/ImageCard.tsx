import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Chip,
  Image,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react'
import type { YandeImage } from '../interfaces/image'

interface Props {
  image: YandeImage
  onPress: (id: number) => void
}

export default function ImageCard(props: Props): React.ReactElement {
  const { image, onPress } = props
  return (
    <Card
      shadow="sm"
      key={image.id}
      isPressable
      onPress={() => onPress(image.id)}
    >
      <CardBody className="overflow-visible p-0">
        <Image
          isZoomed
          shadow="sm"
          radius="none"
          width="100%"
          loading="lazy"
          className="w-full object-cover h-[400px]"
          src={image.sample_url}
        />
      </CardBody>
      <CardFooter className="text-small justify-between">
        <Link
          href={`https://yande.re/post/show/${image.id}`}
          isExternal
          color="foreground"
          isBlock
          showAnchorIcon
        >
          <b>{image.id}</b>
        </Link>
        <Popover placement="top" radius="sm">
          <PopoverTrigger>
            <Button isIconOnly variant="light">
              <span className="material-symbols-rounded">manage_search</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="flex-row flex-wrap gap-1 max-w-80 bg-transparent shadow-none">
            {image.tags.split(' ').map(tag => {
              return (
                <Chip
                  className="select-none cursor-pointer"
                  key={tag}
                  onClick={() => {
                    // 复制到剪切板
                    navigator.clipboard.writeText(tag)
                  }}
                >
                  {tag}
                </Chip>
              )
            })}
          </PopoverContent>
        </Popover>
      </CardFooter>
    </Card>
  )
}
