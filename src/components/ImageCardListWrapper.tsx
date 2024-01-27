export default function ImageCardListWrapper({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <div
      className="grid gap-4 px-0 py-4
      pb-28 sm:grid-cols-2 lg:px-16 xl:grid-cols-3 2xl:grid-cols-4"
    >
      {children}
    </div>
  )
}
