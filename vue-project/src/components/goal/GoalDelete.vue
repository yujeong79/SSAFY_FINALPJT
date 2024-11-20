<template>
    <div>
        목표를 삭제하겠습니묭?
        <button @click="deleteGoal">네</button>
        <button>아니요</button>
    </div>
</template>

<script setup>
    import { useGoalStore } from '@/stores/goal';
    const store = useGoalStore();

    const deleteGoal = function() {
        store.deleteGoal();
    };

</script>

<style scoped>

</style>