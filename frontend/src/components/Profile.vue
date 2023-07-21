<template>
  <div>
    <ul v-if="user">
      <h1 class="text-center">안녕하세요 {{ user.username }} 님 반갑습니다.</h1>
      <li>
        <dt>이름:</dt>
        <dd>{{ user.username }}</dd>
      </li>
      <li>
        <dt>이메일:</dt>
        <dd>{{ user.email }}</dd>
      </li>
      <li>
        <dt>전화번호 :</dt>
        <dd>{{ user.telephone }}</dd>
      </li>
      <Button size="md">정보 수정</Button>
      <Button size="md">회원 탈퇴</Button>
    </ul>
    <div v-else>
      <!-- user 객체가 null일 때 처리할 내용 -->
      사용자 정보를 불러올 수 없습니다.
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import Button from '../components/common/Button/Button.vue'

const props = defineProps(['user'])
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

ul {
  margin: 50px;
}

li {
  display: flex;
  align-items: center;
  justify-content: start;
  margin-bottom: 10px;
  list-style-type: none;
}

dt {
  margin-right: 10px;
}
</style>
