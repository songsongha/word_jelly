

// game logic move to different file?
const InputWords = (G) => {
    console.log('inputWords', G)
}

const GiveClue = () => {
    console.log('give clue')
}
  
const NextCard = () => {
    console.log('next card')
}

export const createGame = (numberOfPlayers) => {
    return {
      name: 'word-jelly',
      setup: () => {
        const players = [];
        for (let p = 0; p < numberOfPlayers; p++) {
          players.push({
            id: p.toString(),
            name: "Player " + (p+1),
            word: '',
            usedClue: false
          });
        }
        //other variables in the object?
        return ({
          players
        });
      },
      phases: {
        inputWords: {
            moves: {InputWords},
            start: true
        },  
        play: {
            moves: {
                giveClue: () => GiveClue,
                nextCard: () => NextCard 
            }
        },
      },
    }
}


