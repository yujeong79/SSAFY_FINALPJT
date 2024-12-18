<template>
    <div>
        <!-- <p>{{ currDate }}({{ props.day+1 }}일차) 메시지</p> -->

        <!-- 메시지가 없는 경우 뒤에 배경 표시 -->
        <div v-if="store.messages[props.day] === null && userStore.loginUser !== null" class="message-click-container" > 
            <!-- class="message-none-circle" -->
            <!-- 안에서 작게 모달이 뜸 -->
            <div class="message-none-circle">
                <!-- 로그인을 한 경우 등록버튼 표시 -->
                <div v-if="userStore.loginUser !== null">
                    <!-- 등록버튼 -->
                    <div class="message-out-regist-btn">
                        <button v-if="userStore.loginUser.email !== route.params.email" @click="modalToggle" class="message-out-regist-btn">+</button>
                    </div>
                </div>    
            </div>

            <div class="modal-wrap" v-show="modalCheck">
                    <div class="modal-container">
                            <MessageRegist :day="props.day" @open-confirm-modal="openConfirmModal"/>
                        <div class="modal-btn">
                            <button @click="modalToggle" class="modal-close-btn">X</button>
                        </div>
                    </div>
                    </div>
                
                    <!-- 메시지 등록 시 확인 모달 -->
                    <div class="modal-wrap" v-show="registModal">
                    <div class="modal-container">
                        <div class="modal-background">
                            <p class="modal-alarm">메시지 업로드 시 수정 및 삭제가 불가능합니다.</p>
                            <p class="modal-alarm">등록하시겠습니까?</p>
                            <p class="modal-alarm" v-if="store.errorMessage" style="color: red;">{{ store.errorMessage }} 취소하고 재등록해주십시오.</p>
                            <div id="modal-alarm-btns">
                                <button @click="registMessage" class="modal-regist-btn">등록</button>
                                <button @click="closeConfirmModal" class="modal-regist-btn" id="modal-alarm-btns-cancel">취소</button>
                            </div>
                        </div>
                        <div class="modal-btn">
                            <button @click="closeConfirmModal" class="modal-close-btn">X</button>
                        </div>
                    </div>
                    </div>
        </div>

        <!-- 등록 버튼을 눌렀을 때 로그인하지 않은 경우 -->
        <div v-else-if="store.messages[props.day] === null && userStore.loginUser === null" class="message-click-container" >
            <div class="message-none-circle"> 
                <div class="message-out-regist-btn">
                    <button @click="modalToggle"  class="message-out-regist-btn">+</button>
                </div>
            </div>

            <div class="modal-wrap" v-show="modalCheck">
            <div class="modal-container">
                    <TheLogin/>
                <div class="modal-btn">
                    <button @click="modalToggle" class="modal-close-btn">X</button>
                </div>
            </div>
            </div>
        </div>
    
        <!-- 메시지가 있는 경우 메시지 내용 표시 -->
        <div v-else-if="store.messages[props.day]" > 
            <div class="message-click-container">

                <img v-if="stickerUrl" :src="stickerUrl" class="message-img-container">
                <div class="message-out-nickname-wrapper">
                    <span class="message-out-nickname">{{ store.messages[props.day].senderNickname }}</span>
                    <span class="message-out-nickname-border">{{ store.messages[props.day].senderNickname }}</span>
                </div>
                <div v-if="userStore.loginUser !== null" class="message-inner-look-btn">
                    <!-- 메시지 조회 가능 날짜 이후 -->
                    <button v-if="canViewMessage && (userStore.loginUser.email === route.params.email || userStore.loginUser.email === store.messages[props.day].sender)"
                        @click="afterMessageOpenDayModalToggle"></button>
                    <!-- 메시지 조회 가능 날짜 이전  -->
                    <button v-if="!canViewMessage && (userStore.loginUser.email === route.params.email || userStore.loginUser.email === store.messages[props.day].sender)"
                        @click="beforeMessageOpenDayModalToggle"></button>
                </div>
            </div>
            <!-- 메시지 조회 가능 날짜 이후 모달 -->
            <div class="modal-wrap" v-show="afterMessageOpenDayModal">
            <div class="modal-container"  id="message-detail-container">
                    <MessageDetail :message="store.messages[props.day]"/>
                <div class="modal-btn">
                    <button @click="afterMessageOpenDayModalToggle" class="modal-close-btn"  id="message-detail-btn">X</button>
                </div>
            </div>
            </div>

            <!-- 메시지 조회 가능 날짜 이전 모달 -->
            <div class="modal-wrap" v-show="beforeMessageOpenDayModal">
            <div class="modal-container" id="message-detail-impossible-container">
                    <MessageDetailBeforeOpenDay/>
                <div class="modal-btn">
                    <button @click="beforeMessageOpenDayModalToggle" class="modal-close-btn"  id="message-detail-btn">X</button>
                </div>
            </div>
            </div>

        </div>

        <div class="message-date-word">{{ props.day+1 }}일차</div>
    </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useMessageStore } from '@/stores/message';
import { useUserStore } from '@/stores/user';
import { useGoalStore } from '@/stores/goal';
import { useRoute } from 'vue-router';

import MessageDetail from './MessageDetail.vue';
import MessageDetailBeforeOpenDay from './MessageDetailBeforeOpenDay.vue';
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

// 메시지 로드 함수
const loadMessage = async () => {
    isLoading.value = true; // 로딩 상태 활성화
    try {
        await store.getMessage(route.params.email, goalStore.goal.startDate, props.day);
    } catch (error) {
        console.error(`Failed to load message for day ${props.day}:`, error);
    } finally {
        isLoading.value = false; // 로딩 상태 비활성화
    }
};

// 컴포넌트 마운트 시 메시지 로드
loadMessage();

// `store.messages`의 특정 day가 변경되었을 때 반응형으로 UI 갱신
watch(() => store.messages[props.day], (newValue) => {
    if (newValue) {
        console.log(`Day ${props.day} message updated:`, newValue);
    }
});

// 시작일로부터 day를 날짜로 계산하기
const currDate = computed(() => {
    const startDate = new Date(goalStore.goal.startDate);
    startDate.setDate(startDate.getDate() + props.day);

    const year = startDate.getFullYear();
    const month = String(startDate.getMonth() + 1).padStart(2, '0');
    const day = String(startDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
});

// 모달
const modalCheck = ref(false);
const modalToggle = function() {
    modalCheck.value = !modalCheck.value;
};

const canViewMessage = computed(() => {
    const today = new Date();
    const startDate = new Date(goalStore.goal.startDate);
    startDate.setDate(startDate.getDate() + props.day);
    return today >= startDate;
});

// 메시지 조회 관련 모달
const afterMessageOpenDayModal = ref(false);
const afterMessageOpenDayModalToggle = function() {
    afterMessageOpenDayModal.value = !afterMessageOpenDayModal.value;
}
const beforeMessageOpenDayModal = ref(false);
const beforeMessageOpenDayModalToggle = function() {
    beforeMessageOpenDayModal.value = !beforeMessageOpenDayModal.value;
};


// 메시지 등록 관련 모달
const messageToRegist = ref(null); // 메시지 등록
const registMessage = function() {
    store.registMessage(messageToRegist.value);
}

const registModal = ref(false); // 등록 확인용
const openConfirmModal = function(message) {
    modalToggle();
    registModal.value = !registModal.value;
    messageToRegist.value = message;
}
const closeConfirmModal = function() {
    registModal.value = !registModal.value;
    store.errorMessage = '';
    window.location.reload();
}

// 스티커 url
const stickerUrl = computed(() => {
  if (store.messages[props.day]?.stickerId) {
    return new URL(`/src/assets/sticker/sticker${store.messages[props.day].stickerId}.png`, import.meta.url).href;
  }
  return null;
});

</script>

<style scoped>

</style>
