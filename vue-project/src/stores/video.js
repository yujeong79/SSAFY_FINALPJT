import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

const REST_API_URL = `http://localhost:8080/api-video/video`;

export const useVideoStore = defineStore('video', () => {
  const videoList = ref([]);
  const getVideoList = function() {
    axios({
      url: REST_API_URL,
      method: 'GET'
    })
    .then((response)=>{
      videoList.value = response.data
    })
    .catch(()=>{
      console.log("에러발생")
    })
  }

  const video = ref({});
  const getVideoByVideoId = function(videoId) {
    axios({
      url: REST_API_URL + "/" + videoId,
      method: 'GET'
    })
    .then((response)=>{
      video.value = response.data
    })
  }

  return {
    videoList,
    getVideoList,
    video,
    getVideoByVideoId,
  }
})
