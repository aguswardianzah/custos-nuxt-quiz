import { collection } from "firebase/firestore"

export interface Answer {
  questionId: string,
  answerId: string
}

export const useQuizStore = defineStore('quizStore', () => {
  const db = useFirestore()
  const questions = useCollection(collection(db, '/quiz'))
  const answers = ref<Answer[]>([])
  const currentPage = ref(0)

  const numOfQuestion = computed(() => questions.value.length)
  const currentQuestion = computed(() => questions.value[currentPage.value])
  const selectedAnswer = computed(() => answers.value.find(a => a.questionId === currentQuestion.value.qId)?.answerId)
  const result = computed(() => {
    const score = answers.value.map(a => {
      const question = questions.value.find(q => q.qId === a.questionId)
      if (question && question.answers.some((qa: { id: string, is_correct: boolean }) => qa.id === a.answerId && qa.is_correct))
        return 1 as number
      return 0 as number
    }).reduce((a, b) => a + b)
    return score / numOfQuestion.value * 100
  })

  const answerQuestion = (questionId: string, answerId: string) => {
    if (answers.value.find(a => a.questionId === questionId)) {
      answers.value = answers.value.map(a => ({ ...a, answerId: a.questionId === questionId ? answerId : a.answerId }))
    } else {
      answers.value = [...answers.value, { questionId, answerId }]
    }
  }

  const changePage = (page: number) => { currentPage.value = page }


  return { questions, currentQuestion, selectedAnswer, numOfQuestion, answers, result, currentPage, answerQuestion, changePage }
})