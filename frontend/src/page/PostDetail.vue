<template>
  <section class="mt-24">
    <Container class="flex flex-col gap-6">
      <h2 class="text-3xl font-bold">{{ postData.title }}</h2>
      <div class="flex text-sm opacity-80 gap-3">
        <p>유저네임</p>
        <p>프로필 정보</p>
        <p>{{ formatDate(postData.created_at) }}</p>
      </div>
      <div class="ck-ck__content" v-html="postData.content"></div>
      <Button @click="onDeletePosthandler">게시물 삭제</Button>
      <Button @click="onPutPostHandler">게시물 수정</Button>
    </Container>
  </section>
</template>

<script setup>
import Container from '../components/common/Container/Container.vue'
import Button from '../components/common/Button/Button.vue'
import { formatDate } from '../utils/dateformat'

import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { instance } from '../api/axiosBase'

const route = useRoute()
const router = useRouter()
const postId = route.params.postId

const postData = ref({})
console.log(postData.value)

// 게시글 삭제 Handler
const onDeletePosthandler = async () => {
  const res = await instance.delete(`/post/${postId}`)
  if (res.status === 200) {
    router.replace('/')
  }
}

const onPutPostHandler = () => {
  router.push({
    name: 'newpost',
    params: { pk: postId }
  })
}

onMounted(async () => {
  const { data } = await instance.get(`/post/${postId}`)
  console.log(data)
  postData.value = data
})
</script>
