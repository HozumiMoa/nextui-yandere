import { useDisclosure } from '@nextui-org/react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLoaderData, useLocation } from 'react-router-dom'
import ImageCardList from './components/ImageCardList'
import ModalImage from './components/ModalImage'
import MyNavbar from './components/MyNavbar'
import { useRouter } from './hooks/useRouter'
import type { SearchParams, YandeImage } from './interfaces/image'

function App() {
  const { list: imageList, params } = useLoaderData() as {
    list: YandeImage[]
    params: SearchParams
  }
  const { pathname } = useLocation()
  const { push } = useRouter()
  const { isOpen, onOpen, onOpenChange } = useDisclosure() // 模态框状态 与 打开/关闭 模态框的方法
  const [activeImageId, setActiveImageId] = useState(0) // 当前选中的图片id
  const activeImage = useMemo(
    () => imageList.find((image) => image.id === activeImageId),
    [imageList, activeImageId]
  ) // 当前选中的图片
  const direction = useRef<'prev' | 'next'>('prev') // 模态框内点击上一张或下一张图片的方向

  useEffect(() => {
    scrollTo({ top: 0 })
  }, [params.page, params.tags])

  // 获取图片列表后，根据模态框内点击上一张或下一张图片的方向，更新当前选中的图片
  useEffect(() => {
    if (!imageList.length) return
    switch (direction.current) {
      case 'prev': {
        setActiveImageId(imageList[imageList.length - 1].id)
        break
      }
      case 'next': {
        setActiveImageId(imageList[0].id)
        break
      }
    }
  }, [imageList])

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
            push(pathname, { ...params, page: params.page - 1 })
            direction.current = 'prev'
          }
          // 如果当前图片不是第一张图片，直接切换到上一张图片
          else {
            setActiveImageId(imageList[index - 1].id)
          }
          break
        }
        case 'next': {
          const index = imageList.findIndex(
            (image) => image.id === activeImageId
          )
          if (index === imageList.length - 1) {
            push(pathname, { ...params, page: params.page + 1 })
            direction.current = 'next'
          } else {
            setActiveImageId(imageList[index + 1].id)
          }
          break
        }
      }
    },
    [activeImageId, imageList, params, pathname, push]
  )

  return (
    <>
      <MyNavbar params={params} list={imageList} />
      <ImageCardList list={imageList} handleModalOpen={handleModalOpen} />
      {/* {activeImage && (
        <ModalImage
          isOpen={isOpen}
          image={activeImage}
          onOpenChange={onOpenChange}
          onModalPageChange={handleModalPageChange}
        />
      )} */}
    </>
  )
}

export default App
