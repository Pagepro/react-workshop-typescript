import React from 'react'
import { History } from 'history'

interface IProps {
  setupApp: (nick: string, difficulty: string, callback?: () => void) => void
  gameStarted: boolean
  history: History
}

interface IState {
  name: string
  difficulty: string
}

class Setup extends React.Component<IProps, IState> {
  state = {
    name: '',
    difficulty: ''
  }

  nickNameRef = React.createRef<HTMLInputElement>()
  difficultyRef = React.createRef<HTMLSelectElement>()

  constructor (props: IProps) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount () {
    const {
      history,
      gameStarted
    } = this.props

    if (!gameStarted) {
      history.replace('/')
    }
  }

  onSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!this.difficultyRef.current || !this.nickNameRef.current) return

    const {
      props: {
        setupApp,
        history
      },
      nickNameRef: {
        current: {
          value: nickName
        }
      },
      difficultyRef: {
        current: {
          value: difficulty
        }
      }
    } = this

    if (!nickName.length) {
      window.alert('Please enter the name :)')

      return
    }

    setupApp(nickName, difficulty, () => {
      history.push('/game')
    })
  }

  render () {
    return (
      <div className='l-centered'>
        <form
          className='f-start'
          onSubmit={this.onSubmit}
        >
          <label
            className='f-start__label'
            htmlFor='nickname'
          >
            Nick:
          </label>
          <input
            className='f-start__control'
            type='text'
            ref={this.nickNameRef}
            id='nickname'
            autoFocus
          />
          <label
            className='f-start__label'
            htmlFor='difficulty'
          >
            Difficulty:
          </label>
          <select
            ref={this.difficultyRef}
            id='difficulty'
            className='f-start__control'
          >
            <option
              value='easy'
            >
              Easy
            </option>
            <option
              value='medium'
            >
              Medium
            </option>
            <option
              value='hard'
            >
              Hard
            </option>
          </select>
          <button
            className='f-start__action'
            type='submit'
          >
            Start
          </button>
        </form>
      </div>
    )
  }
}

export default Setup
