import { TITLE_GAME_PLAY } from '@/lib/constants'
import { ControlGameProps } from '@/lib/interface'
import { ChangeEvent, useEffect, useState } from 'react'
import { cn } from '../utils/cn'

export default function Heading({ pointState, playingState, endGameState, timeStop, rePlayingState }: ControlGameProps) {
  const [isTime, setIsTime] = useState<number>(0)
  const [isPoints, setIsPoints] = useState(0)
  const [checkText, setCheckText] = useState(true)

  useEffect(() => {
    if (playingState.isPlaying && !timeStop.timeStop) {
      const interval = setInterval(() => {
        setIsTime(prevTime => prevTime + 0.1)
      }, 100)
      return () => clearInterval(interval)
    }
  }, [rePlayingState.isRePlaying, isTime, playingState, timeStop.timeStop])

  const handleOnChangeValue = (e: ChangeEvent<HTMLInputElement>) => setIsPoints(Number(e.target.value))

  const handleOnClickStart = () => {
    if (isPoints) {
      rePlayingState.setReIsPlaying(!rePlayingState.isRePlaying)
      timeStop.setTimeStop(false)
      setIsTime(0)
      pointState.setIsPoints(isPoints)
      playingState.setIsPlaying(true)
      setCheckText(false)
    }
  }

  return (
    <div className="w-full space-y-5">
      <h1
        className={cn(
          'text-2xl font-bold uppercase',
          endGameState.isEndGame == TITLE_GAME_PLAY.WIN
            ? 'text-green-500'
            : endGameState.isEndGame == TITLE_GAME_PLAY.LOSE
              ? 'text-red-500'
              : 'text-black'
        )}
      >
        {endGameState.isEndGame}
      </h1>
      <div className="w-1/4 space-y-2">
        <div className="grid grid-cols-2 items-center space-x-10 sm:space-x-0">
          <p>Points:</p>
          <input type="number" onChange={handleOnChangeValue} className="w-52 rounded-md border border-black p-1" />
        </div>

        <div className="grid grid-cols-2 items-center space-x-10 py-1 sm:space-x-0">
          <p>Time:</p>
          <p>{isTime.toFixed(1)}s</p>
        </div>

        <button
          className="w-32 rounded-md border bg-stone-100 py-1 hover:bg-stone-200"
          type="button"
          onClick={handleOnClickStart}
        >
          {checkText ? 'Start' : 'Restart'}
        </button>
      </div>
    </div>
  )
}
