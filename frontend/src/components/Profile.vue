<template>
  <div>
    <ul>
      <li>
        <dt>이름</dt>
        <dd>{{ state.username }}</dd>
      </li>
      <li>
        <dt>이메일</dt>
        <dd>{{ state.email }}</dd>
      </li>
      <li>
        <dt>비밀번호</dt>
        <dd>{{ state.password }}</dd>
      </li>
      <li>
        <dt>전화번호</dt>
        <dd>{{ state.telephone }}</dd>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps, watch } from 'vue'

const props = defineProps(['state'])

watch(props, () => {
  console.log(props.state)
})
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
