<template>
    <div>
       <fieldset>
            <p>이름</p>
            <p>{{ route.params.email }}</p>
            <label for="startDate">시작 일자</label> 
            <input type="text" id="startDate" v-model="goal.startDate" placeholder="YYYY-MM-DD 형식으로 입력해주세요"> <br>
            <label for="endDate">종료 일자</label>
            <input type="text" id="endDate" v-model="goal.endDate" placeholder="YYYY-MM-DD 형식으로 입력해주세요"> <br>
            <label for="goalCode">목표 설정</label>
            <select name="goalCode" id="goalCode" v-model="goal.goalCode">
                <option value="100">체중</option>
                <option value="200">체지방</option>
                <option value="300">골격근</option>
                <option value="400">BMI</option>
                <option value="500" selected="selected">기타</option>
            </select> <br>
            <label for="goalDescription">목표 수치</label>
            <input type="text" id="goalDescription" v-model="goal.goalDescription" placeholder="5키로 감량"> <br>
            <label for="pledge">실패 공약</label>
            <input type="text" id="pledge" v-model="goal.pledge" placeholder="성공 못하면 밥 사줌"> <br>
            <button @click="registGoal">등록</button>
            <button @click="resetGoal">초기화</button>
       </fieldset>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useGoalStore } from '@/stores/goal';

const store = useGoalStore();
const userStore = useUserStore();
const route = useRoute();

const goal = ref({
    email: route.params.email,
    startDate: '',
    endDate: '',
    day: '',
    goalCode: 500,
    goalDescription: '',
    text: '나 운동할거야',
    pledge: '',
});

// 일차수 계산 함수
const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffInMilliseconds = end - start;

    // 밀리초를 일수로 변환
    return Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24)); // 올림 처리
};

// 등록 함수
const registGoal = function() {
    if (goal.value.startDate && goal.value.endDate) {
        // startDate와 endDate가 존재할 경우 일차수 계산
        goal.value.day = calculateDays(goal.value.startDate, goal.value.endDate);
    } else {
        goal.value.day = 0; // 유효하지 않은 날짜일 경우 0으로 설정
    }

    // 목표 등록
    store.registGoal(goal.value);
};

// 초기화 함수
const resetGoal = function() {
    goal.value.startDate = '';
    goal.value.endDate = '';
    goal.value.day = '';
    goal.value.goalCode = 500;
    goal.value.goalDescription = '';
    goal.value.pledge = '';
};
</script>

<style scoped>

</style>
