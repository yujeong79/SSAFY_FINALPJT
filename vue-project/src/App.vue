<template>
  <div class="container">
    <div class="phone-box" :class="[currentRouteClass]" >
      <TheHeaderNav :is-challenge-view="isChallengeView" :is-main="isMain"/>
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

  // 쿼리스트링에 검색어가 있는지 확인
  const isMain = computed(() => route.path === '/');

  import TheHeaderNav from '@/components/common/TheHeaderNav.vue';
</script>

<style scoped>

</style>
