<template>
  <div class="flex flex-col w-96 gap-1 relative">
    <label :for="id" class="font-medium">{{ label }}</label>
    <input
      :id="id"
      :type="props.type"
      v-model="value"
      :pattern="props.pattern"
      class="border-b-2 focus:border-orange-300 outline-none"
      @input="onValidationHandler"
    />
    <p v-if="!validationData.isValid" class="absolute -bottom-5 text-sm font-medium text-red-500">
      {{ validationData.errmessage }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { computed } from 'vue'

const props = defineProps({
  label: String,
  id: String,
  type: { type: String, default: 'text' },
  input: String,
  pattern: String,
  modelValue: String,
  onvalidation: Function
})

const validationData = ref({})

const emit = defineEmits(['update:modelValue', 'on-valid'])

const onValidationHandler = (e) => {
  const validData = props.onvalidation(e.target.value)
  validationData.value = validData
  emit('on-valid', validData)
}

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>
