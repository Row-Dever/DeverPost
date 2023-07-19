<template>
  <div>
    <h2>로그인</h2>
    <form @submit.prevent="login">
      <div>
        <label for="email">이메일:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="password">비밀번호:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">로그인</button>
    </form>
    <teleport to="body">
      <div v-if="showNotification" class="notification">
        {{ notificationMessage }}
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const loggedInUser = ref(null)
const showNotification = ref(false)
const notificationMessage = ref('')
const router = useRouter()
const login = async () => {
  try {
    const response = await fetch('http://localhost:8800/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })

    const data = await response.json()
    if (data.success) {
      console.log('로그인 성공!')
      // 로그인 성공 시 홈 페이지로 이동
      loggedInUser.value = data.user
      router.push('/mypage')
    } else {
      // 로그인 실패 시 알림 띄우기
      showNotification.value = true
      notificationMessage.value = '이메일 또는 비밀번호가 일치하지 않습니다.'
      setTimeout(() => {
        showNotification.value = false
      }, 5000)
    }
  } catch (error) {
    console.error('Error:', error)
  }
}
</script>
