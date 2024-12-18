<template>
    <div id="modal-user-input">
        <label for="name" class="modal-alarm">이름</label> 
        <input type="text" id="name" v-model="goal.name" placeholder="이름" class="modal-input">

        <label for="startDate" class="modal-alarm">시작 일자</label> 
        <input type="date" v-model="goal.startDate" class="modal-input">

        <label for="endDate" class="modal-alarm">종료 일자</label>
        <input type="date" v-model="goal.endDate" class="modal-input">

        <p v-if="!goal.endDate" class="modal-alarm" style="color:red">종료일은 시작일 이후이어야 합니다.</p>

        <label for="goalCode" class="modal-alarm">목표 설정</label>
        <select name="goalCode" id="goalCode" v-model="goal.goalCode" class="modal-input">
            <option value="100">체중</option>
            <option value="200">체지방</option>
            <option value="300">골격근</option>
            <option value="400">BMI</option>
            <option value="500" selected="selected">기타</option>
        </select>
        <label for="goalDescription" class="modal-alarm">목표 수치</label>
        <input type="text" id="goalDescription" v-model="goal.goalDescription" placeholder="5키로 감량" class="modal-input">
        <label for="pledge" class="modal-alarm">실패 공약</label>
        <input type="text" id="pledge" v-model="goal.pledge" class="modal-input">
        
        <div id="modal-alarm-btns">
            <button @click="triggerConfirm" class="modal-regist-btn" :disabled="isButtonDisabled">등록</button>
            <button @click="resetGoal" class="modal-regist-btn" id="modal-alarm-btns-cancel">초기화</button>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, computed, defineEmits } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const emit = defineEmits(['open-confirm-modal']);

const goal = ref({
    name: '',
    email: route.params.email,
    startDate: '',
    endDate: '',
    day: '',
    goalCode: 500,
    goalDescription: '',
    text: '나 운동할거야',
    pledge: '성공 못하면 추첨을 통해 밥 사드릴게요( ´･･)ﾉ(._.`)',
});

// 초기화 함수
const resetGoal = function() {
    goal.value.name = '',
    goal.value.startDate = '';
    goal.value.endDate = '';
    goal.value.day = '';
    goal.value.goalCode = 500;
    goal.value.goalDescription = '';
    goal.value.pledge = '성공 못하면 추첨을 통해 밥 사드릴게요( ´･･)ﾉ(._.`)';
};

// 종료일 설정
watch(() => [goal.value.startDate, goal.value.endDate], ([newStartDate, newEndDate]) => {
    if (newStartDate && newEndDate && new Date(newEndDate) < new Date(newStartDate)) { // 종료일자가 시작일자 이전인지 확인
        goal.value.endDate = null; // 종료일 초기화
    }
});

// 등록 버튼 비활성화 조건 (계산된 속성)
const isButtonDisabled = computed(() => {
    // 시작일과 종료일이 모두 있어야 하고 종료일이 시작일보다 이후여야 활성화
    if (!goal.value.startDate || !goal.value.endDate) return true; // 둘 중 하나라도 없으면 비활성화
    return new Date(goal.value.endDate) < new Date(goal.value.startDate); // 종료일이 시작일보다 이전이면 비활성화
});

// 일차수 계산 함수
const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffInMilliseconds = end - start + 1;

    // 밀리초를 일수로 변환
    return Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24)); // 올림 처리
};

const triggerConfirm = function() {
    if (goal.value.startDate && goal.value.endDate) {
        goal.value.day = calculateDays(goal.value.startDate, goal.value.endDate);
    } else {
        goal.value.day = 0; // 유효하지 않은 날짜일 경우 0으로 설정
    }
    emit('open-confirm-modal', goal.value);
};

</script>

<style scoped>

    
</style>
