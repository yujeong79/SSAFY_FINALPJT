<template>
    <div>
        <p>{{ props.day }} 일차 메시지</p>

        <!-- 로딩 중 상태 -->
        <div v-if="isLoading">
            <p>로딩 중...</p>
        </div>

        <!-- 메시지가 없는 경우 등록 버튼 표시 -->
         <!-- 해당 날짜 이전이면 등록 -->
        <div v-else-if="store.messages[props.day] === null && userStore.loginUser !== null">
            <button
                v-if="userStore.loginUser.email !== route.params.email"
                @click="modalOpen"
            >
                등록
            </button>
            <div class="modal-wrap" v-show="modalCheck">
            <div class="modal-container">
                    <MessageRegist :day="props.day"/>
                <div class="modal-btn">
                    <button @click="modalClose">닫기</button>
                </div>
            </div>
            </div>
        </div>

        <!-- 등록 버튼을 눌렀을 때 로그인하지 않은 경우 -->
        <div v-else-if="store.messages[props.day] === null && userStore.loginUser === null">
            <button @click="modalOpen">등록</button>

            <div class="modal-wrap" v-show="modalCheck">
            <div class="modal-container">
                    <TheLogin/>
                <div class="modal-btn">
                    <button @click="modalClose">닫기</button>
                </div>
            </div>
            </div>
        </div>

        <!-- 해당 날짜가 되어도 메시지가 없는 경우 랜덤 메시지 가져오기 => 백엔드에서 구현해야할듯 -->
        
        <div v-else-if="store.messages[props.day]"> <!-- 메시지가 있는 경우 메시지 내용 표시 -->
            <img v-if="stickerUrl" :src="stickerUrl">
            <p>보낸 사람: {{ store.messages[props.day].senderNickname }}</p>
            <div v-if="userStore.loginUser !== null">
                <button 
                    v-if="canViewMessage && (userStore.loginUser.email === route.params.email || userStore.loginUser.email === store.messages[props.day].sender)"
                    @click="modalOpen"
                    >조회</button>
            </div>

            <div class="modal-wrap" v-show="modalCheck">
            <div class="modal-container">
                    <MessageDetail :message="store.messages[props.day]"/>
                <div class="modal-btn">
                    <button @click="modalClose">닫기</button>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useMessageStore } from '@/stores/message';
import { useUserStore } from '@/stores/user';
import { useGoalStore } from '@/stores/goal';
import { useRoute, useRouter } from 'vue-router';

import MessageDetail from './MessageDetail.vue';
import MessageRegist from './MessageRegist.vue';
import TheLogin from '../common/TheLogin.vue';

const props = defineProps({
    day: Number, // 부모 컴포넌트에서 전달받는 필수 day 값
});

const isLoading = ref(true); // 로딩 상태
const store = useMessageStore(); // Pinia 스토어: 메시지 관리
const userStore = useUserStore(); // Pinia 스토어: 사용자 관리
const goalStore = useGoalStore();
const route = useRoute();
const router = useRouter();

// 메시지 로드 함수
const loadMessage = async () => {
    isLoading.value = true; // 로딩 상태 활성화
    try {
        await store.getMessage(route.params.email, props.day);
    } catch (error) {
        console.error(`Failed to load message for day ${props.day}:`, error);
    } finally {
        isLoading.value = false; // 로딩 상태 비활성화
    }
};

// 컴포넌트 마운트 시 메시지 로드
loadMessage();

// `store.messages`의 특정 day가 변경되었을 때 반응형으로 UI 갱신
watch(
    () => store.messages[props.day],
    (newValue) => {
        if (newValue) {
            console.log(`Day ${props.day} message updated:`, newValue);
        }
    }
);

const modalCheck = ref(false);

const modalOpen = function() {
    modalCheck.value = !modalCheck.value;
    // router.push({name: 'messageDetail', params:{receiver: route.params.email, day: props.day}});
};

const modalClose = function() {
    modalCheck.value = !modalCheck.value;
}

const canViewMessage = computed(() => {
    const today = new Date();
    const startDate = new Date(goalStore.goal.startDate); // goal.startDate를 Date 객체로 변환
    startDate.setDate(startDate.getDate() + props.day); // 목표 시작일에 props.day를 더한 날짜
    return today >= startDate; // 현재 날짜가 열람 가능 날짜 이후인지 확인
});

const stickerUrl = computed(() => {
  if (store.messages[props.day]?.stickerId) {
    return new URL(`/src/assets/sticker/sticker${store.messages[props.day].stickerId}.png`, import.meta.url).href;
  }
  return null; // 이미지가 없을 경우
});


</script>

<style scoped>
/* dimmed */
.modal-wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}
/* modal or popup */
.modal-container {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 550px;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
}
</style>
