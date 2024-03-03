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
        const { searchParams } = new URL(request.url)
        const params = {
          tags: searchParams.get('tags') || 'ksk_(semicha_keisuke)',
          limit: Number(searchParams.get('limit')) || 12,
          page: Number(searchParams.get('page')) || 1,
        }
        let list = [] as YandeImage[]
        try {
          list = await getYandereImageList(params)
        } catch (error) {
          console.error(error)
        }
        return { list, params }
      },
    },
  ],
  {
    basename: '/nextui-yandere/',
  }
)
