
export const determineLayout = (numPlayers) => {

    switch (numPlayers) {
        case 2:
        case 3:
            return {
                redLayout: [0,1,3,6,7,8],
                leavesLayout: [9,10],
                restrictedLayout: [2,4,5]
            }
        case 4:
            return {
                redLayout: [0,1,3,4],
                leavesLayout: [5,6,7,8,9,10],
                restrictedLayout: [2]
            }
        case 5:
            return {
                redLayout: [0,1,3,4,5],
                leavesLayout: [6,7,8,9,10],
                restrictedLayout: [2]
            }
        case 6:
            return {
                redLayout: [0,1,2,4,5,6],
                leavesLayout: [7,8,9,10],
                restrictedLayout: [3]
            }
        default:
            console.log(`There was an error in ClueTracker`)
            return {}
    }

}

export const determineColor = (tokensAvailable, layout, position) => {
    console.log('determine color is called')
    const{leaves, red, restricted} = tokensAvailable
   
    const { redLayout, leavesLayout, restrictedLayout } = layout

    if (redLayout.includes(position) && redLayout.findIndex(e => e === position ) < red){
        return 'red'
    } else if ((leavesLayout.includes(position) && leavesLayout.findIndex(e => e === position ) < leaves) ||
     (restrictedLayout.includes(position) && restrictedLayout.findIndex(e => e === position ) < restricted)){
        return 'green'
    }  
    return 'gray'
}