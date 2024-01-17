import { useState, useEffect } from 'react'
import { Button, ButtonGroup, Input, useDisclosure } from '@nextui-org/react'
import type { YandeImage } from './interfaces/image'
import ImageCardListWrapper from './components/ImageCardListWrapper'
import ImageCard from './components/ImageCard'
import ModalImage from './components/ModalImage'
import MyAutoComplete from './components/MyAutoComplete'
import './App.css'

const initialTags = ['ksk_(semicha_keisuke)']

function App() {
  const [inputTags, setInputTags] = useState<string[]>(initialTags) // 搜索框的值
  const inputValue = inputTags.join(' ') // 搜索框的显示值
  const [page, setPage] = useState<number>(1) // 当前页数
  const [imageList, setImageList] = useState<YandeImage[]>([]) // 图片列表
  const { isOpen, onOpen, onOpenChange } = useDisclosure() // 模态框状态 与 打开/关闭 模态框的方法
  const [activeImageId, setActiveImageId] = useState<number>(0) // 当前选中的图片id
  const activeImage = imageList.find(image => image.id === activeImageId) // 当前选中的图片

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
    fetchImageList(initialTags.join(' '))
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
  const handleModalOpen = (id: number) => {
    setActiveImageId(id)
    onOpen()
  }

  return (
    <>
      <nav
        className="flex z-40 items-center justify-center gap-4
        fixed bottom-0 left-[50%] -translate-x-1/2 p-4 my-4 rounded-xl 
        backdrop-saturate-150 backdrop-blur-md bg-background/70"
      >
        <MyAutoComplete
          value={inputTags}
          onValueChange={setInputTags}
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

      <ImageCardListWrapper>
        {imageList.map(image => (
          <ImageCard key={image.id} image={image} onPress={handleModalOpen} />
        ))}
      </ImageCardListWrapper>

      <ModalImage
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        image={activeImage}
        key={activeImageId}
      />
    </>
  )
}

export default App
