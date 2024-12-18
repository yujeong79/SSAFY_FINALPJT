<template>
    <div id="modal-user-input">
        <div>
            <label for="senderNickname" class="modal-alarm">From</label>
            <input type="text" id="senderNickname" v-model="message.senderNickname" placeholder=" 닉네임 입력" class="modal-input">
        </div>
            <label for="content" class="modal-alarm">내용</label>
            <textarea 
                v-model="message.content" 
                id="content" 
                rows="10" 
                cols="30" 
                maxlength="500"
                placeholder=" 내용 입력"
                class="modal-textarea"
                >
            </textarea>
            <p class="textarea-content-length">{{ message.content.length }}/500</p>

        <p class="modal-alarm">스티커 선택</p>
        <div id="sticker-container">
            <img v-for="id in stickers" :key="id" 
                :src="`/src/assets/sticker/sticker${id}.png`" 
                :class="{ selected: message.stickerId === id }"
                @click="selectSticker(id)"
                >
        </div>
        <div id="modal-alarm-btns">
            <button @click="triggerConfirm" class="modal-regist-btn">등록</button>
        </div>
    </div>
</template>

<script setup>
    import { ref, defineEmits } from 'vue';
    import { useRoute } from 'vue-router';
    import { useGoalStore } from '@/stores/goal';
    import { useUserStore } from '@/stores/user';

    const goalStore = useGoalStore();
    const userStore = useUserStore();
    const route = useRoute();
    const emit = defineEmits(['open-confirm-modal']);

    const props = defineProps({
        day: Number,
    });

    const stickers = [1, 2, 3, 4, 5]; // 스티커 ID 배열

    const selectSticker = (id) => {
        message.value.stickerId = id;
    };

    const message = ref({
        receiver: route.params.email,
        sender: '',
        senderNickname: '',
        goalId: goalStore.goal.goalId,
        content: '',
        day: props.day,
        stickerId: ''
    });

    const triggerConfirm = function() {
        message.value.sender = userStore.loginUser.email;
        emit('open-confirm-modal', message.value);
    }

</script>

<style scoped>


</style>