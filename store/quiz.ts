import PublicGoogleSheetsParser from "public-google-sheets-parser"

export interface IAnswer {
  id: string, is_correct: boolean, text: string, selected: boolean
}

export interface IQuestion {
  qId: string
  topic?: string
  level?: number
  type?: 'single_choice' | 'multi_choice'
  question?: string
  explanation?: string
  revealed?: boolean
  answers?: IAnswer[]
}

const shuffleArray = <T>(array: Array<T>): Array<T> => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}

export const useQuizStore = defineStore('quizStore', () => {
  const questions = ref<IQuestion[]>([])
  const currentPage = ref(0)

  const fetchData = async () => {
    const config = useRuntimeConfig()
    const parser = new PublicGoogleSheetsParser(config.public.sheetId)
    const parsed = await parser.parse()
    const data = shuffleArray(parsed).slice(0, 5).map(d => ({
      qId: d['SNO'],
      topic: d['Topic Category'],
      level: parseInt(d['Level']),
      question: d['Questions'],
      explanation: 'Explanation text',
      revealed: false,
      answers: shuffleArray([
        { id: `${d['SNO']}-A1`, is_correct: true, text: d['Answer'], selected: false },
        { id: `${d['SNO']}-A2`, is_correct: false, text: d['Misconceptions #1'], selected: false },
        { id: `${d['SNO']}-A3`, is_correct: false, text: d['Misconceptions #2'], selected: false },
      ])
    } as IQuestion))
    questions.value = data
  }

  const numOfQuestion = computed(() => questions.value.length)
  const currentQuestion = computed(() => questions.value.length ? questions.value[currentPage.value] : undefined)

  const answerQuestion = (questionId: string, answerId: string) => {
    questions.value = questions.value.map(q => ({
      ...q,
      answers: q.qId === questionId ? q.answers?.map(a => ({
        ...a,
        selected: a.id === answerId
      })) : q.answers
    }))
  }
  const changePage = (page: number) => { currentPage.value = page }
  const revealExp = (qId: string) => {
    questions.value = questions.value.map(q => ({ ...q, revealed: qId === q.qId ? true : q.revealed }))
  }

  return {
    questions,
    currentQuestion,
    numOfQuestion,
    currentPage,
    fetchData,
    answerQuestion,
    changePage,
    revealExp
  }
})