import { Stage, TurnOrder } from 'boardgame.io/core'

// TO DO: turn order, so all players can enter words

const GiveClue = () => {
    console.log('give clue')
}
  
const NextCard = () => {
    console.log('next card')
}
const areAllWordsIn = (G) => {
    console.log('Are all words in check')
    console.log('G.words', G.words)
    if (!G.words.length === 0 || G.words.includes(undefined) || G.words.includes(null)){
        console.log('contains undefined')
        return false
    } 
    console.log('all words entered')
    return true
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
                // on phase end
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
            endIf: G => (areAllWordsIn(G)),
            start: true,
            next: 'play'
        },
        play: {
                    moves: {
                        giveClue: () => GiveClue,
                        nextCard: () => NextCard 
                    }
                },
    }
    //   phases: {
    //     inputWords: {
    //         // moves: {
    //         //     inputWords: (G, ctx, playerID, name, word) => {

    //         //         console.log('move: InputWords')
    //         //         console.log('G', G)
    //         //         console.log('G.words', G.words)
    //         //         console.log('G.Players', G.players)
    //         //         console.log('G.Players[playerId]', G.players[playerID])
    //         //         G.players[playerID].name = name
    //         //         G.words[Number(playerID)] = word
                    
    //         //     }
    //         // },
    //         turn: {
    //             stages: {
    //                 inputWords: {
    //                     moves: {
    //                         inputWords: (G, ctx, playerID, name, word) => {
    //                             console.log('move: InputWords')
    //                             console.log('G', G)
    //                             console.log('G.words', G.words)
    //                             console.log('G.Players', G.players)
    //                             console.log('G.Players[playerId]', G.players[playerID])
    //                             G.players[playerID].name = name
    //                             G.words[Number(playerID)] = word
    //                         }
    //                     }
    //                 }
    //             }
    //         },
    //         next: 'play',
    //         endIf: G => (areAllWordsIn(G))
    //     },  
    //     play: {
    //         moves: {
    //             giveClue: () => GiveClue,
    //             nextCard: () => NextCard 
    //         }
    //     },
    //   },
    }


