<template>
    <div>
        <h3>리뷰 목록</h3>
        <table>
            <thead>
                <tr>
                    <th>id</th>
                    <th>작성자</th>
                    <th>내용</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="review in store.reviewList" :key="review.reviewId">
                    <td>{{ review.reviewId }}</td>
                    <td>{{ review.userId }}</td>
                    <td>{{ review.content }}</td>
                    <td><button @click="modifyReview(review.reviewId)">수정</button></td>
                    <td><button @click="removeReview(review.reviewId)">삭제</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
    import { watch, onMounted } from 'vue';
    import { useReviewStore } from '@/stores/review';
    const store = useReviewStore();

    const props = defineProps({
        videoId: Number,
    });

    watch(()=>props.videoId, (newVideoId)=>{
        if(newVideoId) {
            store.getReviewList(newVideoId);
        }
    });

    const modifyReview = function(reviewId) {
        store.modifyReview(reviewId);
    }

    const removeReview = function(reviewId) {
        store.removeReview(props.videoId, reviewId);
    }
    
</script>

<style scoped>

</style>