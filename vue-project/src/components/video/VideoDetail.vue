<template>
    <div>
        <h2>디테일</h2>
        <table>
            <thead>
                <tr>
                    <th>제목</th>
                    <th>유튜브</th>
                    <th>채널명</th>
                    <th>조회수</th>
                    <th>운동부위</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ store.video.title }}</td>
                    <td>{{ store.video.youtubeUrl }}</td>
                    <td>{{ store.video.channelName }}</td>
                    <td>{{ store.video.viewCnt }}</td>
                    <td>{{ store.video.partName }}</td>
                </tr>
            </tbody>
        </table>

        <router-link v-if="userStore.loginUser"
            :to="{name: 'videoUpdate'}">수정</router-link>
        <button v-if="userStore.loginUser"
            @click="deleteVideo">삭제</button>
        
        <hr>
        
        <ReviewView/>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import { useVideoStore } from '@/stores/video';
    import { useUserStore } from '@/stores/user';
    import ReviewView from '@/views/ReviewView.vue';
    

    const store = useVideoStore();
    const userStore = useUserStore();
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