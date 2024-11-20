<template>
    <div>
        <div v-if="store.goal">
            <p v-if="diff < 0">{{ store.goal.email }}님 운동 시작 {{ -diff }}일 전</p>
            <p v-if="diff > 0">{{ store.goal.email }}님 운동 시작 {{ diff }}일차</p>
            <div>
                <p>{{store.goal.goalName}} {{ store.goal.goalDescription }}</p>
                <p>{{ store.goal.startDate }} 시작</p>
            </div>
            <div>
                <p>challenge</p>
                <p>{{ store.goal.day }}일 도전</p>
            </div>
            <div>
            <p>실패 공약</p>
            <p>{{ store.goal.pledge }}</p>
            </div>
            <div>
                <p>{{ store.goal.email }}의 한마디</p>
                <p>{{ store.goal.text }}</p>
                <div v-if="userStore.loginUser !== null">
                    <button @click="goalTextUpdateModalToggle" v-if="userStore.loginUser.email === route.params.email">한마디수정</button>
                
                    <div class="modal-wrap" v-show="goalTextUpdateModal">
                    <div class="modal-container">
                            <GoalUpdateText/>
                        <div class="modal-btn">
                            <button @click="goalTextUpdateModalToggle">닫기</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            <div v-if="new Date() < new Date(store.goal.startDate)">
                <button @click="goalModalToggle" v-if="userStore.loginUser.email === route.params.email">목표수정하기</button>
                
                <div class="modal-wrap" v-show="goalModal">
                <div class="modal-container">
                        <GoalUpdate/>
                    <div class="modal-btn">
                        <button @click="goalModalToggle">닫기</button>
                    </div>
                </div>
                </div> 
            </div>

            <div v-if="new Date() > new Date(store.goal.startDate)">
                <button @click="goalModalToggle" v-if="userStore.loginUser.email === route.params.email">목표삭제하기</button>
                
                <div class="modal-wrap" v-show="goalModal">
                <div class="modal-container">
                        <GoalDelete/>
                    <div class="modal-btn">
                        <button @click="goalModalToggle">닫기</button>
                    </div>
                </div>
                </div> 
            </div>
        </div>
        <div v-if="!store.goal">
            <div>
                <p>목표를 등록해주세요.</p>
            </div>
            <div>
                <p>challenge</p>
                <p>목표를 등록해주세요.</p>
            </div>
            <div>
                <p>실패 공약</p>
                <p>공약을 등록해주세요</p>
            </div>
            <div>
                <p>한마디</p>
                <p>한마디를 등록해주세요.</p>
            </div>

            <div>
                <button @click="modalOpen">등록</button>
            </div>

            <div class="modal-wrap" v-show="modalCheck">
            <div class="modal-container">
                    <GoalRegist/>
                <div class="modal-btn">
                    <button @click="modalClose">닫기</button>
                </div>
            </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useGoalStore } from '@/stores/goal';
import { useUserStore } from '@/stores/user';

import GoalRegist from './GoalRegist.vue';
import GoalUpdateText from './GoalUpdateText.vue';
import GoalUpdate from './GoalUpdate.vue';
import GoalDelete from './GoalDelete.vue';

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

const goalTextUpdateModal = ref(false);
const goalTextUpdateModalToggle = function() {
    goalTextUpdateModal.value = !goalTextUpdateModal.value;
};

const goalModal = ref(false);
const goalModalToggle = function() {
    goalModal.value = !goalModal.value;
};

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