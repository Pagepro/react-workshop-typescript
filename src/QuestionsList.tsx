import React from 'react'
import { rewardsList, IReward } from './helpers'

interface IProps {
  currentQuestionNumber: number
}

class QuestionsList extends React.Component<IProps> {
  constructor (props: IProps) {
    super(props)

    this.renderQuestion = this.renderQuestion.bind(this)
  }

  renderQuestion (item: IReward, index: number) {
    const { currentQuestionNumber } = this.props
    const {
      price,
      isGuaranteed
    } = item

    const isCurrent = currentQuestionNumber === (rewardsList.length - 1 - index)
    const isAnswered = currentQuestionNumber > (rewardsList.length - 1 - index)
    const itemClass = `c-status__item${isCurrent ? ' is-active' : ''}${isGuaranteed ? ' is-special' : ''}${isAnswered ? ' is-done' : ''}`
    const questionNumber = rewardsList.length - index

    return (
      <li
        key={`${price}-price`}
        className={itemClass}
      >
        <span className='c-status__indicator'>
          {questionNumber}
        </span>
        <span className='c-status__value'>
          {price}
        </span>
      </li>
    )
  }

  render () {
    return (
      <ul className='c-status'>
        {rewardsList.map(this.renderQuestion)}
      </ul>
    )
  }
}

export default QuestionsList
