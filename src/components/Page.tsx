import { Input } from '@nextui-org/react'
import { useEffect, useState } from 'react'

interface Props {
  defaultValue: number
}

export default function Page({ defaultValue }: Props) {
  const [page, setPage] = useState(defaultValue)
  useEffect(() => {
    setPage(defaultValue)
  }, [defaultValue])

  return (
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
  )
}
