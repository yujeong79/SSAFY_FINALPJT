<template>
    <div id="message-detail-background">
        <p class="modal-alarm">
            From. {{ props.message.senderNickname }}
        </p>
        <p id="message-detail-content">
            {{ props.message.content }}
        </p>
    </div>
</template>

<script setup>

    const props = defineProps({
        message: Object,
    });

</script>

<style scoped>
/* 필요에 따라 스타일 추가 */
</style>
