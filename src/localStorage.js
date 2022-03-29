export const loadState = (key) => {
    try {
        const serializedState = localStorage.getItem(key)
        console.log({serializedState})
        if (serializedState === null) {
            console.log('serializedState does not exist)')
            return undefined
        }
        return JSON.parse(serializedState)
    } catch (e) {
        console.log({e})
    }
}

export const saveState = (key,state) => {
    try{
        const serializedState = JSON.stringify(state)
        localStorage.setItem(key, serializedState)
    } catch (e) {
        console.log({e})
    }
}