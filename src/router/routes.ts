import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomePage.vue'),
    meta: {
      title: 'Главная',
      description:
        'Ритуальные услуги в Шушенском. Полный комплекс услуг с заботой и вниманием к каждой семье.',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundPage.vue'), // Changed from '@/views/NotFoundPage.vue'
    meta: {
      title: 'Страница не найдена',
    },
  },
]

export default routes
