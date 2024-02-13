export interface YandeImage {
  id: number
  tags: string
  source: string
  sample_url: string
  sample_width: number
  sample_height: number
  jpeg_url: string
  jpeg_file_size: number
  file_url: string
  width: number
  height: number
  file_size: number
  file_ext: string
}

export interface Tag {
  id: number
  name: string
  count: number
  type: number // 0: General, 1: Artist, 3: Copyright, 4: Character, 5: Circle
}

export interface SearchParams {
  tags: string[]
  page: number
  limit: number
}
