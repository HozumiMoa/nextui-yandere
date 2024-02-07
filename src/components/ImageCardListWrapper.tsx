export default function ImageCardListWrapper({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <div className="px-0 py-4 pb-28 sm:columns-2 sm:px-16 lg:columns-3 xl:columns-4">
      {children}
    </div>
  )
}
