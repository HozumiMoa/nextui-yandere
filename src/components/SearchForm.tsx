import { useRouter } from '@/hooks/useRouter'
import { SearchParams, YandeImage } from '@/interfaces/image'
import { Button, Input } from '@nextui-org/react'
import { useCallback, useEffect, useState } from 'react'
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

  const handleTagSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const newTags = formData.get('tags') as string
      const newParams: SearchParams = {
        tags: newTags,
        limit: params.limit,
        page: 1,
      }
      push(pathname, newParams)
    },
    [params.limit, pathname, push]
  )

  const handlePageSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const newPage = Number(formData.get('page'))
      const newParams: SearchParams = {
        tags: params.tags,
        limit: params.limit,
        page: newPage,
      }
      push(pathname, newParams)
    },
    [params.limit, params.tags, pathname, push]
  )

  const [page, setPage] = useState(params.page)
  useEffect(() => {
    setPage(params.page)
  }, [params.page])

  return (
    <>
      <form onSubmit={handleTagSubmit}>
        <MyAutoComplete name="tags" defaultValue={params.tags} />
        <button type="submit" className="hidden"></button>
      </form>
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
      <form onSubmit={handlePageSubmit}>
        <Input
          variant="bordered"
          size="sm"
          radius="none"
          name="page"
          value={page as unknown as string}
          onValueChange={(value) => setPage(Number(value))}
          classNames={{
            base: 'w-12 shrink-0',
            input: 'text-center text-small',
            inputWrapper: 'rounded-full',
          }}
        />
      </form>
      <button type="submit" className="hidden"></button>
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
    </>
  )
}
