import { Input } from '@nextui-org/react'
import { useEffect, useState } from 'react'

interface Props {
  defaultValue: number
}

export default function Page({ defaultValue }: Props) {
  const [page, setPage] = useState(defaultValue.toString())
  useEffect(() => {
    setPage(defaultValue.toString())
  }, [defaultValue])

  return (
    <Input
      type="text"
      variant="bordered"
      radius="none"
      name="page"
      value={page}
      onValueChange={(value) => setPage(value)}
      classNames={{
        base: 'w-12 shrink-0',
        input: 'text-center text-small',
        inputWrapper: 'rounded-full h-12',
      }}
    />
  )
}
