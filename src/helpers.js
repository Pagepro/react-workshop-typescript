import axios from 'axios'

const questionsUrl = 'http://server-ip'

export const fetchQuestions = difficulty => axios.get(questionsUrl, {
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

export const questionsList = [
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

export const getGuaranteedReward = questionNumber => {
  if (!questionNumber) return 0

  const reward = questionsList
    .slice(-questionNumber)
    .find(({ isGuaranteed }) => isGuaranteed)

  return reward ? reward.price : 0
}
