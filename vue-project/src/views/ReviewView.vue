<template>
    <div class="detail-title-container padding-all-element-inline-10">
        <div class="detail-title">{{store.video.snippet.title}}</div>
        <!-- <div>{{store.video.snippet.channelTitle}}</div>
        <div>{{store.video.snippet.description}}</div> -->
        <div class="detial-date">{{store.video.snippet.publishTime}}</div>
    </div>

    <div class="review-regist-layout">
        <ReviewRegist v-if="userStore.loginUser"
            :video-id="store.video.id.videoId" class="review-regist-layout"/>
    </div>

    <div class="review-list-layout padding-all-element-inline-10">
        <ReviewList :video-id="store.video.id.videoId"/>
    </div> 
</template>

<script setup>
    import ReviewList from '@/components/review/ReviewList.vue';
    import ReviewRegist from '@/components/review/ReviewRegist.vue';
    import { useYoutubeStore } from '@/stores/youtube';
    import { useUserStore } from '@/stores/user';
    const store = useYoutubeStore();
    const userStore = useUserStore();

    const props = defineProps({
        storeProps: Object,
    });

</script>

<style scoped>

</style>