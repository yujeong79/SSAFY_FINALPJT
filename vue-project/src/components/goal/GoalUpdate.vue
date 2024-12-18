<template>
    <div id="modal-user-input">
        <label for="name" class="modal-alarm">이름</label> 
        <input type="text" id="name" v-model="store.goal.name" class="modal-input">

        <label for="startDate" class="modal-alarm">시작 일자</label> 
        <input type="date" v-model="tempStartDate" class="modal-input">

        <label for="endDate" class="modal-alarm">종료 일자</label>
        <input type="date" v-model="tempEndDate" class="modal-input">

        <p v-if="!tempEndDate" class="modal-alarm" style="color:red">종료일은 시작일 이후이어야 합니다.</p>

        <label for="goalCode" class="modal-alarm">목표 설정</label>
        <select name="goalCode" id="goalCode" v-model="store.goal.goalCode" class="modal-input">
            <option value="100">체중</option>
            <option value="200">체지방</option>
            <option value="300">골격근</option>
            <option value="400">BMI</option>
            <option value="500" selected="selected">기타</option>
        </select>
        <label for="goalDescription" class="modal-alarm">목표 수치</label>
        <input type="text" id="goalDescription" v-model="store.goal.goalDescription" class="modal-input">
        <label for="pledge" class="modal-alarm">실패 공약</label>
        <input type="text" id="pledge" v-model="store.goal.pledge" class="modal-input">
        <div id="modal-alarm-btns">
            <button @click="updateGoal" class="modal-regist-btn">수정</button>
        </div>
    </div>
</template>

<script setup>
    import { ref, watch, onMounted } from 'vue';
    import { useRoute }  from 'vue-router';
    import { useGoalStore } from '@/stores/goal';

    const store = useGoalStore();
    const route = useRoute();

    const tempStartDate = ref('');
    const tempEndDate = ref('');

    onMounted(()=>{
        store.getGoal(route.params.email);
        tempStartDate.value = store.goal.startDate;
        tempEndDate.value = store.goal.endDate;
    });

    // 종료일 설정
    watch([tempStartDate, tempEndDate], ([newStartDate, newEndDate]) => {
        if (newStartDate && newEndDate && new Date(newEndDate) < new Date(newStartDate)) {
            tempEndDate.value = null; // 종료일 초기화
        }
    });

    // 일차수 계산 함수
    const calculateDays = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const diffInMilliseconds = end - start + 1;

        // 밀리초를 일수로 변환
        return Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24)); // 올림 처리
    };

    const updateGoal = function() {
        if(tempStartDate.value !== null) {
            if(tempStartDate.value !== store.goal.startDate) {
                store.goal.startDate = tempStartDate.value;
            }
        }

        if(tempEndDate.value !== null) {
            if(tempEndDate.value !== store.goal.EndDate) {
                if(new Date(store.goal.startDate) > new Date(tempEndDate.value)) {
                    tempEndDate.value = null;
                    return;
                } else {
                    store.goal.endDate = tempEndDate.value;
                }
            }
        } 

        store.goal.day = calculateDays(store.goal.startDate, store.goal.endDate);

        store.updateGoal();
    };

</script>

<style scoped>

</style>
