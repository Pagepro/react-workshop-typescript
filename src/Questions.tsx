import React from 'react'
import { IAnswer } from './Game'

interface IProps {
  answers: IAnswer[]
  question: string
  onSelect: (answer: IAnswer) => () => void
}

class Questions extends React.Component<IProps> {
  constructor (props: IProps) {
    super(props)

    this.renderItem = this.renderItem.bind(this)
  }

  renderItem (item: IAnswer, index: number) {
    const {
      onSelect
    } = this.props

    return (
      <li
        key={`${index}-answer`}
        className={`c-question ${item.disabled ? 'is-disabled' : ''}`}
        onClick={item.disabled ? undefined : onSelect(item)}
      >
        <span className='c-question__label'>
          {String.fromCharCode(65 + index)}: {item.text}
        </span>
      </li>
    )
  }

  render () {
    const {
      answers,
      question
    } = this.props

    return (
      <div className='c-questions'>
        <p className='c-questions__title c-question'>
          {question}
        </p>
        <ul className='c-questions__list'>
          {answers.map(this.renderItem)}
        </ul>
      </div>
    )
  }
}

export default Questions
