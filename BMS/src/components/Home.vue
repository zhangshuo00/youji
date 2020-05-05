<template>
    <div id="home">
        <Header></Header>
        <Sider></Sider>
        <router-view></router-view>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Sider from '@/components/Sider.vue'

export default {
    name: 'home',
    components: {
        "Header": Header,
        "Sider": Sider
    }
}
</script>

<style>

</style>