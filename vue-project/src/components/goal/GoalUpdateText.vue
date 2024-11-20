<template>
    <div>
        <h3>한마디를 적어주세요!</h3>
        <fieldset>
            <label for="text">한마디</label>
            <input type="text" v-model="store.goal.text">
            <button @click="updateText">저장</button>
        </fieldset>
    </div>
</template>

<script setup>
    import { onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import { useGoalStore } from '@/stores/goal';

    const store = useGoalStore();
    const route = useRoute();

    onMounted(()=>{
        store.getGoal(route.params.email);
    });

    const updateText = function() {
        store.updateGoal();
    };

</script>

<style lang="scss" scoped>

</style>