<template>
    <div>
        <h2>Video 등록</h2>
        <fieldset>
            <div>
                <label for="title">제목</label>
                <input type="text" v-model="video.title" id="title">
            </div>
            <div>
                <label for="youtubeUrl">유튜브 링크</label>
                <input type="text" v-model="video.youtubeUrl" id="youtubeUrl">
            </div>
            <div>
                <label for="channelName">채널명</label>
                <input type="text" v-model="video.channelName" id="channelName">
            </div>
            <div>
                <label for="partCode">운동 부위</label>
                <select v-model="video.partCode" id="partCode">
                    <option value="100">전신</option>
                    <option value="200">상체</option>
                    <option value="201">등</option>
                    <option value="202">어깨</option>
                    <option value="203">가슴</option>
                    <option value="204">팔</option>
                    <option value="205">복부</option>
                    <option value="300">하체</option>
                    <option value="301">엉덩이</option>
                    <option value="302">허벅지</option>
                    <option value="303">종아리</option>
                    <option value="400" selected>기타</option>
                </select>
            </div>
            <div>
                <button @click="createVideo">등록</button>
                <button @click="reset">초기화</button>
            </div>
        </fieldset>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { useVideoStore } from '@/stores/video';

    const store = useVideoStore();
    
    const video = ref({
        title: '',
        youtubeUrl: '',
        channelName: '',
        partCode: 400
    });

    const createVideo = function() {
        store.createVideo(video.value);
    };

    const reset = function() { // 초기화
        video.value.title = '';
        video.value.youtubeUrl = '';
        video.value.channelName = '';
        video.value.partCode = 400;
    }

</script>

<style scoped>

</style>