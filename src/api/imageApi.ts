import { SearchParams } from '@/interfaces/image'

export const getYandereImageList = async (params: SearchParams) => {
  const res = await fetch(
    `https://yande.re/post.json?` +
      new URLSearchParams(params as unknown as URLSearchParams)
  )
  return await res.json()
}

export const getYandereTagList = async (tag: string) => {
  const res = await fetch(`https://yande.re/tag.json?limit=10&name=${tag}`)
  return await res.json()
}
