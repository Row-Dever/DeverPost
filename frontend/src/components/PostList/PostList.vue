<template>
  <!-- <Loading v-if="postData.length === 0" /> -->
  <ul
    ref="listEl"
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 gap-y-4 pb-8"
  >
    <template v-for="post in postData" :key="post.id"
      ><PostItem :post="post" :title="postData[0].title" @set-post="setPost" />
    </template>
  </ul>
  <InfiniteLoading @infinite="infiniteHandler">
    <template #complete>
      <span>데이터가 모두 전송되었습니다.</span>
    </template>
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

const skip = ref(0)

const infiniteHandler = async ($state) => {
  console.log('handler')
  skip.value++
  console.log(postData)
  // const res = await fetch('/data/postData.json')

  // fetch
  // const res = await fetch('http://localhost:8080/')
  // const postsData = await res.json()
  // console.log(postsData)
  // postData.value = postsData

  const { data } = await instance.get(`/post/?limit=${limit}&skip=${skip.value}`)
  console.log(data)
  if (data.length < 10) {
    postData.value.push(...data)
    console.log('데이터 전송 마지막')
    $state.complete()
  } else {
    postData.value.push(...data)
    $state.loaded()
  }
}

// onMounted(
//   debounce(async () => {
//     // const res = await fetch('/data/postData.json')

//     // fetch
//     // const res = await fetch('http://localhost:8080/')
//     // const postsData = await res.json()
//     // console.log(postsData)
//     // postData.value = postsData
//     const { data } = await instance.get(`/post/?limit=${limit}&skip=0`)

//     postData.value = data
//   })
// )
</script>
