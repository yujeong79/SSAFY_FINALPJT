<template>
    <div class="modal-background">
        <p class="modal-alarm">로그인</p>
        <p>로그인하고 익명의 응원 메시지를 남겨 보세요!</p>
        <img class="login-btn" 
            v-if="store.loginUser === null" @click="kakaoLogin" src="@/assets/kakao_login_medium_narrow.png" width="111">
    </div>
</template>

<script setup>
    import { useUserStore } from '@/stores/user';
    const store = useUserStore();

    const logout = function() {
        store.logout();
    }

    const kakaoLogin = function() {
        store.kakaoLogin();
    }
</script>

<style scoped>

</style>