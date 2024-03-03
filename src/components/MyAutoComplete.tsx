import { getYandereTagList } from '@/api/imageApi'
import { Input, Listbox, ListboxItem } from '@nextui-org/react'
import { useEffect, useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import type { Tag } from '../interfaces/image'
import Icon from './Icon'

interface Props {
  name?: string
  /**
   * @description 搜索框的值
   */
  defaultValue: string
}

export default function MyAutoComplete(props: Props): React.ReactElement {
  const { defaultValue, name } = props
  const [inputValue, setInputValue] = useState<string>(defaultValue) // 搜索框的值
  const inputRef = useRef<HTMLInputElement>(null) // 搜索框的引用
  const listboxRef = useRef<HTMLElement>(null) // 自动补全的引用
  const [tagList, setTagList] = useState<Tag[]>([]) // 自动补全的列表
  const [isListboxOpen, setIsListboxOpen] = useState<boolean>(false) // 自动补全的开关

  useEffect(() => {
    setInputValue(defaultValue)
  }, [defaultValue])

  // 获取自动补全的列表
  const fetchTagList = async (tag: string) => {
    const data: Tag[] = await getYandereTagList(tag)
    return data
  }

  // 搜索框输入时，自动补全的逻辑
  const handleTagListChange = useDebouncedCallback(async (value: string) => {
    const lastTag = value.split(' ').at(-1)
    if (!lastTag) return setIsListboxOpen(false)
    const newTagList = await fetchTagList(lastTag)
    setTagList(newTagList)
    if (newTagList.length === 0) return setIsListboxOpen(false)
    if (newTagList.length === 1 && newTagList[0].name === lastTag)
      return setIsListboxOpen(false)
    setIsListboxOpen(true)
  }, 300)

  // 选择自动补全的项时，更新搜索框的值
  const handleSelect = (key: React.Key) => {
    const newValue = (inputValue.split(' ').slice(0, -1).join(' ') +
      key) as string
    setInputValue(newValue)
    setIsListboxOpen(false)
    inputRef.current?.focus()
  }

  // 搜索框的值改变时的逻辑
  const handleValueChange = (value: string) => {
    const newValue = value.replace(/\s+/g, ' ')
    setInputValue(newValue)

    handleTagListChange(newValue)
  }

  // 搜索框按下键盘时的逻辑
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.key === 'Enter') {
      setIsListboxOpen(false)
    }
    if (e.key === 'ArrowDown') {
      const option = listboxRef.current?.firstElementChild
        ?.firstElementChild as HTMLElement
      option.focus()
    }
    if (e.key === 'ArrowUp') {
      const option = listboxRef.current?.firstElementChild
        ?.lastElementChild as HTMLElement
      option.focus()
    }
    if (e.key === 'Escape') {
      setIsListboxOpen(false)
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
    const lastInputValue = inputValue.split(' ').at(-1)
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
    <div className="relative min-w-60 sm:min-w-80" onKeyUp={handleKeyUpEscape}>
      <Input
        placeholder="Type to search..."
        isClearable
        size="sm"
        variant="bordered"
        ref={inputRef}
        name={name}
        value={inputValue}
        onValueChange={handleValueChange}
        onKeyUp={handleKeyUp}
        startContent={
          <Icon name="search" className="pointer-events-none select-none" />
        }
      />
      <div
        className="absolute w-full -translate-y-[calc(100%+3.25em)] rounded-small border-small
                  border-default-200 bg-background/90 px-1 py-2 backdrop-blur-md backdrop-saturate-150"
        style={{
          display: isListboxOpen ? 'block' : 'none',
        }}
      >
        <Listbox
          ref={listboxRef}
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
