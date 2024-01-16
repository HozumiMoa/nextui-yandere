export default function ImageCardListWrapper({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <div className="py-5 pb-28 grid gap-4 md:grid-cols-2 lg:px-20 xl:grid-cols-3 2xl:grid-cols-4">
      {children}
    </div>
  )
}
