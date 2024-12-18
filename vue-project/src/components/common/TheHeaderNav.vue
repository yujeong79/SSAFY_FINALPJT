
<template>
    <div>
        <header>
            <nav>
                <div class="header-layout">
                    <!-- 로그아웃일때 -->
                    <img v-if="store.loginUser === null" @click="kakaoLogin" src="@/assets/kakao_login_medium_narrow.png" class="header-login-btn">
                    <!-- 로그인 성공했을때 -->
                    <div v-if="store.loginUser !== null" class="header-login-container">
                        <img :src="store.loginUser.profileImage" class="header-kakao-img"> 
                        <p class="header-login-word">{{ store.loginUser.nickname }}님 반갑습니다.</p>
                        <button @click="logout" class="header-logout-btn">LOGOUT</button>
                    </div>
                    <!-- 검색했을때 메인 싸핏 -->
                    <router-link :to="{name: 'ssafit'}" v-if="!isMain" class="header-ssafit-video-btn">SSAFIT</router-link> 
                </div>

                <!-- 검색안했을때 메인 싸핏 -->
                <div v-if="isMain" class="main-ssafit-container">
                    <div class="header-ssafit-main-btn">SSAFIT</div>
                    <div class="help-challenge"> 내 챌린지를 도와줘 !</div>
                </div>

                <!-- 챌린지 들어가면 챌린지 버튼 없어지기 비활성화 -->
                <div v-if="store.loginUser !== null && !isChallengeView" class="button-goal-container">
                    <div class="font-charcol-color margin-top-04" style="font-size: 12px;">CHALLENGE</div>
                    <router-link  :to="{path: `/challenge/${store.loginUser.email}`}" class="challenge-btn">
                        <img src="@/assets/img/fire.png" class="challenge-btn-img-container">
                    </router-link> 
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

    // App.vue에서 내려준 hideChallenge, isMain 상태를 받아옵니다.
    defineProps({
    isChallengeView: {
    type: Boolean,
    default: false,
    },

    // Main인지 확인하는 변수
    isMain:{
        type:Boolean,
        default: false,
    },
    });

</script>

<style scoped>
/*헤더 메인 요소 */
.header-ssafit-main-btn {
    position: relative;
    text-align: center;
    font-family: 'LotteHappyBold';
    font-size: 45px;
    color: rgb(65, 88, 139);
  }
  

.help-challenge {
    position: relative;

    font-size: 15px;
    text-align: center;
    font-family: 'AppleRegular';
    color: gray;
}

.main-ssafit-container {
    position: absolute; /* 부모 요소(.phone-box)를 기준으로 위치 설정 */

    display: flex;
    flex-direction: column;

    top: 48%; /* 부모의 높이의 50% 지점 */
    left: 50%; /* 부모의 너비의 50% 지점 */
    transform: translate(-50%, -50%); /* 정확히 중앙 정렬 */
}

</style>
