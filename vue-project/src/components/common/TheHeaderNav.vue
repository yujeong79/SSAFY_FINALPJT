<template>
    <div>
        <header>
            <nav>
                <h1>SSAFIT</h1>
                <router-link :to="{name: 'videoList'}">VIDEO</router-link> |
                <router-link :to="{name: 'challenge'}">CHALLENGE</router-link>
            </nav>
        </header>

        <router-view></router-view>
    </div>
</template>

<script setup>
    import { RouterLink, RouterView } from 'vue-router';
</script>

<style scoped>

</style>