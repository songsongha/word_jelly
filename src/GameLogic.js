

// game logic move to different file?
const InputWords = (G, userName, word, playerID) => {

    console.log('move: inputWords')
    console.log('G', G)
    console.log('G.Players', G.players)
    console.log('G.Players[playerId]', G.players[playerID])
    G.players[playerID].name = userName
    G.words[Number(playerID)] = word
}

const GiveClue = () => {
    console.log('give clue')
}
  
const NextCard = () => {
    console.log('next card')
}
const areAllWordsIn = (G) => {
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
            moves: {InputWords},
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


