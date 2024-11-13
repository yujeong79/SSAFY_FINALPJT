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
      method: 'GET',
    })
    .then((response)=>{
      reviewList.value = response.data
    })
  }

  return {
    reviewList,
    getReviewList,
  }
})
