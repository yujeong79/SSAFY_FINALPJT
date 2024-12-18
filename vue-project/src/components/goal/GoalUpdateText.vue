<template>
    <div id="modal-user-input">
        <p class="modal-alarm">한마디를 적어주세요!</p>
        <textarea type="text" rows="10" 
                cols="30" v-model="text" class="modal-textarea"></textarea>
        <div id="modal-alarm-btns">
        <button @click="updateText" class="modal-regist-btn">저장</button>
        </div>
    </div>
</template>

<script setup>
    import { ref, watch, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import { useGoalStore } from '@/stores/goal';

    const store = useGoalStore();
    const route = useRoute();

    const text = ref(store.goal.text);
    watch(()=>store.goal.text, (newText)=>{
        text.value = newText;
    });

    onMounted(()=>{
        store.getGoal(route.params.email);
    });

    const updateText = function() {
        if(text.value !== store.goal.text) {
            store.goal.text = text.value;
        }
        store.updateGoal();
    };

</script>

<style lang="scss" scoped>

</style>