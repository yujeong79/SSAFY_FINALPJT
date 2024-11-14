<template>
    <div>
        <ReviewRegist :video-id="store.video.videoId"/>
        <ReviewList :video-id="store.video.videoId"/>
    </div>
</template>

<script setup>
    import ReviewList from '@/components/review/ReviewList.vue';
    import ReviewRegist from '@/components/review/ReviewRegist.vue';
    import { useVideoStore } from '@/stores/video';
    const store = useVideoStore();
</script>

<style scoped>

</style>