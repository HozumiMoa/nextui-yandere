import { useRef, useState, useEffect } from 'react'
import {
  Input,
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
  Listbox,
  ListboxItem,
} from '@nextui-org/react'
import useDebounce from './hooks/useDebounce'
import './App.css'

interface YandeImage {
  id: number
  tags: string
  sample_url: string
  sample_width: number
  sample_height: number
}

interface Tag {
  id: number
  name: string
  count: number
  type: number
}

function App() {
  const [inputValue, setInputValue] = useState<string>('ksk_(semicha_keisuke)') // 搜索框的值
  const [page, setPage] = useState<number>(1) // 当前页数
  const inputRef = useRef<HTMLInputElement>(null) // 搜索框的引用
  const listboxRef = useRef<HTMLDivElement>(null) // 自动补全的引用
  const [isListboxOpen, setIsListboxOpen] = useState<boolean>(false) // 自动补全的开关
  const [imageList, setImageList] = useState<YandeImage[]>([]) // 图片列表
  const [tagList, setTagList] = useState<Tag[]>([]) // 自动补全的列表
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [modalImage, setModalImage] = useState<string>('')
  const [modalSize, setModalSize] = useState({ height: 0, width: 0 })

  const fetchImageList = async () => {
    const res = await fetch(
      `https://yande.re/post.json?limit=12&page=${page}&tags=${inputValue}`
    )
    const data = await res.json()
    setImageList(data)
  }

  useEffect(() => {
    fetchImageList()
  }, [page])

  const handleSubmit = () => {
    setPage(1)
    fetchImageList()
  }

  const pageUp = () => {
    if (page === 1) return
    setPage(page => page - 1)
  }

  const pageDown = () => {
    setPage(page => page + 1)
  }

  const fetchTagList = async (tag: string) => {
    const res = await fetch(`https://yande.re/tag.json?limit=10&name=${tag}`)
    const data = await res.json()
    setTagList(data)
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lastTag = e.target.value.split(' ').pop()
    if (!lastTag) return setIsListboxOpen(false)
    fetchTagList(lastTag).then(() => {
      if (tagList.length === 0) return setIsListboxOpen(false)
      if (tagList.length === 1 && tagList[0].name === lastTag)
        return setIsListboxOpen(false)
      setIsListboxOpen(true)
    })
  }

  const debouncedHandleInput = useDebounce<React.ChangeEvent<HTMLInputElement>>(
    handleInput,
    500
  )

  const handleSelect = (key: React.Key) => {
    const tags = inputValue.split(' ')
    tags.pop()
    const value = [...tags, key].join(' ')
    setInputValue(value)
    setIsListboxOpen(false)
    inputRef.current?.focus()
  }

  // 点击图片时打开模态框
  const handleModalOpen = (item: YandeImage) => {
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
      <nav
        className="flex z-40 items-center justify-center gap-4
        fixed bottom-0 left-[50%] -translate-x-1/2 p-4 my-4 rounded-xl 
        backdrop-saturate-150 backdrop-blur-md bg-background/70"
      >
        <div>
          <Input
            className="min-w-80"
            placeholder="Type to search..."
            size="sm"
            variant="bordered"
            isClearable
            startContent={
              <span className="material-symbols-rounded">search</span>
            }
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onInput={debouncedHandleInput}
          />
          <div
            className="absolute px-1 py-2 min-w-80
            border-small rounded-small border-default-200  
            backdrop-saturate-150 backdrop-blur-md bg-background/90"
            ref={listboxRef}
            style={{
              transform: `translateY(calc(-100% - ${listboxRef.current?.previousElementSibling?.clientHeight}px))`,
              display: isListboxOpen ? 'block' : 'none',
            }}
          >
            <Listbox
              items={tagList}
              variant="flat"
              color="primary"
              aria-label="Tags"
              onAction={handleSelect}
            >
              {tag => <ListboxItem key={tag.name}>{tag.name}</ListboxItem>}
            </Listbox>
          </div>
        </div>
        <ButtonGroup>
          <Button size="lg" variant="flat" onClick={handleSubmit}>
            Submit
          </Button>
          <Button
            size="lg"
            variant="flat"
            onClick={pageUp}
            isDisabled={page === 1}
          >
            <span className="material-symbols-rounded">chevron_left</span>
            Prev
          </Button>
          <Button size="lg" variant="flat">
            {page}
          </Button>
          <Button size="lg" variant="flat" onClick={pageDown}>
            Next
            <span className="material-symbols-rounded">chevron_right</span>
          </Button>
        </ButtonGroup>
      </nav>

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
                <PopoverContent className="flex-row flex-wrap gap-1 max-w-[300px] bg-transparent shadow-none">
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
