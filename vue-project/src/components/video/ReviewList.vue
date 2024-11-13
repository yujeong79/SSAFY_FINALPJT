<template>
    <div>
        <h3>리뷰 목록</h3>
        <table>
            <thead>

            </thead>
            <tbody>
                <tr v-for="review in store.reviewList" :key="review.reviewId">
                    {{ review.reviewId }}
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
    import { onMounted } from 'vue';
    import { useReviewStore } from '@/stores/review';
    const store = useReviewStore();

    const props = defineProps({
        videoId: Number,
    });

    console.log(props.videoId);

    onMounted(()=>{
        store.getReviewList(props.videoId);
    })
    
</script>

<style scoped>

</style>