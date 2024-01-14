import { useRef, useState } from 'react'
import { Input, Listbox, ListboxItem } from '@nextui-org/react'
import type { Tag } from '../interfaces/image'
import useDebounce from '.././hooks/useDebounce'

interface Props {
  value: string
  onValueChange: (value: string) => void
}

export default function AutoCompleteC(props: Props): React.ReactElement {
  const { value, onValueChange } = props
  const inputRef = useRef<HTMLInputElement>(null) // 搜索框的引用
  const listboxRef = useRef<HTMLDivElement>(null) // 自动补全的引用
  const [tagList, setTagList] = useState<Tag[]>([]) // 自动补全的列表
  const [isListboxOpen, setIsListboxOpen] = useState<boolean>(false) // 自动补全的开关

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
    const tags = value.split(' ')
    tags.pop()
    const newValue = [...tags, key].join(' ')
    onValueChange(newValue)
    setIsListboxOpen(false)
    inputRef.current?.focus()
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
      />
      <div
        className="absolute px-1 py-2 w-full
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
  )
}
