<script setup lang="ts">
import { useQuizStore, type IAnswer } from "~/store/quiz"

const props = defineProps<IAnswer & { index: number; questionId: string }>()
const quizStore = useQuizStore()
const style = computed(() => {
  if (quizStore.currentQuestion?.revealed && props.is_correct) {
    return "border border-green-400 bg-green-400 text-white animate-[pulse_1s]"
  } else if (props.selected) {
    return "border border-orange-400 bg-orange-400 text-white"
  } else {
    return "border border-slate-500"
  }
})
const _select = () => {
  !quizStore.currentQuestion?.revealed &&
    quizStore.answerQuestion(props.questionId, props.id)
}
</script>

<template>
  <button
    class="w-full text-start rounded-lg my-3 flex flex-row gap-2 px-3 py-2"
    :class="style"
    @click="_select"
  >
    <span>{{ String.fromCharCode(65 + props.index) }}.</span>
    <div>{{ text }}</div>
  </button>
</template>
