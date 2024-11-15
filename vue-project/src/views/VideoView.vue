<template>
  <div>
    <h1>Video</h1>
    <router-link v-if="userStore.loginUser"
      :to="{name: 'videoRegist'}">VIDEO 등록</router-link>
    
    <router-view></router-view>
  </div>
</template>

<script setup>
  import { useUserStore } from '@/stores/user';
  const userStore = useUserStore();
</script>

<style scoped>

</style>