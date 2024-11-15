import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  const loginUser = ref(null);

  // 카카오 SDK 초기화
  const initializeKakao = () => {
    if (typeof window.Kakao !== 'undefined' && !window.Kakao.isInitialized()) {
      window.Kakao.init('c089c8172def97eb00c07217cae17495'); // JavaScript 키 입력
      console.log('Kakao SDK Initialized');
    }
  };

  // 카카오 로그인
  const kakaoLogin = () => {
    if (typeof window.Kakao === 'undefined') {
      console.error('Kakao SDK is not loaded');
      return;
    }

    window.Kakao.Auth.login({
      scope: 'profile_nickname, profile_image, account_email', // 필요한 동의 항목
      success: function (authObj) {
        console.log('카카오 로그인 성공:', authObj);

        // access-token을 sessionStorage에 저장
        sessionStorage.setItem('access-token', authObj.access_token);

        // 사용자 정보 요청
        window.Kakao.API.request({
          url: '/v2/user/me',
          success: (res) => {
            console.log('사용자 정보:', res);
            const { profile, email } = res.kakao_account;

            // 사용자 정보를 loginUser에 저장
            loginUser.value = {
              nickname: profile.nickname, // 프로필 닉네임
              profileImage: profile.profile_image_url, // 프로필 이미지 URL
              email: email, // 이메일
            };

            console.log('loginUser:', loginUser.value);
          },
          fail: (error) => {
            console.error('사용자 정보 요청 실패:', error);
          },
        });
      },
      fail: function (error) {
        console.error('카카오 로그인 실패:', error);
      },
    });
  };

  // 로그아웃
  const logout = () => {
    if (typeof window.Kakao === 'undefined') {
      console.error('Kakao SDK is not loaded');
      return;
    }

    if (window.Kakao.Auth.getAccessToken()) {
      window.Kakao.Auth.logout(() => {
        console.log('카카오 로그아웃 완료');
        loginUser.value = null;
        sessionStorage.removeItem('access-token');
      });
    }
  };

  return {
    loginUser,
    initializeKakao,
    kakaoLogin,
    logout,
  };
});


// import { ref, computed, watch } from 'vue';
// import { defineStore } from 'pinia';
// import axios from 'axios';
// import router from '@/router';

// const REST_API_URL = `http://localhost:8080/api-user/user`;

// export const useUserStore = defineStore('user', () => {
//     const msg = ref('');
//     const loginUser = ref(null);

//     // 사용자 초기화 함수: 세션에서 토큰 확인 후 사용자 정보 설정
//     const initializeUser = () => {
//         const accessToken = sessionStorage.getItem('access-token');
//         if (accessToken) {
//             const token = accessToken.split('.');
//             const base64 = token[1].replace(/-/g, '+').replace(/_/g, '/');
//             const decodedData = new TextDecoder().decode(Uint8Array.from(atob(base64), c => c.charCodeAt(0)));
//             const payload = JSON.parse(decodedData);

//             loginUser.value = {
//                 name: payload['name'],
//                 userId: payload['userId']
//             };
//         } else {
//             loginUser.value = null;
//         }
//     };

//     // 로그인 함수
//     const login = function(user) {
//         axios({
//             url: REST_API_URL + "/login",
//             method: 'POST',
//             data: user
//         })
//         .then((response) => {
//             sessionStorage.setItem('access-token', response.data['access-token']);
//             initializeUser(); // 로그인 후 사용자 정보 초기화
//             msg.value = '로그인';
//             router.push({ name: 'success' });
//         })
//         .catch(() => {
//             console.log("로그인 에러 발생");
//         });
//     };

//     // 로그아웃 함수
//     const logout = function() {
//         sessionStorage.removeItem('access-token');
//         loginUser.value = null; // 로그아웃 시 사용자 정보 초기화
//         msg.value = '로그아웃';
//         router.push({ name: 'success' });
//     };

//     // 세션 토큰 변경 시 로그인 상태 업데이트
//     watch(
//         () => sessionStorage.getItem('access-token'),
//         (newToken, oldToken) => {
//             if (newToken !== oldToken) {
//                 initializeUser();
//             }
//         }
//     );

//     // 앱 시작 시 사용자 초기화 실행
//     initializeUser();

//     const kakaoLogin = function() {
//         window.Kakao.Auth.login({
//           scope: 'profile_nickname, profile_image, account_email',
//           success: function(authObj) {
//             console.log(authObj);
//             window.Kakao.API.request({
//               url: '/v2/user/me',
//               success: res => {
//                 const kakao_account = res.kakao_acount;
//                 console.log(kakao_account);
//               }
//             });
//           }
//         });
//       };

//     return { 
//         loginUser,
//         login,
//         logout,
//         kakaoLogin,
//     };
// });
