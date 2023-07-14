<template>
  <section class="text-xl">
    <Container>
      <form @submit.prevent="submitForm">
        <div>
          <label for="email">email</label>
          <input type="text" id="email" v-model="email" />
        </div>
        <div>
          <label for="name">성함</label>
          <input type="text" id="name" v-model="name" />
        </div>
        <div>
          <label for="number">전화번호</label>
          <input type="text" id="number" v-model="number" />
        </div>
        <div>
          <label for="password">비밀번호</label>
          <input type="password" id="password" v-model="password" />
        </div>
        <button type="submit">회원가입</button>
      </form>
    </Container>
  </section>
</template>

<script setup>
import Container from '../components/common/Container/Container.vue'
</script>
