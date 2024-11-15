<template>
    <div>
        <h2>로그인</h2>
        <fieldset>
            <div>
                <label for="userId">아이디</label>
                <input type="text" id="userId" v-model="user.userId">
            </div>
            <div>
                <label for="password">비밀번호</label>
                <input type="text" id="password" v-model="user.password">
            </div>
            <div>
                <button @click="login">로그인</button>
                회원가입
            </div>
        </fieldset>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { useUserStore } from '@/stores/user';

    const store = useUserStore();
    
    const user = ref({
        userId: '',
        password: ''
    });

    const login = function() {
        store.login(user.value);
    };

</script>

<style scoped>

</style>