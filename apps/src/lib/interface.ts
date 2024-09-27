import React from 'react'
import { TITLE_GAME_PLAY } from './constants'

export interface PointState {
  isPoints: number
  setIsPoints: React.Dispatch<React.SetStateAction<number>>
}

export interface PlayingState {
  isPlaying: boolean
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
}

export interface EndGameState {
  isEndGame: TITLE_GAME_PLAY
  setIsEndGame: React.Dispatch<React.SetStateAction<TITLE_GAME_PLAY>>
}

export interface RePlayingState {
  isRePlaying: boolean
  setReIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ControlGameProps {
  pointState: PointState
  playingState: PlayingState
  endGameState: EndGameState
  timeStop: TimeStop
  rePlayingState: RePlayingState
}

export interface TimeStop {
  timeStop: boolean
  setTimeStop: React.Dispatch<React.SetStateAction<boolean>>
}

export interface AreaPlayProps {
  isPoints: number
  playingState: PlayingState
  timeStop: TimeStop
  endGameState: EndGameState
  isRePlaying: boolean
}

export interface ThePoint {
  value: number
  vectorX: number
  vectorY: number
  zIndex: number
  isHidden: boolean
}
