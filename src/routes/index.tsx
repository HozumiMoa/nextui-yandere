import App from '@/App'
import { getYandereImageList } from '@/api/imageApi'
import { YandeImage } from '@/interfaces/image'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      loader: async ({ request }) => {
        const url = new URL(request.url)
        const searchParams = new URLSearchParams(url.search)
        const params = {
          tags: searchParams.get('tags') || 'ksk_(semicha_keisuke)',
          limit: Number(searchParams.get('limit')) || 12,
          page: Number(searchParams.get('page')) || 1,
        }
        const list: YandeImage[] = await getYandereImageList(params)
        return { list, params }
      },
    },
  ],
  {
    basename: '/nextui-yandere/',
  }
)
