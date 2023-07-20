<template>
  <div>
    <ul v-if="user">
      <li>
        <dt>이름</dt>
        <dd>{{ user.username }}</dd>
      </li>
      <li>
        <dt>이메일</dt>
        <dd>{{ user.email }}</dd>
      </li>
      <li>
        <dt>비밀번호</dt>
        <dd>{{ user.password }}</dd>
      </li>
      <li>
        <dt>전화번호</dt>
        <dd>{{ user.telephone }}</dd>
      </li>
    </ul>
    <div v-else>
      <!-- user 객체가 null일 때 처리할 내용 -->
      사용자 정보를 불러올 수 없습니다.
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps(['user'])
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

ul {
  margin: 20px;
}

li {
  display: flex;
  align-items: center;
  justify-content: start;
  margin-bottom: 8px;
  list-style-type: none;
}

dt {
  margin-right: 4px;
}
</style>
