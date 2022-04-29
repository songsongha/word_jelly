import React, { useState, useEffect, useCallback } from 'react'
import { createGame } from '../GameLogic'
import { Client } from "boardgame.io/react"
import { SocketIO } from "boardgame.io/multiplayer"
import Board from '../components/Board/Board'
import { useParams } from 'react-router-dom'
import { loadState, saveState } from '../localStorage'

const { protocol, hostname, port } = window.location
const server = `${protocol}//${hostname}:${port}`

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
                    `word-jelly${numPlayers}`,
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
		
	},[credentials, id, lobbyClient, numPlayers, setShowRules, setState])
   

    const WordJellyClient = Client({
        game: createGame(numPlayers),
        numPlayers,
        board: Board,
        debug: true,
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
    