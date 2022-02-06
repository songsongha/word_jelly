const GiveClue = () =>{
    console.log('draw card')
  }
  
  const NextCard = () =>{
    console.log('play card')
  }
  
  // game logic move to different file
 export const WordJellyGame = {
    setup: () => ({ words: [], letters: [], playerName: [] }),
    turn: { moveLimit: 1 },
  
    phases: {
      draw: {
        moves: { GiveClue},
      },
      
      play: {
        moves: { NextCard },
      },
    },
  
    
      // turn: { moveLimit: 1 },
    
      // endIf: (G, ctx) => {
      //   if (IsVictory(G.cells)) {
      //     return { winner: ctx.currentPlayer };
      //   }
      //   if (G.cells.filter(c => c === null).length === 0) {
      //     return { draw: true };
      //   }
      // }
  }