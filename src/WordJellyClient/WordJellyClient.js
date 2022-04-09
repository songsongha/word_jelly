import React, { useState, useEffect, useCallback } from 'react'
import { WordJellyGame } from '../GameLogic'
import { Client } from "boardgame.io/react"
import { SocketIO } from "boardgame.io/multiplayer"
import Board from '../components/Board/Board'
import { useParams } from 'react-router-dom'
import { loadState, saveState } from '../localStorage'

const WordJellyClient = ({ numPlayers, lobbyClient, setShowRules }) => {
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
        setShowRules(true)
        async function joinMatch() {
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
                setErrorMsg('There was an issue with the Game ID or game may be full.  Please try again')
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
		
	},[credentials, id, lobbyClient, setShowRules, setState])
   

          const WordJellyClient = Client({
                game: WordJellyGame,
                numPlayers,
                board: Board,
                debug: false,
                multiplayer: SocketIO({ server: "localhost:8000" })
            })
    
        return(
            <div>
                {errorMsg ? errorMsg :
                    <WordJellyClient matchID={id} playerID={playerID} credentials={credentials} />
                }
            </div>
            
        )
      }
    
    export default WordJellyClient;
    