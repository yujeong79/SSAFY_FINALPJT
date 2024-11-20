
<template>
    <div>
        <header>
            <nav>
                <h1>SSAFIT</h1>
                <router-link :to="{name: 'ssafit'}">SSAFIT</router-link> |

                <!-- 챌린지 들어가면 챌린지 버튼 없어지기 비활성화 -->
                <router-link v-if="store.loginUser !== null && !hideChallenge" :to="{path: `/challenge/${store.loginUser.email}`}" class="challenge">CHALLENGE</router-link> |
                <img v-if="store.loginUser === null" @click="kakaoLogin" src="@/assets/kakao_login_medium_narrow.png" width="111">
                <div v-if="store.loginUser !== null">
                    <img :src="store.loginUser.profileImage">
                    <p>{{ store.loginUser.nickname }}님 반갑습니다.</p>
                    <button @click="logout">LOGOUT</button>
                </div>
            </nav>
        </header>

        <router-view></router-view>
    </div>
</template>

<script setup>
    import { defineProps } from 'vue';
    import { RouterLink, RouterView } from 'vue-router';
    import { useUserStore } from '@/stores/user';
    const store = useUserStore();

    const logout = function() {
        store.logout();
    }

    const kakaoLogin = function() {
        store.kakaoLogin();
    }

    // App.vue에서 내려준 hideChallenge 상태를 받아옵니다.
    defineProps({
    hideChallenge: {
    type: Boolean,
    default: false,
    },
    });

</script>

<style scoped>

</style>
