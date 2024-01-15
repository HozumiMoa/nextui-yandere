import { useRef, useState } from 'react'
import { Input, Listbox, ListboxItem } from '@nextui-org/react'
import type { Tag } from '../interfaces/image'
import useDebounce from '.././hooks/useDebounce'

interface Props {
  /**
   * @description 搜索框的值
   */
  value: string
  /**
   * @description 搜索框的值改变时的回调
   * @param {string} value - 搜索框的值
   * @returns {void}
   */
  onValueChange: (value: string) => void
  /**
   * @description 按下回车键时的回调
   * @returns {void}
   */
  onKeyUpEnter: () => void
}

export default function AutoCompleteC(props: Props): React.ReactElement {
  const { value, onValueChange, onKeyUpEnter } = props
  const inputRef = useRef<HTMLInputElement>(null) // 搜索框的引用
  const listboxWrapperRef = useRef<HTMLDivElement>(null) // 自动补全的引用
  const [tagList, setTagList] = useState<Tag[]>([]) // 自动补全的列表
  const [isListboxOpen, setIsListboxOpen] = useState<boolean>(false) // 自动补全的开关

  // 获取自动补全的列表
  const fetchTagList = async (tag: string) => {
    const res = await fetch(`https://yande.re/tag.json?limit=10&name=${tag}`)
    const data = await res.json()
    setTagList(data)
    return data
  }

  // 搜索框输入时，自动补全的逻辑
  const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const lastTag = e.target.value.split(' ').pop()
    if (!lastTag) return setIsListboxOpen(false)
    const newTagList = await fetchTagList(lastTag) // 此处不能用 tagList，因为 tagList 是异步更新的，会导致下面的判断失效
    if (newTagList.length === 0) return setIsListboxOpen(false)
    if (newTagList.length === 1 && newTagList[0].name === lastTag)
      return setIsListboxOpen(false)
    setIsListboxOpen(true)
  }

  const debouncedHandleInput = useDebounce<React.ChangeEvent<HTMLInputElement>>(
    handleInput,
    200
  )

  // 选择自动补全的项时，更新搜索框的值
  const handleSelect = (key: React.Key) => {
    const tags = value.split(' ')
    tags.pop()
    const newValue = [...tags, key].join(' ')
    onValueChange(newValue)
    setIsListboxOpen(false)
    inputRef.current?.focus()
  }

  // 按下回车键时，关闭自动补全
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onKeyUpEnter()
      setIsListboxOpen(false)
    }
  }

  return (
    <div className="min-w-80 relative">
      <Input
        placeholder="Type to search..."
        size="sm"
        variant="bordered"
        isClearable
        startContent={<span className="material-symbols-rounded">search</span>}
        ref={inputRef}
        value={value}
        onValueChange={onValueChange}
        onInput={debouncedHandleInput}
        onKeyUp={handleKeyUp}
      />
      <div
        className="absolute px-1 py-2 w-full
                  border-small rounded-small border-default-200  
                  backdrop-saturate-150 backdrop-blur-md bg-background/90"
        ref={listboxWrapperRef}
        style={{
          transform: `translateY(calc(-100% - ${listboxWrapperRef.current?.previousElementSibling?.clientHeight}px))`,
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
          {tag => {
            const lastInputValue = value.split(' ').pop()
            return (
              <ListboxItem
                key={tag.name}
                textValue={tag.name}
                endContent={
                  <span className="text-primary text-small">{tag.count}</span>
                }
              >
                {lastInputValue ? (
                  <>
                    {tag.name.split(lastInputValue)[0]}
                    <span className="text-danger">{lastInputValue}</span>
                    {tag.name.split(lastInputValue)[1]}
                  </>
                ) : (
                  tag.name
                )}
              </ListboxItem>
            )
          }}
        </Listbox>
      </div>
    </div>
  )
}
