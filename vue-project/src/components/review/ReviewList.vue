<template>
    <hr class="thin-divider">
    <div>
        <p class="font-apple-semi-bold margin-botton-06">리뷰 {{ store.reviewCount }}</p>
        <div v-if="store.reviewCount > 0">
            <div>
                <div v-for="review in store.reviewList" :key="review.reviewId" class="review-block-container">
                    <!-- 닉네임이랑 수정 삭제버튼 -->
                    <div class="review-block-first">
                        <div class="review-block-first-nickname font-charcol-color">{{ review.nickname }}</div>
                        <div v-if="updateReviewId !== review.reviewId" class="review-block-first-btn">
                            <button v-if="userStore.loginUser && userStore.loginUser.email === review.email"
                                @click="updateMode(review.reviewId)">수정</button>
                            <button v-if="userStore.loginUser && userStore.loginUser.email === review.email" 
                                @click="removeReview(review.reviewId)">삭제</button>
                        </div>
                    </div>
                    <!-- 내용이랑 등록일 -->
                    <div v-if="updateReviewId !== review.reviewId" class="review-block-second"> 
                        <div class="review-block-second-content">{{ review.content }}</div>
                        <div class="review-block-second-date">{{ review.registDay }}</div>
                    </div>
                    <div v-if="updateReviewId === review.reviewId" class="regist-modify-box">
                        <input type="text" v-model="store.review.content" class="regist-modify-realbox">
                        <div class="review-modify-sub-container">
                            <button @click="updateReview" class="regist-modify-btn">저장</button>
                            <button @click="updateReviewId = ''" class="regist-cancel-btn">취소</button>
                        </div>    
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref, watch } from 'vue';
    import { useReviewStore } from '@/stores/review';
    import { useUserStore } from '@/stores/user';

    const store = useReviewStore();
    const userStore = useUserStore();

    const props = defineProps({
        videoId: String,
    });

    watch(()=>props.videoId, (newVideoId)=>{
        if(newVideoId) {
            store.getReviewList(newVideoId);
        }
    });

    onMounted(()=>{
        store.getReviewList(props.videoId);
    });

    const updateReviewId = ref('');
    const updateMode = function(reviewId) {
        updateReviewId.value = reviewId;
        store.getReviewByReviewId(reviewId);
    }

    const updateReview = function() {
        updateReviewId.value = '';
        store.updateReview();
    }

    const removeReview = function(reviewId) {
        store.removeReview(props.videoId, reviewId);
    }
   
</script>

<style scoped>

</style>