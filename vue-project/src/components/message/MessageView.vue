<template>
    <div class="message-container">
        <p class="header-font-family">응원의 한마디 남기기</p>
        <div class="week-container"> 
            <span> 일 </span> 
            <span> 월 </span> 
            <span> 화 </span> 
            <span> 수 </span> 
            <span> 목 </span> 
            <span> 금 </span> 
            <span> 토 </span> 
        </div>
        
        <MessageList/>
    </div>
</template>

<script setup>
    import MessageList from './MessageList.vue';
</script>

<style scoped>


</style>