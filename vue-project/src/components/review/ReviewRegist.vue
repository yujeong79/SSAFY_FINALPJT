<template>
    <div>
        <fieldset>
            <legend>리뷰 등록</legend>
            <div>
                <label for="content">내용</label>
                <input type="text" v-model="review.content" id="content">
            </div>
            <div>
                <button @click="registReview">등록</button>
            </div>
        </fieldset>
    </div>
</template>

<script setup>
    import { ref, watch } from 'vue';
    import { useReviewStore } from '@/stores/review';

    const store = useReviewStore();

    const props = defineProps({
        videoId: Number,
    });
    
    watch(()=>props.videoId, (newVideoId)=>{
        review.value.videoId = newVideoId;
    });
    
    const review = ref({
        userId: 'aabbc0908',
        videoId: props.videoId,
        content: '',
    });

    const registReview = function() {
        console.log(review.value);
        store.registReview(props.videoId, review.value);
        review.value.content = '';
    };

</script>

<style scoped>

</style>