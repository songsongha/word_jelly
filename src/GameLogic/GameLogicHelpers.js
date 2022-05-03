export const restrictActions = (G, ctx) => {
    G.isClueInProgress = true
    G.clueGiver = ctx.currentPlayer
}

export const randomLetter = () => {
    var characters = 'ABCDEFGHIKLMNOPRSTUWY'
    return characters.charAt(Math.floor(Math.random() * characters.length))
}

export const createWord = (wordLength) => {
    let word = ''
    for (let i = 0; i < wordLength; i++){
        word += randomLetter()
    }
    return word
}

export const shuffle = (str) =>{
    return [...str].sort(()=>Math.random()-.5).join('')
}
export const areAllWordsIn = (G) => {
    if (!G.words.length === 0 || G.words.includes(undefined) || G.words.includes(null)){
        return false
    } 
    return true
}

export const areAllGuessesIn = (G) => {
    if (G.gameResults.some(e => e.guess === '')) {
        return false
      }
    return true
}

const isEveryPlayerDone = (G) =>{
    const {players, words} = G
    let result = true
    for (let i = 0; i < players.length; i++){
        if (players[i] && words[i] &&
            players[i].letterPosition < words[i].length){
            result = false
            break
        }
    }
    return result
}

const sumOf = (tokensAvailable) => {
    const {red, leaves, restricted } = tokensAvailable
    return red + leaves + restricted 
}

export const isGameOver = (G) => {
    // if all clues are gone or all players have decided that they know their words
    if (sumOf(G.tokensAvailable) === 0){
        return true
    }
   
    return isEveryPlayerDone(G)
}


export const isAnagram = (word, guess) =>{
    
    if (word.length === guess.length &&
        word.split("").sort().join("").toUpperCase() === guess.split("").sort().join("").toUpperCase()) {
        // need to also check if anagram is a word
        return true
    }
    return false

}