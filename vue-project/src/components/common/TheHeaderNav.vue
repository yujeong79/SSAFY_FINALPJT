<template>
    <div>
        <header>
            <nav>
                <h1>SSAFIT</h1>
                <router-link :to="{name: 'videoList'}">VIDEO</router-link> |
                <router-link v-if="store.loginUser"
                    :to="{name: 'challenge'}">CHALLENGE</router-link> |
                <router-link :to="{name: 'login'}" v-if="!store.loginUser">LOGIN</router-link>
                <img v-if="!store.loginUser" 
                    @click="kakaoLogin" 
                    src="@/assets/kakao_login_medium_narrow.png" width="111">
                    <div v-if="store.loginUser">
                        <img :src="store.loginUser.profileImage" alt="">
                        <p>{{ store.loginUser.nickname }}님 반갑습니다.</p>
                        <button @click="logout">LOGOUT</button>
                </div>
            </nav>
        </header>

        <router-view></router-view>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { RouterLink, RouterView } from 'vue-router';
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