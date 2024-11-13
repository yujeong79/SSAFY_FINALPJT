<template>
    <div class="video-info">
        {{ video.videoId }}.
        <router-link :to="`/detail/${video.videoId}`">{{ video.title }}</router-link>
        {{ video.youtubeUrl }}
        {{ video.channelName }}
        {{ video.viewCnt }}
        {{ video.partName }}
    </div>
</template>

<script setup>
    import { RouterLink, RouterView } from 'vue-router';

    defineProps({
        video: Object,
    });
</script>

<style scoped>
    .video-info {
        border: 1px solid;
    }
</style>