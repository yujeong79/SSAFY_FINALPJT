<template>

    <div class="review-regist-layout padding-all-element-inline-10">
        <div class="regist-input-box">
            <template v-if="!isInput">
                <div @click="scrollToInput">
                    <div class="regist-input-unclick-box"> 리뷰를 남겨 보세요. </div>
                </div>
            </template>
            <template v-else>
                <div class="font-charcol-color regist-input-nickname">{{ userStore.loginUser.nickname }}</div>
                <textarea id="content" v-model="review.content" rows="5" cols="30" maxlength="200"
                    class="regist-input-realbox" placeholder="리뷰를 남겨 보세요." @keyup.enter="registReview"></textarea>
                <div class="regist-input-sub-container">
                    <p class="regist-input-txt-size">{{ review.content.length }}/200</p>
                    <div>
                        <button @click="registReview" class="regist-input-btn">등록</button>
                        <button @click="cancelReview" class="regist-cancel-btn">취소</button>
                    </div>
                </div>
            </template>
        </div>
    </div>

</template>


<script setup>
import { ref, watch, nextTick } from 'vue';
import { useReviewStore } from '@/stores/review';
import { useUserStore } from '@/stores/user';

const store = useReviewStore();
const userStore = useUserStore();

const props = defineProps({
    videoId: String,
});

watch(() => props.videoId, (newVideoId) => {
    review.value.videoId = newVideoId;
});

const review = ref({
    email: userStore.loginUser.email,
    nickname: userStore.loginUser.nickname,
    videoId: props.videoId,
    content: '',
});

const registReview = function () {
    console.log(review.value);
    store.registReview(props.videoId, review.value);
    review.value.content = '';
};

const cancelReview = function () {
    isInput.value = false;
    console.log('isInput 값:', isInput.value);
}

const isInput = ref(false);

// 입력창 활성화 시 스크롤 최상단 이동 함수
const scrollToInput = function () {
    // isInput을 true로 변경해서 입력창이 나타나도록 함
    isInput.value = true;

    // DOM 업데이트 이후에 스크롤 실행
    nextTick(() => {
        const inputBox = document.getElementById('content');
        if (inputBox) {
            inputBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    console.log('isInput 값:', isInput.value);
};
</script>

<style scoped></style>