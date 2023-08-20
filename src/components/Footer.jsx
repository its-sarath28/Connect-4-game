import React from 'react'
import { GAME_STATE_PLAYING } from '../constants'

const Footer = ({ onSuggestClick, onNewGameClick, disabled, gameState }) => {
  return (
    <div className='panel footer'>
      {
        gameState === GAME_STATE_PLAYING  && 
        <button className='suggest-btn' onClick={onSuggestClick}>
          Suggest
        </button>
      }

      {
        gameState !== GAME_STATE_PLAYING &&
        <button className='new-game-btn' onClick={onNewGameClick}>
          New Game
        </button>
      }

      
    </div>
  )
}

export default Footer
