import React from 'react'
import QuestionsList from './QuestionsList'
import LifeLines from './LifeLines'
import PropTypes from 'prop-types'

class SidePanel extends React.Component {
  render () {
    const {
      currentQuestionNumber,
      correctAnswer,
      answers,
      setCurrentQuestionAnswers
    } = this.props

    return (
      <div className='c-side'>
        <LifeLines
          correctAnswer={correctAnswer}
          answers={answers}
          setCurrentQuestionAnswers={setCurrentQuestionAnswers}
          currentQuestionNumber={currentQuestionNumber}
        />
        <QuestionsList
          currentQuestionNumber={currentQuestionNumber}
        />
      </div>
    )
  }
}

SidePanel.propTypes = {
  currentQuestionNumber: PropTypes.number,
  correctAnswer: PropTypes.string,
  answers: PropTypes.array,
  setCurrentQuestionAnswers: PropTypes.func
}

export default SidePanel
