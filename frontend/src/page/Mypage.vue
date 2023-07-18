<template>
  <section class="text-xl">
    <Container>
      <Profile :state="state" />
    </Container>
  </section>
</template>

<script setup>
import Container from '../components/common/Container/Container.vue'
import Profile from '../components/Profile.vue'
import axios from 'axios'
import { ref } from 'vue'
// state 안에 유저 정보의 기본 값 세팅, 데이터를 받아오지 못하면 공백으로 보여짐.
const state = ref({
  username: '',
  email: '',
  password: '',
  telephone: ''
})
// axios를 활용해 마이페이지에서 Profile.vue에게 데이터를 보냄.
axios.get('/user/myinfo').then((res) => {
  // axios.get()을 이용해 데이터를 받아옴.
  state.value = res.data.data[0]
})
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
