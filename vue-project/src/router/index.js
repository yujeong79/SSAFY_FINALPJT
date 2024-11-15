import { createRouter, createWebHistory } from 'vue-router'
import VideoView from '../views/VideoView.vue'

import VideoList from '@/components/video/VideoList.vue'
import VideoDetail from '@/components/video/VideoDetail.vue'
import VideoRegist from '@/components/video/VideoRegist.vue'
import VideoSuccess from '@/components/video/VideoSuccess.vue'
import VideoRegistResult from '@/components/video/VideoRegistResult.vue'
import VideoUpdate from '@/components/video/VideoUpdate.vue'

import ChallengeView from '../views/ChallengeView.vue'

import LoginView from '@/views/LoginView.vue'

import TheSuccess from '@/components/common/TheSuccess.vue'

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
          path: "regist",
          name: "videoRegist",
          component: VideoRegist,
        },
        {
          path: "regist-result",
          name: "videoRegistResult",
          component: VideoRegistResult,
        },
        {
          path: "success",
          name: "videoSuccess",
          component: VideoSuccess,
        },
        {
          path: "detail/:videoId",
          name: "videoDetail",
          component: VideoDetail,
        },
        {
          path: "update",
          name: "videoUpdate",
          component: VideoUpdate,
        },
      ]
    },
    {
      path: '/challenge',
      name: 'challenge',
      component: ChallengeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/success',
      name: 'success',
      component: TheSuccess,
    },
  ],
})

export default router
