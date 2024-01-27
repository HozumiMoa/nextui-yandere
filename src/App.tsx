import { Button, ButtonGroup, Input, useDisclosure } from '@nextui-org/react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'
import Icon from './components/Icon'
import ImageCard from './components/ImageCard'
import ImageCardListWrapper from './components/ImageCardListWrapper'
import ModalImage from './components/ModalImage'
import MyAutoComplete from './components/MyAutoComplete'
import MyNavbar from './components/MyNavbar'
import type { SearchParams, YandeImage } from './interfaces/image'

const initialParams: SearchParams = {
  tags: ['ksk_(semicha_keisuke)'],
  limit: 12,
  page: 1,
}

function App() {
  const [params, setParams] = useState(initialParams) // 搜索参数
  const [imageList, setImageList] = useState<YandeImage[]>([]) // 图片列表
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure() // 模态框状态 与 打开/关闭 模态框的方法
  const [activeImageId, setActiveImageId] = useState(0) // 当前选中的图片id
  const activeImage = useMemo(
    () => imageList.find((image) => image.id === activeImageId),
    [imageList, activeImageId]
  ) // 当前选中的图片

  // 获取图片列表
  const fetchImageList = async (params: SearchParams = initialParams) => {
    const obj = { ...params, tags: params.tags.join(' ') }
    const res = await fetch(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      `https://yande.re/post.json?` + new URLSearchParams(obj as any)
    )
    const data: YandeImage[] = await res.json()
    setImageList(data)
    return data
  }

  // 组件挂载时获取图片列表
  useEffect(() => {
    fetchImageList()
  }, [])

  const handleSubmit = useCallback(() => {
    const newParams = { ...params, page: 1 }
    setParams(newParams)
    fetchImageList(newParams)
  }, [params])

  const pageUp = useCallback(() => {
    if (params.page === 1) return
    const newParams = { ...params, page: params.page - 1 }
    setParams(newParams)
    fetchImageList(newParams)
  }, [params])

  const pageDown = useCallback(() => {
    const newParams = { ...params, page: params.page + 1 }
    setParams(newParams)
    fetchImageList(newParams)
  }, [params])

  // 点击图片时打开模态框
  const handleModalOpen = useCallback(
    (id: number) => {
      setActiveImageId(id)
      onOpen()
    },
    [onOpen]
  )

  // 模态框内点击上一张或下一张图片
  const handleModalPageChange = useCallback(
    (action: 'prev' | 'next') => {
      switch (action) {
        case 'prev': {
          // 首先获取当前图片的索引
          const index = imageList.findIndex(
            (image) => image.id === activeImageId
          )
          // 如果当前图片已经是第一张图片，检查是否还有上一页
          if (index === 0) {
            if (params.page === 1) return
            const newParams = { ...params, page: params.page - 1 }
            setParams(newParams)
            fetchImageList(newParams).then((data) => {
              const newActiveImageId = data[data.length - 1].id
              setActiveImageId(newActiveImageId)
            })
          }
          // 如果当前图片不是第一张图片，直接切换到上一张图片
          else {
            const newActiveImageId = imageList[index - 1].id
            setActiveImageId(newActiveImageId)
          }
          break
        }
        case 'next': {
          const index = imageList.findIndex(
            (image) => image.id === activeImageId
          )
          if (index === imageList.length - 1) {
            const newParams = { ...params, page: params.page + 1 }
            setParams(newParams)
            fetchImageList(newParams).then((data) => {
              if (data.length === 0) return onClose()
              const newActiveImageId = data[0].id
              setActiveImageId(newActiveImageId)
            })
          } else {
            const newActiveImageId = imageList[index + 1].id
            setActiveImageId(newActiveImageId)
          }
          break
        }
      }
    },
    [activeImageId, imageList, onClose, params]
  )

  const setTags = useCallback(
    (tags: string[]) => {
      const newParams = { ...params, tags }
      setParams(newParams)
    },
    [params]
  )

  return (
    <>
      <MyNavbar>
        <MyAutoComplete
          value={params.tags}
          onValueChange={setTags}
          onKeyUpEnter={handleSubmit}
        />
        <ButtonGroup>
          <Button
            size="lg"
            variant="flat"
            onPress={pageUp}
            isDisabled={params.page === 1}
          >
            <Icon name="chevron_left" />
            Prev
          </Button>
          <Input
            variant="bordered"
            size="sm"
            radius="none"
            value={String(params.page)}
            onValueChange={(value) => {
              if (isNaN(Number(value))) return
              setParams({ ...params, page: Number(value) })
            }}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                handleSubmit()
              }
            }}
            classNames={{
              base: 'max-w-16',
              input: 'text-center text-medium',
              inputWrapper:
                'shadow-none border-none bg-default/40 hover:opacity-hover',
            }}
          ></Input>
          <Button
            size="lg"
            variant="flat"
            onPress={pageDown}
            isDisabled={imageList.length < params.limit}
          >
            Next
            <Icon name="chevron_right" />
          </Button>
        </ButtonGroup>
      </MyNavbar>

      <ImageCardListWrapper>
        {imageList.map((image) => (
          <ImageCard key={image.id} image={image} onPress={handleModalOpen} />
        ))}
      </ImageCardListWrapper>

      {activeImage && (
        <ModalImage
          isOpen={isOpen}
          image={activeImage}
          onOpenChange={onOpenChange}
          onModalPageChange={handleModalPageChange}
        />
      )}
    </>
  )
}

export default App
