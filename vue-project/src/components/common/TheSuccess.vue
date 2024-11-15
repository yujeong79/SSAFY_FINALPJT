<template>
    <div>
        <h2>{{ store.msg }} 성공</h2>
        <p>작업이 성공적으로 완료되었습니다.</p>
        <router-link :to="{name: 'videoList'}">목록으로</router-link>
    </div>
</template>

<script setup>
    import { useUserStore } from '@/stores/user';
    const store = useUserStore();
</script>

<style scoped>

</style>