<template>
    <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
            <slot></slot> <!-- 모달의 내용을 여기 삽입 -->
            <button class="close-button" @click="closeModal">닫기</button>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    isOpen: Boolean, // 모달 열림/닫힘 상태
});

const emit = defineEmits(['close']); // 모달 닫기 이벤트 발생
const closeModal = () => emit('close');
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}
.modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 80%;
    max-width: 500px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    z-index: 1001;
}
.close-button {
    margin-top: 10px;
    padding: 5px 10px;
    background: red;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
</style>
