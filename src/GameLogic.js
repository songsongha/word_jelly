import { Stage, TurnOrder } from 'boardgame.io/core'
import { clearState } from './localStorage'

const strPlayers = ['0','1','2','3','4','5']
const restrictActions = (G) => {
    G.isClueInProgress = true
}


const shuffle = (str) =>{
    return [...str].sort(()=>Math.random()-.5).join('')
}
const areAllWordsIn = (G) => {
    if (!G.words.length === 0 || G.words.includes(undefined) || G.words.includes(null)){
        return false
    } 
    return true
}
const sumOf = (tokensAvailable) => {
    const {red, leaves, restricted } = tokensAvailable
    return red + leaves + restricted 
}

const isEveryPlayerDone = (G) =>{
    const {players, words} = G
    let result = true
    for (let i = 0; i < players.length; i++){
        if (players[i] && words[i] &&
            players[i].letterPosition < words[i].length){
            result = false
            break
        }
    }
    return result
}

const areAllGuessesIn = (G) => {
    if (G.gameResults.some(e => e.guess === '')) {
        return false
      }
    return true
}

const isGameOver = (G) => {
    // if all clues are gone or all players have decided that they know their words
    if (sumOf(G.tokensAvailable) === 0){
        return true
    }
   
    return isEveryPlayerDone(G)
}

const randomLetter = () => {
    var characters = 'ABCDEFGHIKLMNOPRSTUWY'
    return characters.charAt(Math.floor(Math.random() * characters.length))
}

const isAnagram = (word, guess) =>{
    
    if (word.length === guess.length &&
        word.split("").sort().join("").toUpperCase() === guess.split("").sort().join("").toUpperCase()) {
        // need to also check if anagram is a word
        return true
    }
    return false

}

export const WordJellyGame = {
      name: 'word-jelly',
      setup: () => {
        const players = [];
        //just doing 6 player version for now
        for (let p = 0; p < 6; p++) {
          players.push({
            id: p.toString(),
            name: "Player " + (p+1),
            letterPosition: 0,
            submittedWord: false
          });
        }
        const words = Array(6)
        let clues = []
        const tokensAvailable = {
            red: 6,
            leaves: 4,
            restricted: 1
        }
        const tokensTaken = Array(6).fill(Number(0))
        const isNextCardAvailable = Array(6).fill(false)
        const bonusLetters = Array(6)
        let permanentLetters = []
        const gameResults = Array(6).fill({
            word: '',
            guess: '',
            score: 0
        })

        let isClueInProgress = false
    

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
          gameResults

        });
      },
    endIf: (G, ctx) => {
        if (areAllGuessesIn(G)){
            clearState()
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

                    const playerID = submission.playerID

                    // update the clue panel for everyone and make next card available
                    const players = Object.values(submission.formValues)
                    const isNextCardAvailable = [...G.isNextCardAvailable]
                    const clues = [...G.clues] 
                    const clue = []
                    const letterPositions= []
                    const Gplayers = [...G.players]
                    // get a snap shot of the letter positions at this time
                    // first index of every clue is the snapshot of letterPosition
                    for (let i = 0; i < Gplayers.length; i++){
                        letterPositions.push(Gplayers[i].letterPosition)
                    }
                    clue.push(letterPositions)

                    for(let i = 0; i < players.length; i++){
                        if(players[i]){
                            if (strPlayers.includes(players[i])){
                                const letter = G.words[players[i]][G.players[players[i]].letterPosition] || G.bonusLetters[players[i]]
                                clue.push({
                                        letter: letter,
                                        player: players[i]
                                    })
                                    isNextCardAvailable[players[i]] = true  
                            } else {
                                clue.push({
                                    letter: players[i],
                                    player: undefined
                                })
                            }
                        }
                    }
                    
                    clues.push(clue)
                    
                    // decrease tokensAvailable
                    const tokensAvailable = {...G.tokensAvailable}

                    if (G.tokensTaken[playerID] === 0){
                        tokensAvailable.red--
                    } else if (G.tokensTaken[playerID] > 0 && G.tokensAvailable.leaves > 0){
                        tokensAvailable.leaves--
                    } else if (G.tokensTaken[playerID] > 0 && G.tokensAvailable.leaves === 0){
                        tokensAvailable.restricted--
                    }
                    // adjust count for person giving clue
                    const tokensTaken = [...G.tokensTaken]
                    tokensTaken[playerID]++

                    return {...G, 
                        clues: clues, 
                        isClueInProgress: false, 
                        tokensAvailable: tokensAvailable, 
                        tokensTaken: tokensTaken, 
                        isNextCardAvailable: isNextCardAvailable
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
                }
            },
            turn: {
                onBegin: (G, ctx, playerID) => {
                    ctx.events.setActivePlayers({
                        all: Stage.NULL,
                    })
                    if (ctx.turn > 2){
                        restrictActions(G)
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
                onBegin: (G, ctx, playerID) => {
                    ctx.events.setActivePlayers({
                        all: Stage.NULL,
                    })
                }
            }

        }
    }
}


