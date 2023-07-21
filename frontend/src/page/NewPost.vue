<template>
  <section class="mt-32">
    <Container>
      <h2 class="ir">게시글작성페이지</h2>
      <form class="flex flex-col gap-6">
        <Input
          label="제목"
          v-model="postTitleRef"
          :onvalidation="onChangeTitleHandler"
          @on-valid="onErrorHandler"
        ></Input>
        <div>
          <span>카테고리를 선택해주세요.</span>
          <select
            name="카테고리"
            v-model="selectedValue"
            class="rounded-lg border-solid border-2 border-gray-200 p-2 w-full focus:border-mainOrange"
          >
            <option disabled hidden value="none" selected>선택</option>
            <option value="프론트">프론트</option>
            <option value="백엔드">백엔드</option>
            <option value="데이터">데이터</option>
            <option value="기타">기타</option>
          </select>
        </div>
        <CKEditor v-model="editorData" :config="editorConfig" :editor="ClassicEditor" />
        <Button v-if="route.params.pk" @click.prevent="onPutPostHandler" passed
          >게시물수정완료</Button
        >
        <Button v-else @click.prevent="onNewPostHandler" :disabled="!titleValid.isValid"
          >게시물작성완료</Button
        >
      </form>
    </Container>
  </section>
</template>

<script setup>
import Container from '../components/common/Container/Container.vue'
import Input from '../components/common/Input/Input.vue'
import Button from '../components/common/Button/Button.vue'
import uploadPlugin from '../utils/uploadAdapter'

import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { instance } from '../api/axiosBase'

import { component as CKEditor } from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const editorData = ref()
const postTitleRef = ref('')
const selectedValue = ref('none')
const titleValid = ref({})

const route = useRoute()
const router = useRouter()

const onChangeTitleHandler = (title) => {
  if (title === '' || title.length === 0) {
    return { errmessage: '제목이 입력되지 않았습니다.', isValid: false }
  } else {
    return { errmessage: '', isValid: true }
  }
}

const onErrorHandler = (error) => {
  titleValid.value = error
}

watch(
  () => route.params.pk,
  () => {
    if (!route.params.pk) {
      initPostData()
    }
  }
)

const initPostData = () => {
  postTitleRef.value = ''
  editorData.value = ''
  selectedValue.value = 'none'
}

const editorConfig = ref({
  fontSize: {
    options: ['tiny', 'default', 'big']
  },
  fontFamily: {
    options: [
      'default',
      'indieflowerregular',
      'Arial, sans-serif',
      'Verdana, sans-serif',
      'Trebuchet MS',
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol'
    ]
  },
  table: {
    contentToolbar: [
      'tableColumn',
      'tableRow',
      'mergeTableCells',
      'tableProperties',
      'tableCellProperties'
    ]
  },
  image: {
    resize: true,
    toolbar: [
      'imageStyle:alignLeft',
      'imageStyle:alignRight',
      'imageStyle:inline',
      'imageStyle:side'
    ]
  },
  extraPlugins: [uploadPlugin]
})

// 게시글 추가 (pk가 없는 경우)
const onNewPostHandler = async () => {
  await instance.post('/post', {
    title: postTitleRef.value,
    content: editorData.value,
    userId: 1,
    category: selectedValue.value
  })
  router.push('/')
}

// 게시글 수정 (PK가 있는 경우)
const onPutPostHandler = async () => {
  await instance.put(`/post/${route.params.pk}`, {
    title: postTitleRef.value,
    content: editorData.value,
    category: selectedValue.value
  })

  router.push(`/postdetail/${route.params.pk}`)
}

onMounted(async () => {
  if (route.params.pk) {
    const { data } = await instance.get(`/post/${route.params.pk}`)
    editorData.value = data.content
    postTitleRef.value = data.title
    selectedValue.value = data.category
  }
  return
})
</script>

<style>
.ck .ck-editor__editable {
  min-height: 400px;
}

/* .ck-content h2 {
  font-size: 1.6rem !important;
  font-weight: 800 !important;
}

.ck-content h3 {
  font-size: 1.4rem !important;
  font-weight: 600 !important;
}

.ck-content h4 {
  font-size: 1.2rem !important;
  font-weight: 500 !important;
}

.ck-content ol {
  list-style-type: disc !important;
}

.ck-content ul {
  list-style-type: circle !important;
} */
</style>
