import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

const REST_API_URL = `http://localhost:8080/api-review/review`;

export const useReviewStore = defineStore('review', () => {
  // 해당 영상의 전체 리뷰 가져오기
  const reviewList  = ref([]);
  const getReviewList = function(videoId) {
    axios({
      url: REST_API_URL + "/review-list/" + videoId,
      method: 'GET'
    })
    .then((response)=>{
      reviewList.value = response.data
    })
  }

  // 리뷰 가져오기
  const review = ref({});
  const getReviewByReviewId = function(reviewId) {
    console.log(reviewId);
    axios({
      url: REST_API_URL + "/" + reviewId,
      method: 'GET'
    })
    .then((response)=>{
      console.log(response.data)
      review.value = response.data 
    })
    .catch(()=>{
      console.log("리뷰 조회 실패")
    })
  }

  // 리뷰 등록
  const registReview = function(videoId, review) {
    axios({
      url: REST_API_URL,
      method: 'POST',
      data: review
    })
    .then(()=>{
      getReviewList(videoId);
      router.push({name: 'detail'});
    })
    .catch(()=>{
      console.log("리뷰 등록 예외 발생")
    })
  };

  // 리뷰 수정
  const updateReview = function() {
    axios({
      url: REST_API_URL,
      method: 'PUT',
      data: review.value
    })
    .then(()=>{
      getReviewList(review.value.videoId)
      router.push({name: 'detail'});
    })
  }

  // 리뷰 삭제
  const removeReview = function(videoId, reviewId) {
    axios({
      url: REST_API_URL + "/" + reviewId,
      method: 'DELETE'
    })
    .then(()=>{
      getReviewList(videoId)
      router.push({name: 'detail'});
    })
  }

  // 리뷰 수 세기
  const reviewCount = computed(()=>{
    return reviewList.value.length;
  })

  return {
    review,
    getReviewByReviewId,
    reviewList,
    getReviewList,
    registReview,
    updateReview,
    removeReview,
    reviewCount,
  }
})
