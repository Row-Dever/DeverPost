<template>
  <div>
    <h2>회원가입</h2>
    <form @submit.prevent="signup">
      <div>
        <label for="username">사용자명:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="email">이메일:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="password">비밀번호:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div>
        <label for="telephone">전화번호:</label>
        <input type="telephone" id="telephone" v-model="telephone" required />
      </div>
      <button type="submit">회원가입</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('')
const email = ref('')
const password = ref('')
const telephone = ref('')

const signup = async () => {
  try {
    const response = await fetch('http://localhost:8800/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username.value,
        email: email.value,
        password: password.value,
        telephone: telephone.value
      })
    })

    const data = await response.json()
    console.log(data) // 성공 또는 실패에 대한 응답 확인
  } catch (error) {
    console.error('Error:', error)
  }
}
</script>
