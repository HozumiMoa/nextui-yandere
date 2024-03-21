import clsx from 'clsx'

interface Props {
  name: string
  className?: string
  [key: string]: unknown
}

export default function Icon(props: Props): React.ReactElement {
  const { name, className, ...res } = props
  return (
    <span
      className={clsx('material-symbols-rounded text-2xl', className)}
      {...res}
    >
      {name}
    </span>
  )
}
