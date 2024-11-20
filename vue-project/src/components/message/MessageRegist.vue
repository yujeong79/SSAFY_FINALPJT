<template>
    <div>
        <fieldset>
            <div>
                <label for="senderNickname">from</label>
                <input type="text" id="senderNickname" v-model="message.senderNickname">
            </div>
            <div>
                <label for="content">내용</label>
                <input type="text" id="content" v-model="message.content">
            </div>
            <div class="sticker-container">
                <img v-for="id in stickers" :key="id" 
                    :src="`/src/assets/sticker/sticker${id}.png`" 
                    :class="{ selected: message.stickerId === id }"
                    @click="selectSticker(id)"
                    >
            </div>
            <div>
                <button @click="registMessage">등록</button>
            </div>
        </fieldset>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { useGoalStore } from '@/stores/goal';
    import { useUserStore } from '@/stores/user';
    import { useMessageStore } from '@/stores/message';

    const goalStore = useGoalStore();
    const userStore = useUserStore();
    const store = useMessageStore();
    const route = useRoute();

    const props = defineProps({
        day: Number,
    });

    const stickers = [1, 2, 3, 4]; // 스티커 ID 배열

    const selectSticker = (id) => {
        message.value.stickerId = id;
    };

    const message = ref({
        receiver: route.params.email,
        sender: userStore.loginUser.email,
        senderNickname: '',
        goalId: goalStore.goal.goalId,
        content: '',
        day: props.day,
        stickerId: ''
    });

    const registMessage = function() {
        console.log(message.value);
        store.registMessage(message.value);
    }

</script>

<style scoped>
    .sticker-container img {
    width: 100px;
    height: 100px;
    margin: 10px;
    border: 2px solid transparent; /* 기본 테두리 없음 */
    cursor: pointer;
    transition: border 0.3s ease;
    }

    .sticker-container img:hover {
    border: 2px solid #ccc; /* 호버 시 연한 테두리 */
    }

    .sticker-container img.selected {
    border: 2px solid #007BFF; /* 선택된 이미지의 테두리 */
    border-radius: 5px; /* 둥근 모서리 */
    }
</style>