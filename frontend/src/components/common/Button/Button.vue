<template>
  <button
    class="bg-mainOrange text-lightWhite rounded-lg px-6 py-2 text-sm flex gap-1 font-semibold hover:brightness-110 items-center justify-center"
    :class="[
      props.size === 'lg' ? 'w-80 py-3 px-8' : '',
      props.disabled ? 'cursor-not-allowed' : ''
    ]"
    :disabled="disabled"
    @click="props.onClick"
  >
    <slot></slot>
  </button>
</template>

<script setup>
const props = defineProps({ onClick: Function, size: String, disabled: Boolean })
</script>
