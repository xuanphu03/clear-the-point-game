import { MouseEvent } from 'react'
import { AreaPlayProps, ThePoint } from '@/lib/interface'
import { useEffect, useRef, useState } from 'react'
import { generatePoint } from '../utils/generatePoint'
import { cn } from '../utils/cn'
import { TITLE_GAME_PLAY } from '@/lib/constants'

export default function AreaPlay({ isPoints, playingState, endGameState, timeStop, isRePlaying }: AreaPlayProps) {
  const targetRef = useRef<HTMLDivElement>(null)
  const [nextPoint, setNextPoint] = useState<number>(1)
  const [items, setItems] = useState<ThePoint[]>([])

  useEffect(() => {
    setItems(generatePoint(isPoints))
    setNextPoint(1)
    endGameState.setIsEndGame(TITLE_GAME_PLAY.TITLE)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPoints, isRePlaying])

  const handleClickItem = (point: ThePoint, e: MouseEvent<HTMLDivElement>) => {
    if (!playingState.isPlaying || timeStop.timeStop) return
    if (point.value === nextPoint && playingState.isPlaying) {

      (e.target as HTMLDivElement).className += ' bg-red-500 transition duration-1000'

      setTimeout(() => {
        setItems(prevItems => prevItems.map(item => (item.value === nextPoint ? { ...item, isHidden: true } : item)))
      }, 2000)

      setNextPoint(prev => prev + 1)


      if (nextPoint === isPoints) {
        endGameState.setIsEndGame(TITLE_GAME_PLAY.WIN)
        timeStop.setTimeStop(true)
        playingState.setIsPlaying(false) 
      }
    } else {
      if (point.value !== nextPoint - 1) {
        endGameState.setIsEndGame(TITLE_GAME_PLAY.LOSE)
        timeStop.setTimeStop(true)
        playingState.setIsPlaying(false)
      }
    }
    console.log((e.target as HTMLDivElement).className)
  }

  return (
    <div ref={targetRef} className="relative mt-10 h-2/3 w-full border border-black">
      {items.map(point => (
        <div
          style={{ top: `${point.vectorY}%`, left: `${point.vectorX}%`, zIndex: `${point.zIndex}` }}
          key={point.value}
          onClick={e => handleClickItem(point, e)}
          className={cn(
            `absolute flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-black`,
            point.isHidden && 'hidden'
          )}
        >
          {point.value}
        </div>
      ))}
    </div>
  )
}
