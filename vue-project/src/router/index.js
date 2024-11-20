import { createRouter, createWebHistory } from 'vue-router'

import ChallengeView from '../views/ChallengeView.vue'

import SsafitView from '@/views/SsafitView.vue'
import YoutubeSearchResult from '@/components/youtube/YoutubeSearchResult.vue'
import YoutubeDetail from '@/components/youtube/YoutubeDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'ssafit',
      component: SsafitView,
    },
    {
      path: '/search/:keyword',
      name: 'searchResult',
      component: YoutubeSearchResult,
    },
    {
      path: '/detail',
      name: 'detail',
      component: YoutubeDetail
    },
    {
      path: '/challenge/:email',
      name: 'challenge',
      component: ChallengeView,
    }
  ],
})

export default router
