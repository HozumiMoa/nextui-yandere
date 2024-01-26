export default function ImageCardListWrapper({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <div
      className="py-4 pb-28 px-16 grid gap-4
      md:grid-cols-2 md:px-0 lg:px-16 xl:grid-cols-3 2xl:grid-cols-4"
    >
      {children}
    </div>
  )
}
