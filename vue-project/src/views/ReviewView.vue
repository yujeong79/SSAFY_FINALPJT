<template>
    <div>
        <ReviewRegist v-if="userStore.loginUser"
            :video-id="store.video"/>
        <ReviewList :video-id="store.video"/>
    </div>
</template>

<script setup>
    import ReviewList from '@/components/review/ReviewList.vue';
    import ReviewRegist from '@/components/review/ReviewRegist.vue';
    import { useYoutubeStore } from '@/stores/youtube';
    import { useUserStore } from '@/stores/user';
    const store = useYoutubeStore();
    const userStore = useUserStore();

</script>

<style scoped>

</style>