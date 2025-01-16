import { createContext, useState } from 'react'
import run from '../config/gemini'

export const Context = createContext()

const ContextProvider = props => {
  const [input, setInput] = useState('')
  const [recentPrompt, setRecentPrompt] = useState('')
  const [previousPrompts, setPreviousPrompts] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [loading, setLoading] = useState(false)
  const [resultData, setResultData] = useState('')

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  }

  const delayPara = (index, nextWord) => {
    let delayDuration = 75
    setTimeout(function () {
        console.log('nextWord settime', nextWord)
      setResultData(prev => prev + nextWord)
    }, delayDuration * index)
  }

  const onSent = async prompt => {
    setResultData('')
    setLoading(true)
    setShowResult(true)
    let response;
    if(typeof prompt === 'string'){
        setRecentPrompt(prompt)
        response = await run(prompt);
    } else {
        setPreviousPrompts(prev=>[...prev, input]);
        setRecentPrompt(input);
        response = await run(input);
    }
    // setRecentPrompt(input)
    // setPreviousPrompts(prev=>[...prev, input])
    // let response = await run(input)
    let responseArray = response.split('**')
    let newResponse
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i]
      } else {
        newResponse += '<b>' + responseArray[i] + '</b>'
      }
    }

    let newResponse2 = newResponse.split('*').join('<br/>').replaceAll('undefined', '')
    let newResponseArr = newResponse2.split(' ')
    for (let i = 0; i < newResponseArr.length; i++) {
      const nextWord = newResponseArr[i]
      delayPara(i, nextWord+' ')
    }
    // setResultData(newResponse2)
    setLoading(false)
    setInput('')
  }

  const contextValue = {
    previousPrompts,
    setPreviousPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat
  }

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  )
}

export default ContextProvider
