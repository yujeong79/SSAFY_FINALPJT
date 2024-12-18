import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

const REST_API_URL = `http://localhost:8080/api-goal/goal`;

export const useGoalStore = defineStore('goal', () => {
  const goal = ref(JSON.parse(sessionStorage.getItem('goal')) || null);
  // const goal = ref(null);
  
  const getGoal = function(email) {
    console.log("getGoal 호출됨, email:", email);
    console.trace();
    if (!email) {
      console.error("getGoal 호출 실패: email is undefined");
      return; // email이 없으면 실행 중단
    }

    axios({
      url: REST_API_URL + "/" + email,
      method: 'GET'
    })
    .then((response)=>{
      goal.value = response.data;
      sessionStorage.setItem('goal', JSON.stringify(goal.value));
    })
    .catch(()=>{
      console.log("사용자 goal 가져오기 에러 발생")
    })
  };

  const registGoal = function(goal) {
    axios({
      url: REST_API_URL,
      method: 'POST',
      data: goal
    })
    .then((response)=>{
      console.log(response.data);
      router.push({name: 'challenge', params:{email: goal.email}});
      window.location.reload();
    })
    .catch(()=>{
      console.log("등록 에러 발생")
    })
  };

  const updateGoal = function() {
    axios({
      url: REST_API_URL,
      method: 'PUT',
      data: goal.value
    })
    .then((response)=>{
      router.push({name: 'challenge', params:{email: goal.email}});
      window.location.reload();
    }) 
    .catch(()=>{
      console.log("goal 수정 에러")
    })
  };

  const deleteGoal = function(email) {
    axios({
      url: REST_API_URL + "/" + email,
      method: 'DELETE'
    })
    .then(()=>{
      router.push({name: 'challenge', params:{email: email}});
      window.location.reload();
    })
    .catch(()=>{
      console.log("goal 삭제 에러")
    })
  }

  return {
    goal,
    getGoal,
    registGoal,
    updateGoal,
    deleteGoal,
  };
})
