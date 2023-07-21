<template>
  <div
    v-if="message === '원하는 데이터를 찾지 못했습니다.'"
    class="mt-32 text-2xl text-center font-semibold"
  >
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
  <InfiniteLoading
    :identifier="infiniteId"
    @infinite="infiniteHandler"
    spinner="waveDots"
    distance="10"
  >
    <template #complete><span></span></template>
  </InfiniteLoading>
</template>

<script setup>
import { ref, watch } from 'vue'
import InfiniteLoading from 'v3-infinite-loading'
import PostItem from '../PostItem/PostItem.vue'

import { instance } from '../../api/axiosBase'
import { useRoute } from 'vue-router'

const route = useRoute()

const listEl = ref(null)
const postData = ref([])
const limit = 15

const infiniteId = ref(0)
const message = ref('')
let cursorId

watch(
  () => {
    return route.query.keyword
  },
  () => {
    postData.value = []
    cursorId = undefined
    changeInfiniteId()
  }
)

const changeInfiniteId = () => {
  infiniteId.value += 1
}

const infiniteHandler = async ($state) => {
  const { data: posts } = await instance.get(
    `/post/?limit=${limit}&cursorId=${cursorId}&keyword=${route.query.keyword}`
  )
  cursorId = posts.nextCursor
  message.value = posts.message
  postData.value.push(...posts.data)
  if (cursorId === null) {
    $state.complete()
  } else {
    $state.loaded()
  }
}
</script>
