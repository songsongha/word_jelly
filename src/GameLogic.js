

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

export const WordJellyGame = {
      name: 'word-jelly',
      setup: () => {
        const players = [];
        //just doing 6 player version for now
        for (let p = 0; p < 6; p++) {
          players.push({
            id: p.toString(),
            name: "Player " + (p+1),
            word: '',
            usedClue: false
          });
        }
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


