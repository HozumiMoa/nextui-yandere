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
  imageList: YandeImage[]
  handleModalOpen: (item: YandeImage) => void
}

export default function ImageCardList(props: Props): React.ReactElement {
  const { imageList, handleModalOpen } = props
  return (
    <div className="px-20 py-5 pb-28 gap-4 grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {imageList.map(item => (
        <Card
          shadow="sm"
          key={item.id}
          isPressable
          onPress={() => handleModalOpen(item)}
        >
          <CardBody className="overflow-visible p-0">
            <Image
              isZoomed
              shadow="sm"
              radius="lg"
              width="100%"
              loading="lazy"
              className="w-full object-cover h-[400px]"
              src={item.sample_url}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <Link
              href={`https://yande.re/post/show/${item.id}`}
              isExternal
              color="foreground"
              isBlock
              showAnchorIcon
            >
              <b>{item.id}</b>
            </Link>
            <Popover placement="top" radius="sm">
              <PopoverTrigger>
                <Button isIconOnly variant="light">
                  <span className="material-symbols-rounded">
                    manage_search
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="flex-row flex-wrap gap-1 max-w-80 bg-transparent shadow-none">
                {item.tags.split(' ').map(tag => {
                  return <Chip key={tag}>{tag}</Chip>
                })}
              </PopoverContent>
            </Popover>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
