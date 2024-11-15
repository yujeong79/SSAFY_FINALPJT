import { ref, computed, watch } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import router from '@/router';

const REST_API_URL = `http://localhost:8080/api-user/user`;

export const useUserStore = defineStore('user', () => {
    const msg = ref('');
    const loginUser = ref(null);

    // 사용자 초기화 함수: 세션에서 토큰 확인 후 사용자 정보 설정
    const initializeUser = () => {
        const accessToken = sessionStorage.getItem('access-token');
        if (accessToken) {
            const token = accessToken.split('.');
            const base64 = token[1].replace(/-/g, '+').replace(/_/g, '/');
            const decodedData = new TextDecoder().decode(Uint8Array.from(atob(base64), c => c.charCodeAt(0)));
            const payload = JSON.parse(decodedData);

            loginUser.value = {
                name: payload['name'],
                userId: payload['userId']
            };
        } else {
            loginUser.value = null;
        }
    };

    // 로그인 함수
    const login = function(user) {
        axios({
            url: REST_API_URL + "/login",
            method: 'POST',
            data: user
        })
        .then((response) => {
            sessionStorage.setItem('access-token', response.data['access-token']);
            initializeUser(); // 로그인 후 사용자 정보 초기화
            msg.value = '로그인';
            router.push({ name: 'success' });
        })
        .catch(() => {
            console.log("로그인 에러 발생");
        });
    };

    // 로그아웃 함수
    const logout = function() {
        sessionStorage.removeItem('access-token');
        loginUser.value = null; // 로그아웃 시 사용자 정보 초기화
        msg.value = '로그아웃';
        router.push({ name: 'success' });
    };

    // 세션 토큰 변경 시 로그인 상태 업데이트
    watch(
        () => sessionStorage.getItem('access-token'),
        (newToken, oldToken) => {
            if (newToken !== oldToken) {
                initializeUser();
            }
        }
    );

    // 앱 시작 시 사용자 초기화 실행
    initializeUser();

    return { 
        loginUser,
        login,
        logout,
    };
});
