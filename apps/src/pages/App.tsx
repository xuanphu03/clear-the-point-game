import { useState } from 'react'
import ControlGame from './components/ControlGame'
import PlayArea from './components/AreaPlay'
import { TITLE_GAME_PLAY } from '@/lib/constants'

function App() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPoints, setIsPoints] = useState(0)
  const [isEndGame, setIsEndGame] = useState<TITLE_GAME_PLAY>(TITLE_GAME_PLAY.TITLE)
  const [timeStop, setTimeStop] = useState(false)
  const [isRePlaying, setReIsPlaying] = useState(false)

  return (
    <div className="mx-auto h-screen max-w-5xl p-5">
      <ControlGame
        pointState={{ isPoints, setIsPoints }}
        playingState={{ isPlaying, setIsPlaying }}
        endGameState={{ isEndGame, setIsEndGame }}
        timeStop={{ timeStop, setTimeStop }}
        rePlayingState={{ isRePlaying, setReIsPlaying }}
      />
      <PlayArea
        isPoints={isPoints}
        playingState={{ isPlaying, setIsPlaying }}
        endGameState={{ isEndGame, setIsEndGame }}
        timeStop={{ timeStop, setTimeStop }}
        isRePlaying={isRePlaying}
      />
    </div>
  )
}

export default App
