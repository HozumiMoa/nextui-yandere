import { Input, Listbox, ListboxItem } from '@nextui-org/react'
import { useRef, useState } from 'react'
import useDebounce from '../hooks/useDebounce'
import type { Tag } from '../interfaces/image'
import Icon from './Icon'

interface Props {
  /**
   * @description 搜索框的值
   */
  value: string[]
  /**
   * @description 搜索框的值改变时的回调
   * @param {string[]} value - 搜索框的值
   * @returns {void}
   */
  onValueChange: (value: string[]) => void
  /**
   * @description 按下回车键时的回调
   * @returns {void}
   */
  onKeyUpEnter: () => void
}

export default function MyAutoComplete(props: Props): React.ReactElement {
  const { value, onValueChange, onKeyUpEnter } = props
  const inputValue = value.join(' ') // 搜索框的显示值
  const inputRef = useRef<HTMLInputElement>(null) // 搜索框的引用
  const listboxWrapperRef = useRef<HTMLDivElement>(null) // 自动补全的引用
  const [tagList, setTagList] = useState<Tag[]>([]) // 自动补全的列表
  const [isListboxOpen, setIsListboxOpen] = useState<boolean>(false) // 自动补全的开关

  // 获取自动补全的列表
  const fetchTagList = async (tag: string) => {
    const res = await fetch(`https://yande.re/tag.json?limit=10&name=${tag}`)
    const data: Tag[] = await res.json()
    return data
  }

  // 搜索框输入时，自动补全的逻辑
  const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const lastTag = e.target.value.split(' ').pop()
    if (!lastTag) return setIsListboxOpen(false)
    const newTagList = await fetchTagList(lastTag) // 此处不能用 tagList，因为 tagList 是异步更新的，会导致下面的判断失效
    setTagList(newTagList)
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
    onValueChange([...value.slice(0, -1), key as string])
    setIsListboxOpen(false)
    inputRef.current?.focus()
  }

  // 搜索框的值改变时的逻辑
  const handleValueChange = (value: string) => {
    onValueChange(value.split(' '))
  }

  // 搜索框按下键盘时的逻辑
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.key === 'Enter') {
      onKeyUpEnter()
      setIsListboxOpen(false)
    }
    if (e.key === 'ArrowDown') {
      const option = listboxWrapperRef.current?.querySelector('ul')
        ?.firstElementChild as HTMLElement
      option.focus()
    }
    if (e.key === 'ArrowUp') {
      const option = listboxWrapperRef.current?.querySelector('ul')
        ?.lastElementChild as HTMLElement
      option.focus()
    }
  }

  const handleKeyUpEscape = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsListboxOpen(false)
    }
  }

  const listBoxItem = (tag: Tag) => {
    // 根据 tag.type 显示不同的颜色
    const map = new Map([
      [1, 'text-warning'], // Artist
      [3, 'text-secondary'], // Copyright
      [4, 'text-success'], // Character
      [5, 'text-primary'], // Circle
    ])
    const color = map.get(tag.type) || ''
    const lastInputValue = value[value.length - 1]
    return (
      <ListboxItem
        key={tag.name}
        textValue={tag.name}
        endContent={
          <span className="text-small text-primary">{tag.count}</span>
        }
      >
        {lastInputValue ? (
          <span className={color}>
            {tag.name.split(lastInputValue)[0]}
            <strong>{lastInputValue}</strong>
            {tag.name.split(lastInputValue)[1]}
          </span>
        ) : (
          tag.name
        )}
      </ListboxItem>
    )
  }

  return (
    <div className="relative min-w-60" onKeyUp={handleKeyUpEscape}>
      <Input
        placeholder="Type to search..."
        size="sm"
        variant="bordered"
        ref={inputRef}
        value={inputValue}
        onValueChange={handleValueChange}
        onInput={debouncedHandleInput}
        onKeyUp={handleKeyUp}
        startContent={<Icon name="search" className="select-none" />}
      />
      <div
        className="absolute w-full rounded-small border-small
                  border-default-200 bg-background/90 px-1  
                  py-2 backdrop-blur-md backdrop-saturate-150"
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
          {listBoxItem}
        </Listbox>
      </div>
    </div>
  )
}
