<template>
  <div class="flex flex-col w-96 gap-1 relative">
    <label :for="id" class="font-medium">{{ label }}</label>
    <input
      :id="id"
      :type="props.type"
      v-model="value"
      class="border-b-2 focus:border-orange-300 outline-none"
    />
    <p v-if="error" class="absolute -bottom-5 text-sm font-medium text-red-500">{{ error }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: String,
  id: String,
  type: { type: String, default: 'text' },
  input: String,
  modelValue: String,
  error: String
})

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>
