<template>
  <section class="text-xl">
    <Container>
      <Profile :user="loggedInUser" />
    </Container>
  </section>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { ref, onMounted } from 'vue'
import Profile from '../components/Profile.vue'

const userStore = useUserStore() // 사용자 스토어 사용

const loggedInUser = ref(null)

onMounted(async () => {
  try {
    // 사용자 스토어를 사용하여 로그인한 사용자 정보 가져오기
    const userData = userStore.loggedInUser
    if (userData) {
      // 사용자 정보 업데이트
      loggedInUser.value = {
        username: userData.username,
        email: userData.email,
        telephone: userData.telephone
      }
    } else {
      // 사용자 정보가 없을 경우 로그인 페이지로 리디렉션하거나, 다른 에러 처리 방식을 선택할 수 있습니다.
      console.error('로그인한 사용자 정보가 없습니다.')
    }
  } catch (error) {
    console.error('에러:', error)
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
