import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

const REST_API_URL = `http://localhost:8080/api-video/video`;

export const useVideoStore = defineStore('video', () => {
  
  const msg = ref('');

  // 서버에서 전체 비디오 리스트 가져오기
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
      console.log("비디오 목록 조회 에러 발생")
    })
  }

  // 서버에서 비디오 하나 가져오기
  const video = ref({});
  const getVideoByVideoId = function(videoId) {
    axios({
      url: REST_API_URL + "/" + videoId,
      method: 'GET'
    })
    .then((response)=>{
      video.value = response.data
    })
    .catch(()=>{
      console.log("비디오 조회 에러 발생")
    })
  }

  // 서버에 비디오 등록
  const registVideo = function(video) {
    axios({
      url: REST_API_URL,
      method: 'POST',
      data: video
    })
    .then((response)=>{
      video.value = response.data
      router.push({name: 'videoDetail', params: {videoId: video.value.videoId}})
    })
    .catch(()=>{
      console.log("비디오 등록 에러 발생")
    })
  }

  // 비디오 수정
  const updateVideo = function() {
    axios({
      url: REST_API_URL,
      method: 'PUT',
      data: video.value
    })
    .then(()=>{
      router.push({name: 'videoDetail', params: {videoId: video.value.videoId}})
    })
    .catch(()=>{
      console.log("비디오 수정 에러 발생")
    })
  }

  // 서버에서 비디오 삭제
  const deleteVideo = function(videoId) {
    axios({
      url : REST_API_URL + "/" + videoId,
      method: 'DELETE'
    })
    .then(()=>{
      msg.value = '삭제'
      router.push({name: 'videoSuccess'})
    })
  }

  return {
    videoList,
    getVideoList,
    video,
    getVideoByVideoId,
    registVideo,
    deleteVideo,
    updateVideo,
    msg
  }
})
