import { useRef, useState, useEffect, useCallback } from 'react'
import {
  Navbar,
  NavbarContent,
  Input,
  NavbarItem,
  Button,
  ButtonGroup,
  Card,
  Image,
  CardBody,
  Modal,
  ModalContent,
  useDisclosure,
  CardFooter,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Chip,
} from '@nextui-org/react'
import { SearchIcon } from './components/SearchIcon.tsx'
import './App.css'

interface YandeImage {
  id: number
  tags: string
  sample_url: string
  sample_width: number
  sample_height: number
}

function App() {
  const [tags, setTags] = useState<string>('minato_aqua gaou_(matsulatte)')
  const [page, setPage] = useState<number>(1)
  const inputRef = useRef<HTMLInputElement>(null)
  const [imageList, setImageList] = useState<YandeImage[]>([])
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [modalImage, setModalImage] = useState<string>('')
  const [modalSize, setModalSize] = useState({ height: 0, width: 0 })

  const fetchImageList = useCallback(async () => {
    const res = await fetch(
      `https://yande.re/post.json?limit=12&page=${page}&tags=${tags}`
    )
    const data = await res.json()
    setImageList(data)
  }, [tags, page])

  useEffect(() => {
    fetchImageList()
  }, [fetchImageList])

  const submit = () => {
    setTags(inputRef.current?.value || '')
    setPage(1)
  }

  const pageUp = () => {
    if (page === 1) return
    setPage(page => page - 1)
  }

  const pageDown = () => {
    setPage(page => page + 1)
  }

  const handleOpen = (item: YandeImage) => {
    onOpen()
    setModalImage(item.sample_url)

    // 让图片的大小不超过屏幕
    const { innerHeight, innerWidth } = window
    const { sample_height, sample_width } = item
    const ratio = sample_width / sample_height
    const height = Math.min(innerHeight * 0.9, sample_height)
    const width = Math.min(innerWidth * 0.9, sample_width)
    if (height * ratio > width) {
      setModalSize({
        height: width / ratio,
        width,
      })
    } else {
      setModalSize({
        height,
        width: height * ratio,
      })
    }
  }

  return (
    <>
      <Navbar shouldHideOnScroll>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Input
              placeholder="Type to search..."
              size="sm"
              startContent={<SearchIcon size={18} />}
              type="search"
              ref={inputRef}
              defaultValue={tags}
              style={{ width: '250px' }}
            />
          </NavbarItem>
          <NavbarItem>
            <Button size="lg" onClick={submit}>
              Submit
            </Button>
          </NavbarItem>
          <NavbarItem>
            <ButtonGroup>
              <Button size="lg" onClick={pageUp} isDisabled={page === 1}>
                ← Previous
              </Button>
              <Button size="lg">{page}</Button>
              <Button size="lg" onClick={pageDown}>
                Next →
              </Button>
            </ButtonGroup>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <div className="px-20 py-5 gap-4 grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {imageList.map(item => (
          <Card
            shadow="sm"
            key={item.id}
            isPressable
            onPress={() => handleOpen(item)}
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
                target="_blank"
                color="foreground"
                isBlock
              >
                <b>#{item.id}</b>
              </Link>
              <Popover placement="top" radius="sm">
                <PopoverTrigger>
                  <Button isIconOnly variant="light">
                    <span className="material-symbols-rounded">
                      manage_search
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="flex flex-row flex-wrap gap-1 max-w-[300px] bg-transparent shadow-none">
                  {item.tags.split(' ').map(tag => {
                    return <Chip key={tag}>{tag}</Chip>
                  })}
                </PopoverContent>
              </Popover>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Modal
        backdrop="blur"
        hideCloseButton={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        style={{ maxWidth: modalSize.width, height: modalSize.height }}
      >
        <ModalContent>
          <Image src={modalImage} />
        </ModalContent>
      </Modal>
    </>
  )
}

export default App
