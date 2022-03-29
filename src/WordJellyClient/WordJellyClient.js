import React, { useState, useCallback, useEffect } from 'react'
import { WordJellyGame } from '../GameLogic'
import { Client } from "boardgame.io/react"
import { SocketIO } from "boardgame.io/multiplayer"
import Board from '../components/Board/Board'
import { useParams } from 'react-router-dom'

const WordJellyClient = ({numPlayers, wordLength, lobbyClient}) => {
    const [errorMsg, setErrorMsg] = useState()
    const [credentials, setCredentials] = useState()
    const [playerID, setPlayerID] = useState()
    let { id } = useParams()
    
    useEffect(() => {
		setErrorMsg('')
        async function joinMatch() {
            try {
                const {playerCredentials, playerID} = await lobbyClient.joinMatch(
                    'word-jelly',
                    id,
                    {
                        playerName: 'Anon'
                    }
                )
                setCredentials(playerCredentials)
                setPlayerID(playerID)
                
            } catch (e) {
                setErrorMsg('There was an issue with the Game ID.  Please try again')
            }
          }
          joinMatch()
		
	},[id, lobbyClient])
   

          const WordJellyClient = Client({
                game: WordJellyGame,
                numPlayers,
                board: Board,
                debug: true,
                multiplayer: SocketIO({ server: "localhost:8000" })
            })
    
        return(
            <div>
                {errorMsg ? 'No game found. Check URL and try again' :
                    <WordJellyClient matchID={id} playerID={playerID} credentials={credentials} />
                }
            </div>
            
        )
      }
    
    export default WordJellyClient;
    