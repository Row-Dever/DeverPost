<template>
  <section class="mt-24">
    <Container class="flex flex-col gap-6">
      <h2 class="text-3xl font-bold">{{ postData.title }}</h2>
      <div class="flex text-sm opacity-80 gap-3">
        <p>
          작성자 <strong>{{ postData.username }}</strong>
        </p>
        <p>{{ formatDate(postData.created_at) }} 작성</p>
      </div>
      <div class="ck-ck__content border-t-2 border-gray-200" v-html="postData.content"></div>
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

// 게시글 삭제 Handler
const onDeletePosthandler = async () => {
  const res = await instance.delete(`/post/${postId}`)
  if (res.status === 200) {
    router.replace('/')
  }
}

// 게시글 업데이트를 하기 위해 pk를 가지고 newpost페이지로 이동
const onPutPostHandler = () => {
  router.push({
    name: 'newpost',
    params: { pk: postId }
  })
}

onMounted(async () => {
  const { data } = await instance.get(`/post/${postId}`)
  postData.value = data
})
</script>
