import { Tag } from '@/interfaces/image'
import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import { useState } from 'react'
import Icon from './Icon'

export default function MyAutoComplete2(): React.ReactElement {
  const [valueArray, setValueArray] = useState<string[]>([])
  const [tagList, setTagList] = useState<Tag[]>([])
  const valueString = valueArray.join(' ')
  console.log('valueArray: ', valueArray)

  const handleInputChange = async (value: string) => {
    const newValueArray = value.replace(/\s+/g, ' ').split(' ')
    setValueArray(newValueArray)

    const lastTag = newValueArray.at(-1)
    if (!lastTag) return setTagList([])
    const res = await fetch(
      `https://yande.re/tag.json?limit=10&name=${lastTag}`
    )
    const data: Tag[] = await res.json()
    setTagList(data)
  }

  const handleSelectionChange = (key: React.Key) => {
    setValueArray([...valueArray.slice(0, -1), key as string])
  }

  const autoCompleteItem = (tag: Tag) => {
    const map = new Map([
      [1, 'text-warning'], // Artist
      [3, 'text-secondary'], // Copyright
      [4, 'text-success'], // Character
      [5, 'text-primary'], // Circle
    ])
    const color = map.get(tag.type) || ''
    return (
      <AutocompleteItem
        key={tag.name}
        textValue={tag.name}
        endContent={
          <span className="text-small text-primary">{tag.count}</span>
        }
      >
        <span className={color}>{tag.name}</span>
      </AutocompleteItem>
    )
  }

  return (
    <Autocomplete
      aria-label="tags"
      allowsCustomValue
      placeholder="Type to search..."
      size="sm"
      variant="bordered"
      className="max-w-xs"
      inputValue={valueString}
      items={tagList}
      onInputChange={handleInputChange}
      onSelectionChange={handleSelectionChange}
      startContent={<Icon name="search" className="select-none" />}
      popoverProps={{
        placement: 'top',
        portalContainer: document.querySelector('nav')!,
      }}
      listboxProps={
        {
          // onAction: handleSelectionChange,
        }
      }
    >
      {autoCompleteItem}
    </Autocomplete>
  )
}
