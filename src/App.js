import React from 'react'
import PropTypes from 'prop-types'
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'
import Home from './Home'
import Setup from './Setup'
import Game from './Game'

const defaultState = {
  nick: '',
  difficulty: null,
  gameStarted: false
}

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = defaultState

    this.resetGame = this.resetGame.bind(this)
    this.setupApp = this.setupApp.bind(this)
    this.setGameStarted = this.setGameStarted.bind(this)
  }

  setupApp (nick, difficulty, callback) {
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

  resetGame (callback) {
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
            component={({ history }) =>
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

App.propTypes = {
  history: PropTypes.object
}

export default App
