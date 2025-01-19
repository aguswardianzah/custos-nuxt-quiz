<script setup lang="ts">
import { useQuizStore } from '~/store/quiz';

const quizStore = useQuizStore()

const _goPrevPage = () => quizStore.changePage(quizStore.currentPage - 1)
const _goNextPage = () => quizStore.changePage(quizStore.currentPage + 1)
const _goToResult = () => useRouter().push('result')
</script>

<template>
  <div class="p-4">
    <span class="rounded bg-green-500 p-2 text-sm text-white font-semibold">{{ quizStore.currentQuestion.topic }}</span>
    <div class="mt-4">{{ quizStore.currentQuestion.question }}</div>
    <Answer v-for="(answer, index) in quizStore.currentQuestion.answers" :index :answer-id="answer.id"
      :question-id="quizStore.currentQuestion.qId" :text="answer.text" />
  </div>
  <div class="flex flex-row justify-between absolute bottom-0 w-full p-4 border-t-1 shadow-inner">
    <button v-if="quizStore.currentPage > 0" @click="_goPrevPage" class="flex flex-row gap-2 items-center">
      <Icon name="uil:angle-left" size="2em" />Prev
    </button>
    <div v-else></div>
    <button v-if="quizStore.currentPage < quizStore.numOfQuestion - 1" @click="_goNextPage"
      class="flex flex-row-reverse gap-2 items-center">
      <Icon name="uil:angle-right" size="2em" />Next
    </button>
    <button v-else @click="_goToResult" class="flex flex-row-reverse gap-2 items-center">
      <Icon name="uil:upload-alt" size="1.5em" />Submit
    </button>
  </div>
</template>