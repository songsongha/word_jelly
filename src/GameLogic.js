import { Stage, TurnOrder } from 'boardgame.io/core'

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

const isGameOver = (G) => {
    // if all clues are gone or all players have decided that they know their words

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
            name: "Player " + (p),
            letterPosition: 0,
            word: ''
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

        let isClueInProgress = false
    

        return ({
          players,
          words,
          clues,
          tokensAvailable,
          tokensTaken,
          isClueInProgress,
          isNextCardAvailable

        });
      },
      phases: {
        setUp: {
            moves: {
                submitWords: (G, ctx, playerID, name, word) => {

                    // commit player info and words
                    if (name) G.players[playerID].name = name

                    G.players[playerID].word = word
                    
                    // shuffle words and assign to person to the right
                    if (Number(playerID) < G.players.length-1){
                        G.words[Number(playerID) + 1] = shuffle(word)
                    } else {
                        G.words[0] = shuffle(word)
                    }

                    ctx.events.endStage()

                }
            },
            onEnd: (G, ctx) => {
                // on phase end, shuffle words here?
                console.log('setUp phase ending')
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
                    console.log('give clue')

                    const playerID = submission.playerID

                    // update the clue panel for everyone and make next card available
                    const players = Object.values(submission.formValues)
                    const isNextCardAvailable = [...G.isNextCardAvailable]
                    const clues = [...G.clues] 
                    const clue = []
                    for(let i = 0; i < players.length; i++){
                        if(players[i]){
                            clue.push({
                                    letter: players[i] !== '*' ? G.words[players[i]][G.players[players[i]].letterPosition] : '*',
                                    player: players[i] !== '*' ? players[i] : undefined
                                })
                            if (players[i] !== '*'){
                                isNextCardAvailable[players[i]] = true
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
                nextCard: (G, ctx, playerID) => {
                    // if letter position is not the last letter increase position 
                    if (G.players[playerID].letterPosition < G.words[playerID].length-1){
                        G.players[playerID].letterPosition++
                        G.isNextCardAvailable[playerID] = false
                    } else {
                        console.log('bonus letters?')
                    }
                }
            },
            onEnd: (G, ctx) => {
                // on phase end
                console.log('play phase ending')
            },
            turn: {
                onBegin: (G, ctx, playerID) => {
                    console.log('turn begins')
                    ctx.events.setActivePlayers({
                        all: Stage.NULL,
                    })
                    if (ctx.turn > 2){
                        console.log('turn greater than 2')
                        restrictActions(G)
                    }
                },
            },
            endIf: G => (isGameOver(G)),
            next: 'reveal'

        },
        reveal: {

        }
    }
}


