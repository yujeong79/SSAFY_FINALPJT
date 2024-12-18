<template>
    <div class="modal-background">
        <p class="modal-alarm">목표 공유하기</p>
        <div class="modal-alarm-div-colum">
            <div>
                <img src="/src/assets/sharing_btn/kakao_btn.png" width="50" @click="sendKakao">
                <p>카카오톡</p>
            </div>

            <div>
                <img src="/src/assets/sharing_btn/x_btn.png" width="50" @click="sendX">
                <p>X</p>
            </div>
        </div>
        <div class="modal-alarm-div-colum">
            <input type="text" v-model="currUrl" readonly class="modal-share-copy">
            <button class="modal-share-regist-btn" @click="urlCopy">복사</button>
        </div>
    </div>
</template>

<script setup>
    import { ref, defineEmits } from 'vue';
    import { useGoalStore } from '@/stores/goal';
    import { useSharingStore } from '@/stores/sharing';

    const goalStore = useGoalStore();
    const store = useSharingStore();
    const emit = defineEmits(['close-share-modal']);
    
    // 클립보드에 복사하기
    const currUrl = ref(`http://localhost:5173/challenge/${goalStore.goal.email}`);
    const urlCopy = () => {
        navigator.clipboard.writeText(currUrl.value)
            .then(() => {
                alert("주소가 복사되었습니다!");
            })
            .catch((error) => {
                console.error("복사 실패: ", error);
                alert("주소 복사에 실패했습니다. 다시 시도해주세요.");
            });
    };

    // 카카오 공유하기
    const shareMessage = ref({
        title: `${goalStore.goal.name}님의 목표`,
        description: `${goalStore.goal.name}님에게 응원의 메시지를 남겨주세요!`,
        url: `http://localhost:5173/challenge/${goalStore.goal.email}`,
        imageUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.ssafy.com%2Fksp%2Fjsp%2Fswp%2FswpMain.jsp&psig=AOvVaw1JUSVWctHrhI7FGfwkr1sa&ust=1732324628301000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMjXsKPi7okDFQAAAAAdAAAAABAE',
    });
    const sendKakao = function() {
        emit('close-share-modal');
        store.sendKakao(shareMessage.value);
    }

    // X 공유하기
    const sendX = function() {
        store.sendX(shareMessage.value);
    }
</script>

<style scoped>

</style>