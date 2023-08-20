import React, { useEffect, useState } from 'react'

import '../Game.css';

import GameCircle from './GameCircle'
import Header from './Header';
import Footer from './Footer';
import { getComputerMove, isDraw, isWinner } from '../helper';
import { 
  GAME_STATE_PLAYING,
  NO_PLAYER, PLAYER_1,
  PLAYER_2,
  GAME_STATE_WIN,
  NUM_OF_CIRCLES,
  GAME_STATE_DRAW
} from '../constants'


const GameBoard = () => {
  const [gameBoard, setGameBoard] = useState(Array(NUM_OF_CIRCLES).fill(NO_PLAYER));
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
  const [gameState, setGameState] = useState(GAME_STATE_PLAYING);
  const [winPlayer, setWinPlayer] = useState(NO_PLAYER);

  useEffect(() => {
    initGame();
  }, [])

  const initGame = () => {
    setGameBoard(Array(NUM_OF_CIRCLES).fill(NO_PLAYER))
    setCurrentPlayer(PLAYER_1)
    setGameState(GAME_STATE_PLAYING)
  }

  const initBoard = () => {
    const circles = []

    for(let i=0; i<NUM_OF_CIRCLES; i++){
      circles.push(renderCircle(i))
    }

    return circles
  }

  const suggestMove = () => {
    circleClicked(getComputerMove(gameBoard))
  }

  const circleClicked = (id) => {

    //Do not change color if the circle is already clicked
    if(gameBoard[id] !== NO_PLAYER) return;

    //Stop the game if any player wins
    if(gameState !== GAME_STATE_PLAYING) return;

    if(isWinner(gameBoard, id, currentPlayer)){
      setGameState(GAME_STATE_WIN)
      setWinPlayer(currentPlayer)
    }

    if(isDraw(gameBoard, id, currentPlayer)){
      setGameState(GAME_STATE_DRAW)
      setWinPlayer(NO_PLAYER)
    }

    setGameBoard((prev) => {
      return prev.map((circle, pos) => {
        if(pos === id){
          return currentPlayer
        }
        return circle
      })
    })

    setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1)
  }

  const renderCircle = (id) => {
    return(
      <GameCircle
        key={id}
        id={id} 
        className={`player_${gameBoard[id]}`} 
        onCircleClicked={circleClicked}
      />
    )
  }

  return (
    <>
      <Header 
        currentPlayer={currentPlayer}
        gameState={gameState}
        winPlayer={winPlayer}
      />

      <div className='gameBoard'>
        {initBoard()}
      </div>

      <Footer 
        onNewGameClick={initGame}
        onSuggestClick={suggestMove}
        gameState={gameState}
      />
    </>
  )
}

export default GameBoard;