<template>
    <div>
        <YoutubeSearch/>
        <hr>
        <YoutubeSearchResultItem v-for="video in store.videoList" :key="video.id.videoId" :video="video"/>
    </div>
</template>

<script setup>
    import { watch, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import { useYoutubeStore } from '@/stores/youtube';
    import YoutubeSearch from './YoutubeSearch.vue';
    import YoutubeSearchResultItem from './YoutubeSearchResultItem.vue';

    const route = useRoute();
    const store = useYoutubeStore();

    onMounted(()=>{
        store.youtubeSearch(route.params.keyword);
    })

    watch(()=>route.params.keyword, (newKeyword)=>{
        store.youtubeSearch(newKeyword);
    });

</script>

<style scoped>

</style>