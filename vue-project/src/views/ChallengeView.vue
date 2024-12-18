<template>
  <div class="challenge-view-layout">
    <GoalView/>
    <MessageView/>
  </div>
</template>

<script setup>
  import GoalView from '@/components/goal/GoalView.vue';
  import MessageView from '@/components/message/MessageView.vue';

  import { useRoute } from 'vue-router';
  const route = useRoute();
</script>

<style scoped>

  
</style>