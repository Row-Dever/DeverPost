<template>
  <div>
    <h2>회원가입</h2>
    <form @submit.prevent="signup">
      <div>
        <label for="username">사용자명:</label>
        <input type="text" id="username" v-model="username" pattern="[가-힣a-zA-Z\s]+" required />
        <!-- pattern="[가-힣a-zA-Z\s]+"로 설정하여 한글, 영문, 공백만 입력 가능하도록 함 -->
      </div>
      <div>
        <label for="email">이메일:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="password">비밀번호:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          minlength="4"
          maxlength="12"
          required
        />
        <!-- minlength="4"와 maxlength="12"로 비밀번호 글자 수 제한 -->
      </div>
      <div>
        <label for="telephone">전화번호:</label>
        <input
          type="tel"
          id="telephone"
          v-model="telephone"
          pattern="[0-9]{3}-[0-9]{3,4}-[0-9]{4}"
          required
        />
        <!-- pattern="[0-9]{3}-[0-9]{3,4}-[0-9]{4}"로 설정하여 전화번호 형식 XXX-XXX-XXXX 또는 XXX-XXXX-XXXX로 표시 -->
      </div>
      <button type="submit">회원가입</button>
    </form>
    <teleport to="body">
      <div v-if="showNotification" class="notification">
        {{ notificationMessage }}
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { getCurrentInstance } from 'vue'

const username = ref('')
const email = ref('')
const password = ref('')
const telephone = ref('')
const showNotification = ref(false)
const notificationMessage = ref('')
const router = useRouter()

const signup = async () => {
  // const instance = getCurrentInstance()
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

    if (data.success) {
      // 회원가입 성공 시 알림 띄우기
      showNotification.value = true
      notificationMessage.value = '회원가입이 성공적으로 완료되었습니다.'

      // 2초 후 알림 숨기기
      setTimeout(() => {
        showNotification.value = false
      }, 2000)

      // // 로그인 페이지로 이동
      router.push('/login')
    }
  } catch (error) {
    console.error('Error:', error)
  }
}
</script>

<style>
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}
</style>
