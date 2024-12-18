import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import router from '@/router';

const REST_API_URL = `http://localhost:8080/api-message`;

export const useMessageStore = defineStore('message', () => {
  const messages = ref({}); // day별 메시지 저장
  const currentMessage = ref(null); // 현재 선택된 메시지
  const errorMessage = ref("");

  const getMessage = async function (email, startDate, day) {
    try {
      const response = await axios.get(`${REST_API_URL}/open/${email}/${startDate}/${day}`);
      if (response.data !== '') {
        messages.value[day] = response.data; // day별 메시지 저장
        sessionStorage.setItem('messages', JSON.stringify(messages.value)); // 세션 스토리지 업데이트
      } else {
        messages.value[day] = null; // 메시지가 없을 경우 null 저장
      }
    } catch (error) {
      console.error(`Failed to fetch message for day ${day}:`, error);
      messages.value[day] = null; // 오류 발생 시 null 저장
    }
  };

  const registMessage = function(inputMessage) {
    console.log(inputMessage);
    axios({
      url: `${REST_API_URL}/message`,
      method: 'POST',
      data: inputMessage,
    })
      .then((response) => {
        console.log(response.data);
        const day = response.data.day;
        messages.value[day] = response.data; // 새로 등록된 메시지 저장
        currentMessage.value = response.data; // 현재 메시지 업데이트
        router.push({
          name: 'challenge',
          params: {email: inputMessage.receiver},
        });
      })
      .catch((error)=>{
          if (error.response && error.response.data && error.response.data.error) {
            errorMessage.value = error.response.data.error; // 서버에서 전달한 에러 메시지 저장
          } else {
            // 일반적인 에러 처리
            alert("메시지 등록에 실패하였습니다.");
          }
        });
  };

  const loadMessagesFromSession = function() {
    const storedMessages = JSON.parse(sessionStorage.getItem('messages'));
    if (storedMessages) {
      messages.value = storedMessages;
    }
  };

  // 초기화 시 세션 스토리지에서 메시지 로드
  loadMessagesFromSession();

  return {
    messages,
    currentMessage,
    errorMessage,
    getMessage,
    registMessage,
  };
});
