<script setup lang="ts">
import { useQuizStore } from '~/store/quiz';

const props = defineProps(['index', 'answerId', 'questionId', 'text'])
const quizStore = useQuizStore()
const style = computed(() => {
  if (quizStore.selectedAnswer === props.answerId) {
    return 'border-2 border-orange-400 bg-orange-400 text-white'
  } else {
    return 'border-2 border-slate-500'
  }
})
const _select = () => quizStore.answerQuestion(props.questionId, props.answerId)
</script>

<template>
  <button class="w-full text-start rounded-lg my-4 flex flex-row gap-2 px-3 py-2" :class="style" @click="_select">
    <span>{{ String.fromCharCode(65 + props.index) }}</span>
    <div>{{ text }}</div>
  </button>
</template>