<script setup lang="ts">
import { useQuizStore } from '~/store/quiz';

const { result } = storeToRefs(useQuizStore())
</script>

<template>
  <div class="p-4 h-screen flex flex-col items-center justify-center">
    You have finished the test, here is your result
    <div class="mt-4 p-3 rounded-full border border-orange-500 text-orange-500 font-bold text-3xl justify-self-center w-20 place-content-center text-center aspect-square">
      {{ result ?? 0 }}
    </div>
  </div>
</template>