interface Props {
  name: string
  className?: string
  [key: string]: unknown
}

export default function Icon(props: Props): React.ReactElement {
  const { name, className, ...res } = props
  const classes = ['material-symbols-rounded', className].join(' ')
  return (
    <span className={classes} {...res}>
      {name}
    </span>
  )
}
