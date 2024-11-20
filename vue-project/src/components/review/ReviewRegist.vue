<template>
    <div>
        <fieldset>
            <legend>리뷰 등록</legend>
            <div>
                <label for="content">내용</label>
                <textarea 
                    v-model="review.content" 
                    id="content" 
                    rows="5" 
                    cols="30" 
                    maxlength="200"
                    @keyup.enter="registReview">
                </textarea>
                <p>{{ review.content.length }}/200</p>
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
    import { useUserStore } from '@/stores/user';

    const store = useReviewStore();
    const userStore = useUserStore();

    const props = defineProps({
        videoId: String,
    });
    
    watch(()=>props.videoId, (newVideoId)=>{
        review.value.videoId = newVideoId;
    });
    
    const review = ref({
        email: userStore.loginUser.email,
        nickname: userStore.loginUser.nickname,
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