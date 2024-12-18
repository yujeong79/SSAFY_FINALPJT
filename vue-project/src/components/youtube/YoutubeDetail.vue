<template>
    <div class="detail-align-result">
        <iframe class="detail-video-box"
            :src="videoUrl" 
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerpolicy="strict-origin-when-cross-origin" 
            allowfullscreen>
        </iframe>

        <div class="detail-box box-border-radius">
            <ReviewView :store-props="store.props"/>
        </div>
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import { useYoutubeStore } from '@/stores/youtube';
    import ReviewView from '@/views/ReviewView.vue';
    import _ from 'lodash';

    const store = useYoutubeStore();

    const videoUrl = computed(()=>{
        const videoSrc = store.video.id.videoId;
        return `https://www.youtube.com/embed/${videoSrc}`;
    });

    
</script>

<style scoped>

</style>