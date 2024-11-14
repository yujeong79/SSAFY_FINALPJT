<template>
    <div>
        <h2>비디오 {{ store.msg }} 성공</h2>
        <p>작업이 성공적으로 완료되었습니다.</p>
        <router-link :to="{name: 'videoList'}">목록으로</router-link>
    </div>
</template>

<script setup>
    import { useVideoStore } from '@/stores/video';

    const store = useVideoStore();
</script>

<style scoped>

</style>