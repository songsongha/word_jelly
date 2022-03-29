import React, { useState, useEffect, useCallback } from 'react'
import { WordJellyGame } from '../GameLogic'
import { Client } from "boardgame.io/react"
import { SocketIO } from "boardgame.io/multiplayer"
import Board from '../components/Board/Board'
import { useParams } from 'react-router-dom'
import { LobbyClient } from 'boardgame.io/client'
import { loadState, saveState } from '../localStorage'

const WordJellyClient = ({numPlayers, lobbyClient}) => {
    const [errorMsg, setErrorMsg] = useState('')
    const [credentials, setCredentials] = useState('')
    const [playerID, setPlayerID] = useState()
    let { id } = useParams()
    
    const setState = useCallback((match)=>{
        const {playerCredentials,playerID} = match
        setCredentials(playerCredentials)
        setPlayerID(playerID)
        const state = {
            playerCredentials,
            playerID,
        }
        saveState(id, state)
    },[id])

    useEffect(() => {
        async function joinMatch() {
            const lobbyClient =  new LobbyClient({ server: 'http://localhost:8000' })
            try {
                const match = await lobbyClient.joinMatch(
                    'word-jelly',
                    id,
                    {
                        playerName: 'Anon'
                    }
                )
                setState(match)
                
            } catch (e) {
                console.log({e})
                setErrorMsg('There was an issue with the Game ID.  Please try again')
            }
          }
        
        setErrorMsg('')
        if (!credentials){
            const localStore = loadState(id)
            if (!localStore){
                joinMatch()
            } else {
                setState(localStore)
            }
        }
        

		
	},[credentials, id, lobbyClient, setState])
   

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
    