<template>
    <div>
        <ReviewRegist v-if="userStore.loginUser"
            :video-id="store.video.videoId"/>
        <ReviewList :video-id="store.video.videoId"/>
    </div>
</template>

<script setup>
    import ReviewList from '@/components/review/ReviewList.vue';
    import ReviewRegist from '@/components/review/ReviewRegist.vue';
    import { useVideoStore } from '@/stores/video';
    import { useUserStore } from '@/stores/user';
    const store = useVideoStore();
    const userStore = useUserStore();
</script>

<style scoped>

</style>