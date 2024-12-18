<template>
    <div>
      <div v-if="store.goal" class="day-container">
        <!-- 빈칸 추가 -->
        <div v-for="blank in Array.from({ length: store.goal.startDayOfWeek-1 }, () => null)" :key="blank" class="day-item blank"></div>
        
        <!-- 실제 MessageListItem 렌더링 -->
        <MessageListItem 
          v-for="day in Array.from({ length: store.goal.day }, (_, i) => i)" 
          :key="day" 
          :day="day" 
          class="day-item"
        />
      </div>

    <!-- 골 없을 때 -->
    <div v-else class="day-container">
      <div v-f  or="blank in Array.from({ length: 3 }, () => null)" :key="blank" class="day-item blank"></div>

      <!-- 가짜 컴포넌트 반복하기 -->
      <div v-for="day in dummyGoalDays" :key="day" class="day-item">
        <div class="message-click-container">
          <div class="message-none-circle"></div>
        </div>

        <!-- '일차' 표시 -->
        <div class="message-date-word">{{ day + 1 }}일차</div>
      </div>
    </div>

    </div>
  </template>
  
  
  <script setup>
  import { useGoalStore } from '@/stores/goal';
  import MessageListItem from './MessageListItem.vue';
  import { onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { ref } from 'vue';

  const store = useGoalStore();
  const route = useRoute();
  

  onMounted(()=>{
    store.getGoal(route.params.email);
  });

  console.log(store.goal);

  const dummyGoalDays = Array.from({ length: 50 }, (_, i) => i);

  </script>
  

  <style scoped>

  
  </style>
  