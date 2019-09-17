import React from 'react'
import { History } from 'history'
import { shuffle } from 'lodash'
import {
  fetchQuestions, IQuestion
} from './helpers'
import Questions from './Questions'
import Background from './Background'
import SidePanel from './SidePanel'
import EndScreen from './EndScreen'
import { IAppSettings } from './App'

interface IAnswer {
  text: string
  disabled: boolean
}

interface IProps {
  history: History
  appSettings: IAppSettings
  resetGame: (callback?: () => void) => void
}

interface IState {
  questions: IQuestion[]
  currentQuestion: IQuestion | null
  answers: IAnswer[]
  currentQuestionNumber: number
  answer: IAnswer | null
  isGameFinished: boolean
  hasWon: boolean
}

class Game extends React.Component<IProps, IState> {
  constructor (props: IProps) {
    super(props)

    this.fetchQuestions = this.fetchQuestions.bind(this)
    this.generateQuestion = this.generateQuestion.bind(this)
    this.setCurrentAnswer = this.setCurrentAnswer.bind(this)
    this.resetGame = this.resetGame.bind(this)
    this.setCurrentQuestionAnswers = this.setCurrentQuestionAnswers.bind(this)

    this.state = {
      questions: [],
      currentQuestion: null,
      answers: [],
      currentQuestionNumber: 0,
      answer: null,
      isGameFinished: false,
      hasWon: false
    }
  }

  componentDidMount () {
    const {
      appSettings: {
        nick,
        difficulty,
        gameStarted
      },
      history
    } = this.props

    if (!nick || !difficulty || !gameStarted) {
      history.replace('/')
      return
    }

    this.fetchQuestions()
  }

  resetGame () {
    this.props.resetGame(() => {
      this.props.history.push('/')
    })
  }

  fetchQuestions () {
    const { difficulty } = this.props.appSettings

    if (!difficulty) return

    fetchQuestions(difficulty)
      .then((questions: IQuestion[]) => {
        this.setState({
          questions
        }, this.generateQuestion)
      })
  }

  generateQuestion () {
    const currentQuestion = this.state.questions[this.state.currentQuestionNumber]

    if (!currentQuestion) return

    const {
      correctAnswer,
      incorrectAnswers
    } = currentQuestion

    const answers = shuffle([correctAnswer, ...incorrectAnswers])
      .map(answer => ({
        text: answer,
        disabled: false
      }))

    this.setState({
      currentQuestion,
      answers
    })
  }

  setCurrentAnswer (answer: IAnswer) {
    return () => {
      this.setState({ answer }, this.confirmCheckedAnswer)
    }
  }

  confirmCheckedAnswer () {
    const {
      answer,
      currentQuestion,
      currentQuestionNumber
    } = this.state

    if (!answer || !currentQuestion) {
      return
    }

    if (answer.text === currentQuestion.correctAnswer) {
      if (currentQuestionNumber !== 11) {
        this.setState(prevState => ({
          currentQuestionNumber: prevState.currentQuestionNumber + 1,
          answer: null
        }), this.generateQuestion)
      } else {
        this.setState({
          isGameFinished: true,
          hasWon: true
        })
      }
    } else {
      this.setState({
        isGameFinished: true,
        hasWon: false
      })
    }
  }

  setCurrentQuestionAnswers (answers: IAnswer[]) {
    this.setState({
      answers: [
        ...answers
      ]
    })
  }

  render () {
    const {
      currentQuestion,
      answers,
      isGameFinished,
      hasWon,
      currentQuestionNumber
    } = this.state

    if (!currentQuestion) return <Background />

    const {
      question,
      correctAnswer
    } = currentQuestion

    return isGameFinished
      ? (
        <EndScreen
          hasWon={hasWon}
          currentQuestionNumber={currentQuestionNumber}
          resetGame={this.resetGame}
        />
      )
      : (
        <div className='l-game'>
          <Background>
            <div className='c-questions'>
              <Questions
                question={question}
                answers={answers}
                correctAnswer={correctAnswer}
                onSelect={this.setCurrentAnswer}
              />
            </div>
          </Background>
          <SidePanel
            currentQuestionNumber={currentQuestionNumber}
            correctAnswer={correctAnswer}
            answers={answers}
            setCurrentQuestionAnswers={this.setCurrentQuestionAnswers}
          />
        </div>
      )
  }
}

export default Game
