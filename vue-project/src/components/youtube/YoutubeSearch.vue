<template>
    <div>
      <h2>검색</h2>
      <input type="text" v-model.trim="keyword" @keyup.enter="search"/>
      <button @click="search">검색</button>
    </div>
  </template>
  
  <script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
  
    const router = useRouter();
    
    const keyword = ref('');

    const search = function () {
      router.push({name: 'searchResult', params:{keyword: keyword.value}});
    };
  
  </script>
  
  <style scoped>
  /* 스타일 작성 */
  </style>
  