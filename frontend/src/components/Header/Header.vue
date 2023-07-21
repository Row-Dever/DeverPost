<template>
  <nav class="w-full h-16 flex items-center justify-between">
    <RouterLink to="/" class="logo text-2xl font-bold p-2">TechBlog</RouterLink>
    <form @submit.prevent="searchSubmitHandler" class="flex justify-center flex-grow">
      <label htmlfor="search" className="ir">동영상 검색</label>
      <input
        type="text"
        id="search"
        className="w-6/12 h-full p-2 rounded-l-3xl outline-none text-gray-500 border-2"
        placeholder="검색"
        :value="searchKeyword"
        @input="onKeywordHandler"
      />
      <button className="bg-gray-300 pl-4 pr-4 rounded-r-3xl">
        <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
      </button>
    </form>
    <Button v-if="!isUser">로그인</Button>
    <div v-else class="flex gap-2">
      <Button :on-click="goNewPostHandler">게시글작성하기</Button>
      <Button :on-click="goMypageHandler">마이페이지</Button>
      <Button :on-click="onLoginHandler">로그인</Button>
      <Button :on-click="onSignupHandler">회원가입</Button>
      <Button :on-click="onLoginHandler">로그아웃</Button>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router'
import Button from '../common/Button/Button.vue'
import { ref } from 'vue'

const isUser = ref(true)
const searchKeyword = ref('')
const router = useRouter()

const onKeywordHandler = (event) => {
  searchKeyword.value = event.target.value
}

const goNewPostHandler = () => {
  router.push('/newpost')
}

const onLoginHandler = () => {
  router.push('/login')
}

const onSignupHandler = () => {
  router.push('/signup')
}

const goMypageHandler = () => {
  router.push('/mypage')
}

const searchSubmitHandler = () => {
  if (searchKeyword.value.trim() === '') {
    searchKeyword.value = ''
  }
  router.push(`/?keyword=${searchKeyword.value}`)
}
</script>
