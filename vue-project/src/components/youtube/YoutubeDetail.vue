<template>
    <div>
        <h4>영상 상세보기</h4>
        <iframe 
            width="560" 
            height="315" 
            :src="videoUrl" 
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerpolicy="strict-origin-when-cross-origin" 
            allowfullscreen>
        </iframe>

        <ReviewView/>
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import { useYoutubeStore } from '@/stores/youtube';
    import ReviewView from '@/views/ReviewView.vue';

    const store = useYoutubeStore();

    const videoUrl = computed(()=>{
        const videoSrc = store.video;
        console.log(videoSrc);
        return `https://www.youtube.com/embed/${videoSrc}`;
    });
    
</script>

<style scoped>

</style>