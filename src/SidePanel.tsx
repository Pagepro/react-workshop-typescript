import React, { FunctionComponent } from 'react'
import QuestionsList from './QuestionsList'
import LifeLines from './LifeLines'
import { IAnswer } from './Game'

interface IProps {
  currentQuestionNumber: number
  correctAnswer: string
  answers: IAnswer[]
  setCurrentQuestionAnswers: (answers: IAnswer[]) => void
}

const SidePanel: FunctionComponent<IProps> = props => {
  const {
    currentQuestionNumber,
    correctAnswer,
    answers,
    setCurrentQuestionAnswers
  } = props

  return (
    <div className='c-side'>
      <LifeLines
        correctAnswer={correctAnswer}
        answers={answers}
        setCurrentQuestionAnswers={setCurrentQuestionAnswers}
      />
      <QuestionsList
        currentQuestionNumber={currentQuestionNumber}
      />
    </div>
  )
}

export default SidePanel
