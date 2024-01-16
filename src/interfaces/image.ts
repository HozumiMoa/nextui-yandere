export interface YandeImage {
  id: number
  tags: string
  sample_url: string
  sample_width: number
  sample_height: number
}

export interface Tag {
  id: number
  name: string
  count: number
  type: number // 0: General, 1: Artist, 3: Copyright, 4: Character, 5: Circle
}
