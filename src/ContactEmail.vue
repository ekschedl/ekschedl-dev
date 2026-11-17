<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
function writeEmail() {
  const address = ['ek.schedl', 'gmail.com'].join('@')
  window.location.href = 'mailto:' + address
}
</script>

<template>
  <button type="button" @click="writeEmail">
    <slot>{{ t('email') }}</slot>
  </button>
</template>

<style scoped>
button {
  border: 0;
  cursor: pointer;
}
</style>
