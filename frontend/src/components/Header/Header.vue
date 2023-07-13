<template>
  <nav class="w-full h-16 flex items-center justify-between">
    <RouterLink to="/" class="logo text-2xl font-bold p-2">TechBlog</RouterLink>
    <Button v-if="!isUser">로그인</Button>
    <div v-else class="flex gap-2">
      <Button :on-click="goNewPostHandler">게시글작성하기</Button>
      <Button :on-click="onLoginHandler">로그아웃</Button>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router'
import Button from '../common/Button/Button.vue'
import { ref } from 'vue'

const isUser = ref(true)

const router = useRouter()

const goNewPostHandler = () => {
  router.push('/newpost')
}
</script>
