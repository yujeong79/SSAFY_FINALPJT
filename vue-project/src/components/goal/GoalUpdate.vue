<template>
    <div>
        <fieldset>
            <p>이름</p>
            <p>{{ route.params.email }}</p>
            <label for="startDate">시작 일자</label> 
            <input type="text" id="startDate" v-model="store.goal.startDate"> <br>
            <label for="endDate">종료 일자</label>
            <input type="text" id="endDate" v-model="store.goal.endDate"> <br>
            <label for="goalCode">목표 설정</label>
            <select name="goalCode" id="goalCode" v-model="store.goal.goalCode">
                <option value="100">체중</option>
                <option value="200">체지방</option>
                <option value="300">골격근</option>
                <option value="400">BMI</option>
                <option value="500" selected="selected">기타</option>
            </select> <br>
            <label for="goalDescription">목표 수치</label>
            <input type="text" id="goalDescription" v-model="store.goal.goalDescription"> <br>
            <label for="pledge">실패 공약</label>
            <input type="text" id="pledge" v-model="store.goal.pledge"> <br>
            <button @click="updateGoal">수정</button>
       </fieldset>
    </div>
</template>

<script setup>
    import { onMounted } from 'vue';
    import { useRoute }  from 'vue-router';
    import { useGoalStore } from '@/stores/goal';

    const store = useGoalStore();
    const route = useRoute();

    onMounted(()=>{
        store.getGoal(route.params.email);
    });

    const updateGoal = function() {
        store.updateGoal();
    };

</script>

<style scoped>

</style>