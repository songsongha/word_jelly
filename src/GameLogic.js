import { Stage, TurnOrder } from 'boardgame.io/core'

const restrictActions = (G, ctx, playerID) => {
    console.log('restric actions called')
    
    // write a function to prevent give clue and next card functions.
    for (let player = 0; player < G.players.length; player++) {
			G.players[player].isClueAvailable = false
            G.players[player].isNextCardAvailable = false
		}
	  }


const giveClue =  (G, ctx, playerID) => {
    console.log('give clue')
    restrictActions(G, ctx, playerID)
    console.log('doing some stuff')
    // give clue information
    // restore action status
}
// const setActionStatus = (G, ctx, playerID) => {
//     // write a function to set action status to appropriate status.
//     for (let player = 0; player < G.players.length; player++) {
// 		if (player !== Number(playerID)){
//             // true for now, need to add logic
// 			G.isClueAvailable[playerID] = true
//             G.isNextCardAvailable[playerID] = true
// 		}
// 	  }

// }

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
            usedClue: false,
            isClueAvailable: true,
            isNextCardAvailable: true,
            word: ''
          });
        }
        const words = Array(6)

        return ({
          players,
          words
        });
      },
      phases: {
        setUp: {
            moves: {
                submitWords: (G, ctx, playerID, name, word) => {

                    // commit player info and words
                    if (name) G.players[playerID].name = name

                    G.players[playerID].word = word
                    G.words[Number(playerID)] = shuffle(word)

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
                // giveClue: (G, ctx, playerID) => {
                //     console.log('give clue')
                //     restrictActions(G, ctx, playerID)
                //     console.log('doing some stuff')
                //     // give clue information
                //     // put everyone back to play phase
                //     // ctx.events.setActivePlayers({
                //     //     others: 'play',
                //     // })
                // },
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
                        giveClue(G, ctx, playerID)
                    }
                },
                // order:  TurnOrder.CUSTOM(['0']),
            },
            endIf: G => (isGameOver(G)),
            next: 'reveal'

        },
        wait: {
            moves: {
                // no moves can be made when waiting
            },
            onEnd: (G, ctx) => {
                console.log('wait phase ending')
            },
            next: 'play'
        },
        reveal: {

        }
    }
}


