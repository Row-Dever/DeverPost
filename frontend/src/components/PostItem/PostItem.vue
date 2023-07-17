<template>
  <li
    class="flex flex-col items-center gap-1 m-2 border-2 rounded-md border-solid border-gray-200 p-2"
    @click="goPostDetailHandler"
  >
    <img class="w-60 h-60" :src="props.post.imgSrc" alt="게시글이미지" />
    <div class="w-full">
      <p class="font-bold text-lg line-clamp-2 my-2 break-words">
        {{ props.post.title }}
      </p>
      <p class="text-sm opacity-80 line-clamp-2 my-1 break-words">
        {{ props.post.description }}
      </p>
      <p class="text-sm opacity-80 text-center">{{ props.post.userName }}</p>
      <p>{{ date }}</p>
    </div>
  </li>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { formatDate } from '../../utils/dateformat'
import { computed } from 'vue'

const props = defineProps({
  post: {
    title: String,
    description: String,
    imgSrc: String,
    userName: String,
    userId: Number,
    category: String,
    created_at: Date,
    id: Number
  }
})

const date = computed(() => {
  return formatDate(new Date(props.post.created_at))
})

const router = useRouter()
const goPostDetailHandler = () => {
  router.push(`/postDetail/${props.post.id}`)
}
</script>
