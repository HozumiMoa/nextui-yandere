import { useState, useEffect } from 'react'
import { Button, ButtonGroup, Input, useDisclosure } from '@nextui-org/react'
import type { YandeImage } from './interfaces/image'
import ImageCardList from './components/ImageCardList'
import ModalImage from './components/ModalImage'
import AutoCompleteC from './components/AutoCompleteC'
import './App.css'

function App() {
  const [inputValue, setInputValue] = useState<string>('ksk_(semicha_keisuke)') // 搜索框的值
  const [page, setPage] = useState<number>(1) // 当前页数
  const [imageList, setImageList] = useState<YandeImage[]>([]) // 图片列表
  const { isOpen, onOpen, onOpenChange } = useDisclosure() // 模态框状态 与 打开/关闭 模态框的方法
  const [modalImage, setModalImage] = useState<string>('')
  const [modalSize, setModalSize] = useState({ height: 0, width: 0 })

  // 获取图片列表
  const fetchImageList = async (inputValue: string, page: number = 1) => {
    const res = await fetch(
      `https://yande.re/post.json?limit=12&tags=${inputValue}&page=${page}`
    )
    const data = await res.json()
    setImageList(data)
  }

  // 组件挂载时获取图片列表
  useEffect(() => {
    fetchImageList(inputValue)
  }, [])

  const handleSubmit = () => {
    setPage(1)
    fetchImageList(inputValue)
  }

  const pageUp = () => {
    if (page === 1) return
    const newPage = page - 1
    setPage(newPage)
    fetchImageList(inputValue, newPage)
  }

  const pageDown = () => {
    const newPage = page + 1
    setPage(newPage)
    fetchImageList(inputValue, newPage)
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
        <AutoCompleteC
          value={inputValue}
          onValueChange={setInputValue}
          onKeyUpEnter={handleSubmit}
        />
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
          {/* <Button size="lg" variant="flat">
            {page}
          </Button> */}
          <Input
            variant="bordered"
            size="sm"
            radius="none"
            value={String(page)}
            onValueChange={value => {
              if (isNaN(Number(value))) return
              setPage(Number(value))
            }}
            onKeyUp={e => {
              if (e.key === 'Enter') {
                fetchImageList(inputValue, page)
              }
            }}
            classNames={{
              base: 'max-w-16',
              input: 'text-center text-medium',
              inputWrapper:
                'shadow-none border-none bg-default/40 hover:opacity-hover',
            }}
          ></Input>
          <Button size="lg" variant="flat" onClick={pageDown}>
            Next
            <span className="material-symbols-rounded">chevron_right</span>
          </Button>
        </ButtonGroup>
      </nav>

      <ImageCardList imageList={imageList} handleModalOpen={handleModalOpen} />

      <ModalImage
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        src={modalImage}
        style={{ maxWidth: modalSize.width, height: modalSize.height }}
      />
    </>
  )
}

export default App
