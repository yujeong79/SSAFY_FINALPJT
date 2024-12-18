<template>
    <div>
        <!-- 목표가 있는 경우 목표 보여주기 -->
        <div v-if="store.goal">

            <!-- 운동 헤더 -->
            <p v-if="diff < 0" class="header-font-family">
                <span>{{ store.goal.name }}</span> 운동 
                <span class="highlight">{{ -diff }}</span>일 전
            </p>
            <p v-if="diff >= 0" class="header-font-family">
                <span>{{ store.goal.name }}</span> 운동  
                <span class="highlight">{{ diff + 1 }}</span> 일차
            </p>

            <!-- 운동목표 -->
            <div class="goal-first-container padding-all-element-inline">
                <div class="goal-first-container-img">GOAL</div>
                <div>
                    <p class="goal-first-container-txt font-charcol-color font-apple-semi-bold">{{store.goal.goalName}} {{ store.goal.goalDescription }}</p>
                    <p class="goal-first-container-start-date font-apple-small-message"># {{ store.goal.startDate }} 시작</p>
                </div>
            </div>

            <!-- n일 도전 -->
            <div class="goal-second-container">
                <div class="goal-second-container-challenge padding-all-element-inline">
                    <p class="font-apple-small-message goal-second-container-txt">challenge</p>
                    <p class="font-apple-semi-bold">{{ store.goal.day }}일간의 도전</p>
                    <div  class="goal-second-container-img">
                      <img src="@/assets/img/challenge.png" class="goal-img-container">
                    </div>
                </div>

                <!--실패공약  -->
                <div class="goal-second-container-fail padding-all-element-inline">
                <p class="font-apple-small-message goal-second-container-txt">실패 공약</p>
                <p class="font-apple-semi-bold">{{ store.goal.pledge }}</p>
                <div  class="goal-second-container-img">
                      <img src="@/assets/img/failed.png" class="goal-img-container">
                    </div>
                </div>
            </div>


            <!-- 현래의 한마디 -->
            <p class="header-font-family">{{ store.goal.name }}의 한마디</p>
            <div class="goal-third-container padding-all-element-inline">
                <img src="@/assets/img/note-edge.png" class ="goal-third-img-container">
                <p class="goal-third-container-txt">{{ store.goal.text }}</p>
                <div v-if="userStore.loginUser !== null">
                    <!-- 한마디 수정 버튼 -->
                    <button @click="goalTextUpdateModalToggle" v-if="userStore.loginUser.email === route.params.email" class="goal-third-container-btn">
                        <img src="@/assets/icon/edit-black.png" class="icon-img-container goal-third-container-btn-img ">
                    </button>
                    
                    <div class="modal-wrap" v-show="goalTextUpdateModal">
                        <div class="modal-container">
                            <GoalUpdateText/>
                            <div class="modal-btn">
                                <button @click="goalTextUpdateModalToggle" class="modal-close-btn">X</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 우측하단 버튼 컨테이너 -->
            <div class="button-goal-container">
                <!-- 목표 공유하기 버튼 -->
                <button @click="goalShareModalToggle" v-if="userStore.loginUser && userStore.loginUser.email === route.params.email" class="button-goal-share">
                    <img src="@/assets/icon/share.png" class="icon-img-container">
                </button>

                <!-- 목표 시작 이전 목표 수정 가능 -->
                <div v-if="new Date() < new Date(store.goal.startDate)">
                    <!-- 목표 수정 버튼 -->
                    <button @click="goalModalToggle" v-if="userStore.loginUser && userStore.loginUser.email === route.params.email" class="button-goal-modify">
                        <img src="@/assets/icon/edit-white.png" class="icon-img-container">
                    </button>
                    
                    <div class="modal-wrap" v-show="goalModal">
                    <div class="modal-container">
                            <GoalUpdate/>
                        <div class="modal-btn">
                            <button @click="goalModalToggle" class="modal-close-btn">X</button>
                        </div>
                    </div>
                    </div> 
                </div>

                <!-- 목표 시작 이후 목표 삭제만 가능 -->
                <div v-if="new Date() > new Date(store.goal.startDate)">
                    <button @click="goalModalToggle" v-if="userStore.loginUser && userStore.loginUser.email === route.params.email" class="button-goal-delete">
                        <img src="@/assets/icon/delete.png" class="icon-img-container">
                    </button>
                    
                    <div class="modal-wrap" v-show="goalModal">
                    <div class="modal-container">
                            <GoalDelete @close-modal="goalModalToggle"/>
                        <div class="modal-btn">
                            <button @click="goalModalToggle" class="modal-close-btn">X</button>
                        </div>
                    </div>
                    </div> 
                </div>

            </div>

            <!-- 목표 공유하기 모달 -->
            <div class="modal-wrap" v-show="goalShareModal">
                <div class="modal-container">
                    <GoalShare @close-share-modal="goalShareModalToggle"/>
                <div class="modal-btn">
                    <button @click="goalShareModalToggle" class="modal-close-btn">X</button>
                </div>
            </div>
            </div>
        </div>


        <!-- ======목표 생성 전====== -->

        <div v-else>

            <!-- 운동 헤더 -->
            <p class="header-font-family "> OO 님 운동 시작 대기 중</p>

            <!-- 운동목표 -->
            <div class="goal-first-container padding-all-element-inline">
                <div class="goal-first-container-img">GOAL</div>
                <div>
                    <p class="goal-first-container-txt font-charcol-color font-apple-semi-bold">목표를 등록해주세요</p>
                    <p class="goal-first-container-start-date font-apple-small-message"># 시작일 </p>
                </div>
            </div>

            <!-- n일 도전 -->
            <div class="goal-second-container">
                <div class="goal-second-container-challenge padding-all-element-inline">
                    <p class="font-apple-small-message goal-second-container-txt">challenge</p>
                    <p class="font-apple-semi-bold">N일간의 도전</p>
                    <div  class="goal-second-container-img">
                      <img src="@/assets/img/challenge.png" class="goal-img-container">
                    </div>
                </div>

                <!--실패공약  -->
                <div class="goal-second-container-fail padding-all-element-inline">
                <p class="font-apple-small-message goal-second-container-txt">실패 공약</p>
                <p class="font-apple-semi-bold">공약을 등록해주세요</p>
                <div  class="goal-second-container-img">
                      <img src="@/assets/img/failed.png" class="goal-img-container">
                </div>
                </div>
            </div>


            <!-- 현래의 한마디 -->
            <p class="header-font-family"> OO 의 한마디</p>
            <div class="goal-third-container padding-all-element-inline">
                <img src="@/assets/img/note-edge.png" class ="goal-third-img-container">
                <p class="goal-third-container-txt"> 내 운동이 망할리가 없어! 당연하다구</p>
            </div>

            <!-- 등록버튼들  -->
            <div class="button-goal-container"> 
                <button @click="goalRegistModalToggle" class="button-goal-modify">
                    <img src="@/assets/icon/regist.png" class="icon-img-container goal-third-container-btn-img ">
                </button>
            </div>

            <!-- 등록 컴포넌트 모달 -->
            <div class="modal-wrap" v-show="goalRegistModal">
            <div class="modal-container">
                    <GoalRegist @open-confirm-modal="openConfirmModal"/>
                <div class="modal-btn">
                    <button @click="goalRegistModalToggle" class="modal-close-btn">X</button>
                </div>
            </div>
            </div>

            <!-- 목표 등록 시 확인 -->
            <div class="modal-wrap" v-show="confirmModal">
            <div class="modal-container">
                <div class="modal-background">
                    <p class="modal-alarm">목표 시작일 이전까지만 수정이 가능합니다.</p>
                    <p class="modal-alarm">등록하시겠습니까?</p>
                    <div id="modal-alarm-btns">
                        <button @click="registGoal" class="modal-regist-btn">확인</button>
                        <button @click="closeConfirmModal" class="modal-regist-btn" id="modal-alarm-btns-cancel">취소</button>
                    </div>
                </div>
                <div class="modal-btn">
                    <button @click="closeConfirmModal" class="modal-close-btn">X</button>
                </div>
            </div>
            </div>

        </div>

        <!-- ================= -->

    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useGoalStore } from '@/stores/goal';
import { useUserStore } from '@/stores/user';

import GoalRegist from './GoalRegist.vue';
import GoalUpdateText from './GoalUpdateText.vue';
import GoalUpdate from './GoalUpdate.vue';
import GoalDelete from './GoalDelete.vue';
import GoalShare from './GoalShare.vue';

const store = useGoalStore();
const userStore = useUserStore();
const route = useRoute();

const props = defineProps({
    email: String,
})

onMounted(() => {
  store.getGoal(route.params.email);
});

const diff = computed(() => {
  const today = new Date();
  const start = new Date(store.goal?.startDate);

  const diffInMilliseconds = today - start;
  return Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
});

// 목표 등록 모달
const goalRegistModal = ref(false);
const goalRegistModalToggle = function() {
    goalRegistModal.value = !goalRegistModal.value;
}

const goalToRegist = ref(null);
const registGoal = function() {
    store.registGoal(goalToRegist.value);
}

const confirmModal = ref(false); // 등록 확인용
const openConfirmModal = function(goal) {
    goalRegistModalToggle();
    confirmModal.value = !confirmModal.value;
    goalToRegist.value = goal;
}
const closeConfirmModal = function() {
    confirmModal.value = !confirmModal.value;
}

// 한마디 수정 모달
const goalTextUpdateModal = ref(false);
const goalTextUpdateModalToggle = function() {
    goalTextUpdateModal.value = !goalTextUpdateModal.value;
};

// 공유 모달
const goalShareModal = ref(false);
const goalShareModalToggle = function() {
    goalShareModal.value = !goalShareModal.value;
};

// 공통 모달
const goalModal = ref(false);
const goalModalToggle = function() {
    goalModal.value = !goalModal.value;
};


</script>

<style scoped>
</style>