<template>
    <div>
        <h2>디테일</h2>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>제목</th>
                    <th>유튜브</th>
                    <th>채널명</th>
                    <th>조회수</th>
                    <th>운동부위</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ store.video.videoId }}</td>
                    <td>{{ store.video.title }}</td>
                    <td>{{ store.video.youtubeUrl }}</td>
                    <td>{{ store.video.channelName }}</td>
                    <td>{{ store.video.viewCnt }}</td>
                    <td>{{ store.video.partName }}</td>
                </tr>
            </tbody>
        </table>

        <router-link :to="{name: 'videoUpdate'}">수정</router-link>
        <button @click="deleteVideo">삭제</button>
        
        <hr>
        
        <ReviewView/>
    </div>
</template>

<script setup>
    import ReviewView from '@/views/ReviewView.vue';
    import { ref, onMounted } from 'vue';
    import { useVideoStore } from '@/stores/video';
    import { useRoute } from 'vue-router';

    const store = useVideoStore();
    const route = useRoute();

    const videoId = ref(route.params.videoId);

    onMounted(()=>{
        store.getVideoByVideoId(videoId.value);
    })

    const deleteVideo = function() {
        store.deleteVideo(videoId.value);
    };

</script>

<style scoped>

</style>