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
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')

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
      // 예를 들어 로그인 성공 시 홈 페이지로 이동하도록 할 수 있습니다.
    } else {
      console.error(data.message)
    }
  } catch (error) {
    console.error('Error:', error)
  }
}
</script>
