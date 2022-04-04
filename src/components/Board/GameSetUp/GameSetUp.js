import React, { useState, useCallback, useEffect }from 'react'

const GameSetUp = ({wordLength, moves, playerID}) => {
    const intialValues = { name: '', word: '' }
    const [formValues, setFormValues] = useState(intialValues)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)


    const submitForm = useCallback(() => {
        const {name, word} = formValues
		moves.submitWords(playerID, name, word)
    },[formValues, moves, playerID])
  
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
            errors.name = 'Name must be less than 7 characters long'
        }
        if (!word) {
            errors.word = 'Must enter a word'
        } else if (word.length !== Number(wordLength)) {
            errors.word = `Word must be exactly ${wordLength} characters`
        } else if (!regex.test(word)){
            errors.word = 'Word cannot contain numbers or symbols'
        }
        // check for real word??
        return errors
    },[wordLength])

    const handleSubmit =  useCallback(() => {
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
        handleSubmit()
        }
    }
    document.addEventListener('keydown', listener)
    return () => {
        document.removeEventListener('keydown', listener)
    }
      
    }, [formErrors, handleSubmit, isSubmitting, submitForm])

    return (
        <div className='container tc'>
          {/* <h1>Sign in to continue</h1>
          {Object.keys(formErrors).length === 0 && isSubmitting && (
            <span className='success-msg'>Signed in successfully</span>
          )} */}
          <form onSubmit={handleSubmit} noValidate>
            <div className='form-row'>
              <label htmlFor='name'>Name : </label>
              <input
                type='text'
                name='name'
                id='name'
                value={formValues.name}
                onChange={handleChange}
                className={formErrors.name && 'input-error'}
                autoFocus
              />
              {formErrors.name && (
                <span className='error red'>{formErrors.name}</span>
              )}
            </div>
            <div className='form-row'>
              <label htmlFor='word'>{wordLength !== 'open' ? `${wordLength}-Letter ` : 'Any Length ' }Word:</label>
              <input
                type='word'
                name='word'
                id='word'
                value={formValues.word}
                onChange={handleChange}
                className={formErrors.word && 'input-error'}
              />
              {formErrors.word && (
                <span className='error red'>{formErrors.word}</span>
              )}
            </div>
            <button type='submit'>Submit</button>
          </form>
        </div>
      )
    }
    export default GameSetUp