import { useRouter } from '@/hooks/useRouter'
import { SearchParams, YandeImage } from '@/interfaces/image'
import { Button, Input } from '@nextui-org/react'
import { useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import Icon from './Icon'
import MyAutoComplete from './MyAutoComplete'

interface Props {
  params: SearchParams
  list: YandeImage[]
}

export default function SearchForm(props: Props): React.ReactElement {
  const { params, list } = props
  const { pathname } = useLocation()
  const { push } = useRouter()

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const newTags = formData.get('tags') as string
      const newPage = Number(formData.get('page'))
      const newParams: SearchParams = {
        tags: params.page === newPage ? newTags : params.tags,
        limit: params.limit,
        page: params.page === newPage ? 1 : newPage,
      }
      push(pathname, newParams)
    },
    [params, push, pathname]
  )

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <MyAutoComplete name="tags" defaultValue={params.tags} />
      <button type="submit" className="hidden"></button>
      <Button
        size="lg"
        variant="flat"
        isIconOnly
        className="rounded-full transition-transform hover:-translate-y-1"
        onPress={() => push(pathname, { ...params, page: params.page - 1 })}
        isDisabled={params.page === 1}
      >
        <Icon name="chevron_left" />
      </Button>
      <Input
        variant="bordered"
        size="sm"
        radius="none"
        name="page"
        defaultValue={params.page as unknown as string}
        classNames={{
          base: 'w-12',
          input: 'text-center text-small',
          inputWrapper: 'rounded-full',
        }}
      />
      <Button
        size="lg"
        variant="flat"
        isIconOnly
        className="rounded-full transition-transform hover:-translate-y-1"
        onPress={() => push(pathname, { ...params, page: params.page + 1 })}
        isDisabled={list.length < params.limit}
      >
        <Icon name="chevron_right" />
      </Button>
    </form>
  )
}
