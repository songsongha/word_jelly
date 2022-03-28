import React from 'react'
import { WordJellyGame } from '../GameLogic'
import { Client } from "boardgame.io/react"
import { SocketIO } from "boardgame.io/multiplayer"
import Board from '../components/Board/Board'

const WordJellyClient = ({ matchID, playerID, credentials}) => {

          const WordJellyClient = Client({
                game: WordJellyGame,
                numPlayers: 6,
                board: Board,
                debug: true,
                multiplayer: SocketIO({ server: "localhost:8000" })
            })
    
        return(
                <WordJellyClient matchID={matchID} playerID={playerID} credentials={credentials} />
        )
      }
    
    export default WordJellyClient;
    