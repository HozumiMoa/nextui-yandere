import { SearchParams, YandeImage } from '@/interfaces/image'
import {
  Avatar,
  Button,
  ButtonGroup,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Slider,
} from '@nextui-org/react'
import React from 'react'
import Icon from './Icon'
import MyAutoComplete from './MyAutoComplete'

interface Props {
  params: SearchParams
  setParams: React.Dispatch<React.SetStateAction<SearchParams>>
  list: YandeImage[]
}

export default function MyNavbar(props: Props): React.ReactElement {
  const { params, setParams, list } = props
  return (
    <nav
      id="my-navbar"
      className="fixed bottom-0 left-[50%] z-50 flex max-h-20 max-w-full -translate-x-1/2
      items-center justify-start gap-4 rounded-xl bg-background/70 p-4 shadow-md
      backdrop-blur-md backdrop-saturate-150 sm:bottom-4 sm:min-w-max"
    >
      <Popover
        placement="top-start"
        offset={16}
        portalContainer={document.getElementById('my-navbar')!}
      >
        <PopoverTrigger>
          <Avatar
            as="button"
            isBordered
            color="danger"
            src="https://yande.re/data/avatars/241578.jpg"
            className="flex-shrink-0"
          />
        </PopoverTrigger>
        <PopoverContent className="flex w-40 flex-col gap-2">
          <div className="py-2 text-small font-bold text-pink-400">
            施工中...
          </div>
          <Slider
            label="每页数量"
            size="sm"
            step={12}
            maxValue={48}
            minValue={12}
            defaultValue={params.limit}
            onChangeEnd={(value) =>
              setParams({ ...params, limit: value as number })
            }
          />
        </PopoverContent>
      </Popover>
      <MyAutoComplete
        defaultValue={params.tags}
        onKeyUpEnter={(tags) => setParams({ ...params, tags, page: 1 })}
      />
      <ButtonGroup>
        <Button
          size="lg"
          variant="flat"
          onPress={() => setParams({ ...params, page: params.page - 1 })}
          isDisabled={params.page === 1}
        >
          <Icon name="chevron_left" />
          Prev
        </Button>
        <Input
          variant="bordered"
          size="sm"
          radius="none"
          value={params.page as unknown as string}
          // onValueChange={(value) => {
          //   if (isNaN(Number(value))) return
          // }}
          // onKeyUp={(e) => {
          //   if (e.key === 'Enter') {
          //     setParams({ ...params, page: Number(e.currentTarget.value) })
          //   }
          // }}
          classNames={{
            base: 'max-w-16',
            input: 'text-center text-medium',
            inputWrapper:
              'shadow-none border-none bg-default/40 hover:opacity-hover',
          }}
        />
        <Button
          size="lg"
          variant="flat"
          onPress={() => setParams({ ...params, page: params.page + 1 })}
          isDisabled={list.length < params.limit}
        >
          Next
          <Icon name="chevron_right" />
        </Button>
      </ButtonGroup>
    </nav>
  )
}
