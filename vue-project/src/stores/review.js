import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

const REST_API_URL = `http://localhost:8080/api-review/review`;

export const useReviewStore = defineStore('review', () => {
  const reviewList  = ref([]);
  const getReviewList = function(videoId) {
    axios({
      url: REST_API_URL + "/" + videoId,
      method: 'GET'
    })
    .then((response)=>{
      reviewList.value = response.data
    })
  }

  const modifyReview = function(reviewId) {

  }

  const removeReview = function(videoId, reviewId) {
    axios({
      url: REST_API_URL + "/delete/" + reviewId,
      method: 'DELETE'
    })
    .then(()=>{
      router.push({ name: "videoDetail", params: {videoId: videoId}})
    })
  }

  return {
    reviewList,
    getReviewList,
    modifyReview,
    removeReview
  }
})
