import { createRouter, createWebHistory } from 'vue-router'
import VideoView from '../views/VideoView.vue'
import ChallengeView from '../views/ChallengeView.vue'
import VideoList from '@/components/video/VideoList.vue'
import VideoDetail from '@/components/video/VideoDetail.vue'
import ReviewList from '@/components/video/ReviewList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'video',
      component: VideoView,
      children: [
        {
          path: "",
          name: "videoList",
          component: VideoList,
        },
        {
          path: "detail/:videoId",
          name: "videoDetail",
          component: VideoDetail,
        },
      ]
    },
    {
      path: '/challenge',
      name: 'challenge',
      component: ChallengeView,
    },
  ],
})

export default router
