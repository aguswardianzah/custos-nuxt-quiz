<script setup lang="ts">
import { useQuizStore } from "~/store/quiz"

const quizStore = useQuizStore()

const _goPrevPage = () => quizStore.changePage(quizStore.currentPage - 1)
const _goNextPage = () => {
  if (quizStore.currentQuestion?.revealed) {
    quizStore.changePage(quizStore.currentPage + 1)
    // } else {
    //   _reveal()
  }
}
// const _reveal = () =>
//   quizStore.currentQuestion &&
//   !quizStore.currentQuestion.revealed &&
//   quizStore.revealExp(quizStore.currentQuestion.qId)
const _finish = () => {
  if (quizStore.currentQuestion?.revealed) {
    console.log("finish quiz")
    // } else {
    //   _reveal()
  }
}
const _isCorrect = computed(
  () =>
    quizStore.currentQuestion?.revealed &&
    quizStore.currentQuestion.answers?.some((a) => a.is_correct && a.selected)
)

onMounted(() => {
  quizStore.fetchData()
})
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <template v-if="quizStore.currentQuestion">
      <div class="p-4 flex-grow">
        <span class="rounded bg-green-500 p-2 text-sm text-white font-semibold">
          {{ quizStore.currentQuestion.topic }}
        </span>
        <div class="mt-4">{{ quizStore.currentQuestion.question }}</div>
        <Answer
          v-for="(answer, index) in quizStore.currentQuestion.answers"
          v-bind="answer"
          :index
          :question-id="quizStore.currentQuestion.qId"
        />
        <!--button
        v-if="quizStore.currentQuestion.answers?.some((a) => a.selected)"
        class="flex items-center mt-2 bg-green-300 rounded place-self-center p-2 text-sm font-semibold"
        @click="_reveal"
      >
        <Icon name="uil:book-open" class="me-1" size="1em" />Reveal answer
      </button-->
        <div v-if="_isCorrect" class="flex justify-center text-center">
          <img src="/img/congrats.jpeg" class="mt-3 w-32 animate-[ping_1s]" />
        </div>
        <div v-if="quizStore.currentQuestion.revealed" class="mt-2">
          {{ quizStore.currentQuestion.explanation }}
        </div>
      </div>
    </template>

    <div
      class="flex flex-row justify-between w-full p-4 border-t-1 shadow-inner"
    >
      <button
        v-if="quizStore.currentPage > 0"
        @click="_goPrevPage"
        class="flex flex-row gap-2 items-center"
      >
        <Icon name="uil:angle-left" size="2em" />Prev
      </button>
      <div v-else></div>

      <button
        v-if="quizStore.currentPage < quizStore.numOfQuestion - 1"
        @click="_goNextPage"
        class="flex flex-row-reverse gap-2 items-center"
      >
        <Icon name="uil:angle-right" size="2em" />Next
      </button>
      <button
        v-else
        @click="_finish"
        class="flex flex-row-reverse gap-2 items-center"
      >
        <Icon name="uil:check-circle" size="1.5em" />Finish
      </button>
    </div>
  </div>
</template>
