import { Stage, TurnOrder } from 'boardgame.io/core'

// TO DO: turn order, so all players can enter words

const GiveClue = (G,ctx) => {
    console.log('give clue')
    console.log({ctx})
    ctx.events.setActivePlayers({
        others: 'wait',
    })
    // give clue information
    // put everyone back to play phase
    // ctx.events.setActivePlayers({
    //     others: 'play',
    // })
}
  
// const NextCard = ({G, playerID}) => {
//     console.log('nextcard called')
//     console.log(G.players[playerID].letterPosition)
//     G.players[Number(playerID)].letterPosition++
    
// }
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
            usedClue: false
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
                    G.players[playerID].name = name
                    G.words[Number(playerID)] = word
                    ctx.events.endStage()

                }
            },
            onEnd: (G, ctx) => {
                // on phase end, shuffle words here?
                console.log('setUp phase ending')
            },
            turn: {
                onBegin: (G, ctx) => {
                    // give cards to everybody
    
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
                giveClue: (G, ctx) => {GiveClue(G, ctx)},
                nextCard: (G, ctx, playerID) => {
                    G.players[Number(playerID)].letterPosition++
                }
            },
            onEnd: (G, ctx) => {
                // on phase end
                console.log('play phase ending')
            },
            turn: {
                onBegin: (G, ctx) => {
                    // all players can choose to give a clue or cycle their cards
                    ctx.events.setActivePlayers({
                        all: Stage.NULL,
                    })
                },
                order: TurnOrder.ONCE
            },
            endIf: G => (isGameOver(G)),
            next: 'reveal'

        },
        wait: {
            moves: {
                // no moves can be made when waiting
            },
            onEnd: (G, ctx) => {
                // on phase end, shuffle words here?
                console.log('wait phase ending')
            },
            next: 'play'
        },
        reveal: {

        }
    }
}


