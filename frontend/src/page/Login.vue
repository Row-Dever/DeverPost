<template>
  <div class="mt-32">
    <h2 class="ir">로그인</h2>
    <form @submit.prevent="login" class="flex flex-col justify-center items-center gap-6">
      <Input label="이메일" type="email" id="email" v-model="email" required />
      <Input
        type="password"
        id="password"
        label="비밀번호"
        v-model="password"
        minlength="4"
        maxlength="12"
        required
      />
      <Button size="lg">로그인</Button>
    </form>
    <teleport to="body">
      <div v-if="showNotification" class="notification">
        {{ notificationMessage }}
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import Input from '../components/common/Input/Input.vue'
import Button from '../components/common/Button/Button.vue'

const email = ref('')
const password = ref('')
const showNotification = ref(false)
const notificationMessage = ref('')
const router = useRouter()

const userStore = useUserStore() // 유저 스토어 사용

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
      // localStorage.setItem('user', JSON.stringify(data.result)) // 유저 데이터를 localStorage에 저장
      userStore.loginSuccess(data.user, data.accessToken, data.refreshToken)
      // 로그인 성공 시 마이페이지로 이동
      router.push('/mypage')
      // result.value = data.result
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
