<template>
  <div class="container">
    <div class="phone-box" :class="[currentRouteClass]" >
      <TheHeaderNav :hideChallenge="isChallengeView"/>
    </div>
  </div>
</template>

<script setup>


import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

  // challengeView인지 여부 확인
  const isChallengeView = computed(() => route.path.startsWith('/challenge'));

  // 배경색을 변경하기 위한 클래스 이름 설정
  const currentRouteClass = computed(() => {
    return isChallengeView.value ? 'background-color-green' : 'background-color-blue';
  });

  import TheHeaderNav from '@/components/common/TheHeaderNav.vue';
  import '@/assets/global.css';
</script>

<style scoped>

</style>
