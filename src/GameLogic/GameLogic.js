import { Stage, TurnOrder } from 'boardgame.io/core'
import {
    restrictActions,
    randomLetter,  
    createWord,
    shuffle,
    areAllWordsIn, 
    areAllGuessesIn,
    isGameOver,
    isAnagram
} from './GameLogicHelpers'


export const createGame = (numPlayers) =>{
    return {
        name: `word-jelly${numPlayers}`,
        setup: () => {
          const players = [];
          for (let p = 0; p < numPlayers; p++) {
            players.push({
              id: p.toString(),
              name: "Player " + (p+1),
              letterPosition: 0,
              submittedWord: false
            });
          }
          let dummyHands = []
          for (let p = numPlayers; p < 6; p++) {
            dummyHands.push({
              id: p.toString(),
              name: `NPC ${p-numPlayers+1}`,
              letterPosition: 0,
              word: createWord(12-p),
              random: ''
            });
          }
          const words = Array(numPlayers)
          let clues = []
          const red = numPlayers > 3 ? numPlayers : 6
          const restricted = numPlayers > 3 ? 1 : 3
          const leaves = 11 - red - restricted
          const tokensAvailable = {
              red,
              leaves,
              restricted 
          }
          const tokensTaken = Array(numPlayers).fill(Number(0))
          const isNextCardAvailable = Array(numPlayers).fill(false)
          const bonusLetters = Array(numPlayers)
          let permanentLetters = []
          const gameResults = Array(numPlayers).fill({
              word: '',
              guess: '',
              score: 0
          })
  
          let isClueInProgress = false
          let clueGiver = '0'
          let gainToken = false
  
          return ({
            players,
            words,
            clues,
            tokensAvailable,
            tokensTaken,
            isClueInProgress,
            isNextCardAvailable,
            bonusLetters,
            permanentLetters,
            gameResults,
            clueGiver,
            dummyHands,
            gainToken

  
          });
        },
      endIf: (G, ctx) => {
          if (areAllGuessesIn(G)){
              return true
          }},
      phases: {
          setUp: {
              moves: {
                  submitWords: (G, ctx, playerID, name, word) => {
                      
                      // commit player info and words
                      if (name) G.players[playerID].name = name
                      G.players[playerID].submittedWord = true
                      
                      // shuffle words and assign to person to the right
                      if (Number(playerID) < G.players.length-1){
                          G.words[Number(playerID) + 1] = shuffle(word)
                          G.gameResults[Number(playerID) + 1].word = word
                      } else {
                          G.words[0] = shuffle(word)
                          G.gameResults[0].word = word
                      }
  
                      ctx.events.endStage()
  
                  }
              },
              turn: {
                  onBegin: (G, ctx) => {
                      // everyone to input words simultaneously
                      ctx.events.setActivePlayers({
                          all: Stage.NULL,
                      })
                  },
                  order: TurnOrder.ONCE
              },
              start: true,
              endIf: G => (areAllWordsIn(G)),
              next: 'play'
          },
          play: {
              moves: {
                  giveClue: (G, ctx, submission) => {

                    const {playerID, dummyUsed, strPlayers, strDummy, word} = submission
                    const players = Object.values(submission.formValues)
                    const isNextCardAvailable = [...G.isNextCardAvailable]
                    const clues = [...G.clues] 
                    const clue = []
                    const letterPositions= []
                    const Gplayers = [...G.players]
                    const dummyHands = []
                    const tokensAvailable = {...G.tokensAvailable}
                    let gainToken = false

                    // decrease tokensAvailable 
                    if (G.tokensTaken[playerID] === 0 || 
                        (G.players.length < 4 && G.tokensTaken[playerID] < 6/G.players.length)){
                        tokensAvailable.red--
                    } else if (G.tokensTaken[playerID] > 0 && G.tokensAvailable.leaves > 0){
                        tokensAvailable.leaves--
                    } else if (G.tokensTaken[playerID] > 0 && G.tokensAvailable.leaves === 0){
                        tokensAvailable.restricted--
                    }

                    // adjust count for person giving clue
                    const tokensTaken = [...G.tokensTaken]
                    tokensTaken[playerID]++

                    // populate dummyhands + advance letter position
                    for (let i =0; i < G.dummyHands.length; i++){
                    if (dummyUsed && dummyUsed.length && dummyUsed.includes(i)){
                        const letterPosition = Number(G.dummyHands[i].letterPosition) + 1
                        // add a leaves token if an NPC has used all their cards
                        if (letterPosition === G.dummyHands[i].word.length-1){
                            tokensAvailable.leaves++
                            gainToken = true
                        }
                        const dummyObj = {
                            id: G.dummyHands[i].id,
                            name: G.dummyHands[i].name,
                            letterPosition,
                            word: G.dummyHands[i].word,
                            random: randomLetter()
                        }
                        dummyHands.push(dummyObj)
                    }else{
                        dummyHands.push({...G.dummyHands[i]})
                    }
                    }
                   
                    // get a snap shot of the letter positions at this time
                    // first index of every clue is the snapshot of letterPosition
                    for (let i = 0; i < Gplayers.length; i++){
                        letterPositions.push(Gplayers[i].letterPosition)
                    }
                    clue.push(letterPositions)

                    for (let i = 0; i < G.dummyHands.length; i++){
                        letterPositions.push(G.dummyHands[i].letterPosition)
                    }

                    // update the clue panel for everyone and make next card available
                    for(let i = 0; i < players.length; i++){
                        if(players[i]){
                            if (strPlayers.includes(players[i])){
                                const letter = G.words[players[i]][G.players[players[i]].letterPosition] || G.bonusLetters[players[i]]
                                clue.push({
                                    letter: letter,
                                    player: players[i]
                                    })
                                isNextCardAvailable[players[i]] = true  
                            } else if (strDummy.includes(players[i])){
                                const letter = word[i]
                                clue.push({
                                    letter: letter,
                                    player: undefined
                                })
                            } else {
                                clue.push({
                                    letter: players[i],
                                    player: undefined
                                })
                            }
                        }
                    }
                    clues.push(clue)

                      return {...G, 
                          clues: clues, 
                          isClueInProgress: false, 
                          clueGiver: undefined,
                          tokensAvailable: tokensAvailable, 
                          tokensTaken: tokensTaken, 
                          isNextCardAvailable: isNextCardAvailable,
                          dummyHands: dummyHands,
                          gainToken: gainToken
                      }
                      
                  },
                  nextCard: (G, ctx, playerID,isBonusCorrect) => {
                      if (isBonusCorrect){
                          const bonusLetter = G.bonusLetters.slice(playerID, playerID+1)
                          const permanentLetters = [...G.permanentLetters]
                          permanentLetters.push(bonusLetter[0])
                          G.permanentLetters = permanentLetters
                      }
                      if (G.players[playerID].letterPosition >= G.words[playerID].length-1){
                          // if player is out of cards generate bonus a letter
                          G.bonusLetters[playerID] = randomLetter()
                      }
                          G.players[playerID].letterPosition++
                          G.isNextCardAvailable[playerID] = false
                  },
                  cancelClue: (G) => {
                      G.isClueInProgress = false
                  },
                  resetGainToken: (G) => {
                    G.gainToken = false
                }
              },
              turn: {
                  onBegin: (G, ctx) => {
                      ctx.events.setActivePlayers({
                          all: Stage.NULL,
                      })
                      if (ctx.turn > 2){
                          restrictActions(G, ctx)
                      }
                  },
              },
              endIf: G => (isGameOver(G)),
              next: 'guessWord'
  
          },
          guessWord: {
              moves:{
                  guessWord: (G, ctx, submission) => {
                      const {gameResults} = G
                      const {playerID, wordGuess} = submission
                      // insert word into gameResults for display later
                      gameResults[playerID].guess = wordGuess
                      
                      // calculate score
                      if (wordGuess.toUpperCase() === gameResults[playerID].word.toUpperCase() || 
                          isAnagram(gameResults[playerID].word, wordGuess)){
                          // correct guess
                          gameResults[playerID].score = 3 * wordGuess.length
                      } 
                  }
  
              },
              turn: {
                  onBegin: (G, ctx) => {
                      ctx.events.setActivePlayers({
                          all: Stage.NULL,
                      })
                  }
              }
  
          }
      }
  }
}


