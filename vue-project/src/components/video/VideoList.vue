<template>
    <div>
       <h2>VideoList</h2>
        <VideoListItem v-for="video in store.videoList" :key="video.videoId" :video="video"></VideoListItem>
    </div>
</template>

<script setup>
    import { onMounted } from 'vue';
    import VideoListItem from '@/components/video/VideoListItem.vue';

    import { useVideoStore } from '@/stores/video';
    const store = useVideoStore();

    onMounted(()=>{
        store.getVideoList();
    })
</script>

<style scoped>

</style>