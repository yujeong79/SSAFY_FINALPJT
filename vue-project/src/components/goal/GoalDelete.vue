<template>
    <div class="modal-background">
        <p class="modal-alarm">목표 삭제 시 관련된 메시지도 함께 삭제됩니다.</p>
        <p class="modal-alarm">목표를 삭제하시겠습니까?</p>
        
        <div id="modal-alarm-btns">
            <button @click="deleteGoal" class="modal-regist-btn">목표 삭제</button>
            <button @click="cancelModal" class="modal-regist-btn" id="modal-alarm-btns-cancel">취소</button>
        </div>
    </div>
</template>

<script setup>
    import { useRoute } from 'vue-router';
    import { useGoalStore } from '@/stores/goal';
    import { defineEmits } from 'vue';

    const route = useRoute();
    const store = useGoalStore();
    const emit = defineEmits(['close-modal']);

    const deleteGoal = function() {
        store.deleteGoal(route.params.email);
    };

    const cancelModal = () => {
        emit('close-modal'); // 부모 컴포넌트에 이벤트 전달
    };

</script>

<style scoped>

</style>