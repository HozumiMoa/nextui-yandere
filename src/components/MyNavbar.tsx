import { useTheme } from '@/context/theme'
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
  Switch,
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
  const { theme, setTheme } = useTheme()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newParams: SearchParams = {
      tags: formData.get('tags') as string,
      limit: params.limit,
      page: 1,
    }
    setParams(newParams)
  }

  return (
    <nav
      id="my-navbar"
      className="fixed bottom-0 left-[50%] z-50 flex max-h-20 min-w-full -translate-x-1/2
      items-center gap-4 rounded-xl bg-background/70 p-4 shadow-md
      backdrop-blur-md backdrop-saturate-150 sm:bottom-4 sm:min-w-max"
    >
      <Popover
        placement="top"
        offset={24}
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
        <PopoverContent className="flex w-40 flex-col gap-4">
          <div className="pt-2 text-small font-bold text-pink-400">
            施工中...
          </div>
          <Slider
            label="每页数量"
            size="sm"
            step={12}
            maxValue={36}
            minValue={12}
            defaultValue={params.limit}
            onChangeEnd={(value) =>
              setParams({ ...params, limit: value as number })
            }
          />
          <Switch
            isSelected={theme === 'dark'}
            onValueChange={(value) => {
              value ? setTheme('dark') : setTheme('light')
            }}
            size="sm"
            className="min-w-full justify-between"
            startContent={<Icon name="light_mode" />}
            endContent={<Icon name="dark_mode" />}
          >
            Dark mode
          </Switch>
        </PopoverContent>
      </Popover>
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex flex-nowrap gap-4"
      >
        <MyAutoComplete name="tags" defaultValue={params.tags} />
        <button type="submit" className="hidden"></button>
      </form>
      <ButtonGroup>
        <Button
          size="lg"
          variant="flat"
          onPress={() => setParams({ ...params, page: params.page - 1 })}
          isDisabled={params.page === 1}
        >
          <Icon name="chevron_left" />
          <span className="hidden sm:inline">Prev</span>
        </Button>
        <Input
          variant="bordered"
          size="sm"
          radius="none"
          name="page"
          value={params.page as unknown as string}
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
          <span className="hidden sm:inline">Next</span>
          <Icon name="chevron_right" />
        </Button>
      </ButtonGroup>
    </nav>
  )
}
