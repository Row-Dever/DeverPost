<template>
  <div v-if="postData.length === 0" class="mt-32 text-2xl text-center font-semibold">
    게시물 존재하지 않습니다.
  </div>
  <ul
    ref="listEl"
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 gap-y-4"
  >
    <template v-for="post in postData" :key="post.id"
      ><PostItem :post="post" :title="postData[0].title" />
    </template>
  </ul>
  <InfiniteLoading @infinite="infiniteHandler">
    <template #complete><span></span></template>
  </InfiniteLoading>
</template>

<script setup>
import { ref } from 'vue'
import InfiniteLoading from 'v3-infinite-loading'
import PostItem from '../PostItem/PostItem.vue'

import { instance } from '../../api/axiosBase'

const listEl = ref(null)
const postData = ref([])
const limit = 15
let cursorId

const infiniteHandler = async ($state) => {
  const { data: posts } = await instance.get(`/post/?limit=${limit}&cursorId=${cursorId}`)

  cursorId = posts.nextCursor
  postData.value.push(...posts.data)
  if (cursorId === null) {
    $state.complete()
  } else {
    $state.loaded()
  }
}
</script>
