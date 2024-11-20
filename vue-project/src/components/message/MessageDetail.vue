<template>
    <div>
        <p>
            From. {{ props.message.senderNickname }}
        </p>
        <p>
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
