import React, { FunctionComponent } from 'react'
import {
  Link
} from 'react-router-dom'

interface IProps {
  setGameStarted: () => void
}

const Home: FunctionComponent<IProps> = ({ setGameStarted }) => {
  return (
    <div className='l-centered'>
      <Link
        className='c-start-link'
        to='/setup'
        onClick={setGameStarted}
      >
        Start
      </Link>
    </div>
  )
}

export default Home
