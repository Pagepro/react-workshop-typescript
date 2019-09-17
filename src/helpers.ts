import axios from 'axios'

const questionsUrl = 'http://server-ip'

interface IResponseQuestion {
  category: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

interface IQuestionsResponse {
  results: IResponseQuestion[]
}

export interface IReward {
  price: number
  isGuaranteed: boolean
}

export interface IQuestion {
  question: string
  correctAnswer: string
  incorrectAnswers: string[]
}

export const fetchQuestions = (difficulty: string): Promise<IQuestion[]> => {
  return axios.get<IQuestionsResponse>(questionsUrl, {
    params: {
      difficulty
    }
  })
  .then(({ data: { results = [] } }) => results.map(({
    category,
    question,
    correct_answer,
    incorrect_answers
  }) => ({
    category,
    question,
    correctAnswer: correct_answer,
    incorrectAnswers: incorrect_answers
  })))
}

export const rewardsList: IReward[] = [
  {
    price: 1000000,
    isGuaranteed: true
  },
  {
    price: 500000,
    isGuaranteed: false
  },
  {
    price: 250000,
    isGuaranteed: false
  },
  {
    price: 125000,
    isGuaranteed: false
  },
  {
    price: 75000,
    isGuaranteed: false
  },
  {
    price: 40000,
    isGuaranteed: true
  },
  {
    price: 20000,
    isGuaranteed: false
  },
  {
    price: 10000,
    isGuaranteed: false
  },
  {
    price: 5000,
    isGuaranteed: false
  },
  {
    price: 2000,
    isGuaranteed: false
  },
  {
    price: 1000,
    isGuaranteed: true
  },
  {
    price: 500,
    isGuaranteed: false
  }
]

export const getGuaranteedReward = (questionNumber: number) => {
  if (!questionNumber) return 0

  const reward = rewardsList
    .slice(-questionNumber)
    .find(({ isGuaranteed }) => isGuaranteed)

  return reward ? reward.price : 0
}
