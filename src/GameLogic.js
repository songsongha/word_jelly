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
            tokensTaken: 0,
            isClueAvailable: true,
            isNextCardAvailable: true,
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
        let isClueInProgress = false

        return ({
          players,
          words,
          clues,
          tokensAvailable,
          isClueInProgress

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
                giveClue: (G, ctx, formValues) => {
                    console.log('give clue')
                    console.log('G', G, 'ctx', ctx)
                    console.log({formValues})
                    const players = Object.values(formValues)
                    console.log({players})
                    const clues = [...G.clues] 
                    const clue = []
                    for(let i = 0; i < players.length; i++){
                        if(players[i]){
                            clue.push({
                                    letter: players[i] !== '*' ? G.words[players[i]][G.players[players[i]].letterPosition] : '*',
                                    player: players[i] !== '*' ? players[i] : undefined
                                })
                        }
                    }
                    clues.push(clue)

                    return {...G, clues: clues, isClueInProgress: false }
                    
                },
                nextCard: (G, ctx, playerID) => {
                    // if letter position is not the last letter increase position 
                    if (G.players[playerID].letterPosition < G.words[playerID].length-1){
                        G.players[playerID].letterPosition++
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


