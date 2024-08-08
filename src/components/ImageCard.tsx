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
import { ReactNode, useRef } from 'react'
import type { YandeImage } from '../interfaces/image'
import ImageCardPopover from './ImageCardPopover'
import { imageAccelerate } from '@/utils'
import { EllipsisVertical } from 'lucide-react'
import { useInView } from 'framer-motion'

interface Props {
  image: YandeImage
  onPress: (id: number) => void
}

export default function ImageCard(props: Props): React.ReactElement {
  const { image, onPress } = props
  const { id, preview_url, sample_url, sample_width, sample_height } = image

  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true })

  return (
    <Card
      shadow="sm"
      radius="sm"
      isPressable
      className="size-full"
      onClick={() => onPress(id)}
      ref={cardRef}
    >
      <div
        className="w-full overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${preview_url})`,
        }}
      >
        <img
          src={isInView ? imageAccelerate(sample_url) : ''}
          width={sample_width}
          height={sample_height}
          className="transform-gpu transition-transform hover:scale-110"
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
              <EllipsisVertical className="size-6" />
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
