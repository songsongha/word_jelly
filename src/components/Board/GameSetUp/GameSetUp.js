import React, { useState, useCallback, useEffect }from 'react'

const GameSetUp = ({wordLength, moves, playerID}) => {
    const intialValues = { name: '', word: '' }
    const [formValues, setFormValues] = useState(intialValues)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)


    const submitForm = useCallback(() => {
        const {name, word} = formValues
		moves.submitWords(playerID, name, word, wordLength)
    },[formValues, moves, playerID, wordLength])
  
   const handleChange = (e) => {
        const { name, value } = e.target
        setFormValues({ ...formValues, [name]: value })
    }
  
    const validate = useCallback((values) => {
        const {name, word} = values
        const regex = /^[A-Za-z]+$/
        let errors = {}
        if (!name) {
            errors.name = 'Please enter your name'
        } else if (name.length > 7) {
            errors.name = 'Name must be 7 or less characters long'
        }
        if (!word) {
            errors.word = 'Must enter a word'
        } else if (wordLength !== 'open' && word.length !== Number(wordLength)) {
            errors.word = `Word must be exactly ${wordLength} characters`
        } else if (!regex.test(word)){
            errors.word = 'Word cannot contain numbers or symbols'
        }
        // check for real word??
        return errors
    },[wordLength])

    const handleSubmit =  useCallback((e) => {
        e.preventDefault()
        setFormErrors(validate(formValues))
        setIsSubmitting(true)
      },[formValues, validate])
  
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
        submitForm()
      }

    const listener = event => {
        if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        event.preventDefault()
        handleSubmit(event)
        }
    }
    document.addEventListener('keydown', listener)
    return () => {
        document.removeEventListener('keydown', listener)
    }
      
    }, [formErrors, handleSubmit, isSubmitting, submitForm])

    return (
        <div className="pa4 black-80">
          <form className="measure center w-50 pl6"onSubmit={handleSubmit} noValidate>
            <div className='mt3'>
              <label className="db fw6 lh-copy f6" htmlFor='name'>Your Name : </label>
              <input
                type='text'
                name='name'
                id='name'
                value={formValues.name}
                onChange={handleChange}
                className={formErrors.name && 'b--red'}
                autoFocus
              />
             <div className='error red'>{formErrors.name}</div>
            </div>
            <div className='mt3'>
              <label className="db fw6 lh-copy f6" htmlFor='word'>{wordLength !== 'open' ? `${wordLength}-Letter ` : 'Any Length ' }Word:</label>
              <input
                type='word'
                name='word'
                id='word'
                value={formValues.word}
                onChange={handleChange}
                className={formErrors.word && 'b--red'}
              />
                <div className='error red'>{formErrors.word}</div>
            </div>
            <button className='b mt3 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib' type='submit'>Join Game</button>
          </form>
        </div>
      )
    }
    export default GameSetUp

    