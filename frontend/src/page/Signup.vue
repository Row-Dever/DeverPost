<template>
  <section class="text-xl">
    <Container>
      <h4>정말로 회원가입하시겠습니까?</h4>
      <button @click="OnModal = true">네</button>
      <button @click="OnModal = false">아니오</button>
      <div class="black-bg" v-if="OnModal == true">
        <div class="white-bg">
          <h1>사용자 정보를 입력하세요.</h1>
          <div class="input_row">
            <label for="id">아이디</label>
            <input type="text" id="id" v-model="user.userid" />
          </div>
          <div class="input_row">
            <label for="name">이름</label>
            <input type="text" id="name" v-model="user.name" />
          </div>
          <div class="input_row">
            <label for="password">비밀번호</label>
            <input type="password" id="password" v-model="user.password" />
          </div>

          <button :click="signUp">가입하기</button>
          <button @click="OnModal = false">닫기</button>
        </div>
      </div>
    </Container>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import Button from '../components/common/Button/Button.vue'

const OnModal = ref(false)

const user = ref({
  userid: '',
  name: '',
  password: ''
})

const signUp = () => {
  if (!user.value.userid || !user.value.name || !user.value.password) {
    alert('모든 필드를 입력해주세요.')
    return
  }

  // Call API to sign up the user
  // Assuming that 'this.$http.post' is replaced with a proper HTTP request using the 'fetch' or other libraries.
  fetch('/api/users/signUp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user: user.value })
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success === true) {
        alert(data.message)
        // Redirect to login page on successful signup
        // Assuming 'this.$router.push' is replaced with a proper router navigation method.
        // this.$router.push('/login');
      } else {
        alert(data.message)
      }
    })
    .catch(() => {
      alert('error')
    })
}
</script>

<style>
body {
  margin: 0;
}
div {
  box-sizing: border-box;
}
.black-bg {
  width: 100%;
  height: 100%;
  background: rgba(243, 157, 75, 0.3);
  position: fixed;
  padding: 20px;
}
.white-bg {
  width: 100%;
  background: white;
  border-radius: 8px;
  padding: 20px;
}
</style>
