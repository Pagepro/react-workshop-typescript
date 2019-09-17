import React from 'react'
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'
import Home from './Home'
import Setup from './Setup'
import Game from './Game'

export interface IAppSettings {
  nick: string
  difficulty: string | null
  gameStarted: boolean
}

type IProps = {}

type IState = IAppSettings

const defaultState: IState = {
  nick: '',
  difficulty: null,
  gameStarted: false
}

class App extends React.Component<IProps, IState> {
  state = defaultState

  constructor (props: IProps) {
    super(props)

    this.resetGame = this.resetGame.bind(this)
    this.setupApp = this.setupApp.bind(this)
    this.setGameStarted = this.setGameStarted.bind(this)
  }

  setupApp (nick: string, difficulty: string, callback?: () => void) {
    this.setState({
      nick,
      difficulty
    }, callback)
  }

  setGameStarted () {
    this.setState({
      gameStarted: true
    })
  }

  resetGame (callback?: () => void) {
    this.setState({ ...defaultState }, callback)
  }

  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path='/'
            component={() => (
              <Home
                setGameStarted={this.setGameStarted}
              />
            )}
          />
          <Route
            exact
            path='/setup'
            render={
              ({ history }) => (
                <Setup
                  setupApp={this.setupApp}
                  gameStarted={this.state.gameStarted}
                  history={history}
                />
              )
            }
          />
          <Route
            exact path='/game'
            render={({ history }) =>
              <Game
                history={history}
                appSettings={this.state}
                resetGame={this.resetGame}
              />
            }
          />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
