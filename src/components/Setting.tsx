import { useTheme } from '@/context/theme'
import { useRouter } from '@/hooks/useRouter'
import { SearchParams } from '@/interfaces/image'
import {
  Avatar,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Slider,
  Switch,
} from '@nextui-org/react'
import { useLocation } from 'react-router-dom'
import Icon from './Icon'

interface Props {
  params: SearchParams
}

export default function Setting(props: Props): React.ReactElement {
  const { params } = props
  const { theme, setTheme } = useTheme()
  const { pathname } = useLocation()
  const { push } = useRouter()

  return (
    <Popover
      placement="top"
      offset={24}
      portalContainer={document.getElementById('navbar-container')!}
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
        <div className="pt-2 text-small font-bold text-red-500">
          预览图暂时加载不出来
        </div>
        <Slider
          label="每页数量"
          size="sm"
          step={12}
          maxValue={36}
          minValue={12}
          defaultValue={params.limit}
          onChangeEnd={(value) =>
            push(pathname, { ...params, limit: value as number })
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
  )
}
