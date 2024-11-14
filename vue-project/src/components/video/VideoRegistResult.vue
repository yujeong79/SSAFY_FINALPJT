<template>
    <div>
        <h2>비디오 등록 완료</h2>
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
    </div>
</template>

<script setup>
    import { useVideoStore } from '@/stores/video';
    const store = useVideoStore();
</script>

<style scoped>

</style>