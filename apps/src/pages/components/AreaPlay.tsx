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

  const handleClickItem = (point: ThePoint, e: HTMLDivElement) => {

    if ((point.value === nextPoint) && playingState.isPlaying) {
      e.classList.add('bg-red-500', 'transtiion', 'duration-1000')

      setTimeout(() => {
        setItems(prevItems => prevItems.map(item => (item.value === nextPoint ? { ...item, isHidden: true } : item)))

        
      }, 2000)

      setNextPoint(prev => prev + 1)

    } else {
      if (point.value !== nextPoint-1 || timeStop.timeStop) {
        endGameState.setIsEndGame(TITLE_GAME_PLAY.LOSE)
        timeStop.setTimeStop(true)
        playingState.setIsPlaying(false)
      } 
    }
    if (nextPoint === isPoints) {
      endGameState.setIsEndGame(TITLE_GAME_PLAY.WIN)
      timeStop.setTimeStop(true)
    }
  }

  return (
    <div ref={targetRef} className="relative mt-10 h-2/3 w-full border border-black">
      {items.map(point => (
        <div
          style={{ top: `${point.vectorY}%`, left: `${point.vectorX}%`, zIndex: `${point.zIndex}` }}
          key={point.value}
          onClick={(e: MouseEvent<HTMLDivElement>) => handleClickItem(point, e.currentTarget)}
          className={cn(
            `absolute flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-black bg-stone-100`,
            point.isHidden && 'hidden'
          )}
        >
          {point.value}
        </div>
      ))}
    </div>
  )
}
