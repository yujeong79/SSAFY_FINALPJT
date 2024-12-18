import { ref, onMounted } from 'vue';
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

        // 사용자 정보 요청 및 sessionStorage에 저장
        fetchUserInfo();
      },
      fail: function (error) {
        console.error('카카오 로그인 실패:', error);
      },
    });
  };

  // 사용자 정보 요청 및 sessionStorage, loginUser 업데이트
  const fetchUserInfo = () => {
    if (typeof window.Kakao === 'undefined') {
      console.error('Kakao SDK is not loaded');
      return;
    }

    const token = sessionStorage.getItem('access-token');
    if (!token) {
      console.log('Access token not found in sessionStorage.');
      return;
    }

    // 사용자 정보 요청
    window.Kakao.API.request({
      url: '/v2/user/me',
      success: (res) => {
        console.log('사용자 정보:', res);
        const { profile, email } = res.kakao_account;

        // 사용자 정보를 sessionStorage에 저장
        const userInfo = {
          nickname: profile.nickname, // 프로필 닉네임
          profileImage: profile.profile_image_url, // 프로필 이미지 URL
          email: email, // 이메일
        };

        sessionStorage.setItem('user-info', JSON.stringify(userInfo));

        // 사용자 정보를 loginUser에 저장
        loginUser.value = userInfo;

        console.log('loginUser:', loginUser.value);
      },
      fail: (error) => {
        console.error('사용자 정보 요청 실패:', error);
        logout(); // 유효하지 않은 토큰이면 로그아웃 처리
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
        sessionStorage.removeItem('user-info');
      });
    }
  };

  // 페이지 로드 시 sessionStorage에서 사용자 정보 복구
  const initializeUser = () => {
    const token = sessionStorage.getItem('access-token');
    const userInfo = sessionStorage.getItem('user-info');

    if (token && userInfo) {
      console.log('Access token and user info found in sessionStorage.');
      loginUser.value = JSON.parse(userInfo); // sessionStorage의 정보를 loginUser에 저장
    } else {
      console.log('No access token or user info in sessionStorage.');
      loginUser.value = null;
    }
  };

  // Vue 컴포넌트 마운트 시 사용자 정보 초기화
  onMounted(() => {
    initializeKakao();
    initializeUser();
  });

  return {
    loginUser,
    initializeKakao,
    kakaoLogin,
    logout,
    initializeUser,
  };
});