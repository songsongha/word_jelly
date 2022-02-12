

const GiveClue = () => {
    console.log('give clue')
}
  
const NextCard = () => {
    console.log('next card')
}
const areAllWordsIn = (G) => {
    console.log('Are all words in check')
    console.log('G.words', G.words)
    if (G.words.includes(undefined)){
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
        inputWords: {
            moves: {
                inputWords: (G, ctx, playerID, name, word) => {

                    console.log('move: InputWords')
                    console.log('G', G)
                    console.log('G.words', G.words)
                    console.log('G.Players', G.players)
                    console.log('G.Players[playerId]', G.players[playerID])
                    G.players[playerID].name = name
                    G.words[Number(playerID)] = word
                }
            },
            start: true,
            next: 'play',
            endIf: G => (areAllWordsIn(G))
        },  
        play: {
            moves: {
                giveClue: () => GiveClue,
                nextCard: () => NextCard 
            }
        },
      },
    }


