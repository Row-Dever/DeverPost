<template>
  <section class="text-xl">
    <Container>
      <Profile :state="user" />
    </Container>
  </section>
</template>

<!-- <script setup>
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
</script> -->

<script setup>
import { ref, onMounted } from 'vue'
import Profile from '../components/Profile.vue'

const user = ref({
  username: '',
  email: '',
  password: '',
  telephone: ''
})

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:8800/user/myinfo', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
      // 로그인 시 저장한 토큰을 헤더에 추가하는 등의 인증 방식을 사용하면 더욱 안전합니다.
    })

    const data = await response.json()
    console.log(data) // 서버로부터 받은 사용자 정보 확인

    if (data.success) {
      // 사용자 정보 업데이트
      user.value = {
        username: data.username,
        email: data.email,
        password: data.password,
        telephone: data.telephone
      }
    } else {
      // 사용자 정보를 가져오는 데 실패한 경우, 로그인 페이지로 이동 또는 다른 에러 처리 방식을 선택할 수 있습니다.
    }
  } catch (error) {
    console.error('Error:', error)
  }
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
