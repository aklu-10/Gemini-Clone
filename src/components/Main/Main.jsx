import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {
  const {
    previousPrompts,
    setPreviousPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput
  } = useContext(Context)

  return (
    <div className='main'>
      <div className='nav'>
        <p>MineGemini</p>
        <img src={assets.user_icon} />
      </div>

      <div className='main-container'>
        {!showResult ? (
          <>
            <div className='greet'>
              <p>
                <span>Hello, Peoples!</span>
              </p>
              <p>How can i help you today?</p>
            </div>

            <div className='cards'>
              <div className='card' onClick={()=>onSent('What is QA ?')}>
                <p>What is QA ?</p>
                <img src={assets.compass_icon} />
              </div>

              <div className='card' onClick={()=>onSent('What is Development ?')}>
                <p>What is Development ?</p>
                <img src={assets.bulb_icon} />
              </div>

              <div className='card' onClick={()=>onSent('What is Business Analyst ?')}>
                <p>What is Business Analyst ?</p>
                <img src={assets.message_icon} />
              </div>

              <div className='card' onClick={()=>onSent('What is Server ?')}>
                <p>What is Server ?</p>
                <img src={assets.code_icon} />
              </div>
            </div>
          </>
        ) : (
          <div className='result'>
            <div className='result-title'>
              <img src={assets.user_icon} alt='' />
              <p>{recentPrompt}</p>
            </div>
            <div className='result-data'>
              <img src={assets.gemini_icon} alt='' />
              {loading ? (
                <div className='loader'>
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className='main-bottom'>
          <div className='search-box'>
            <input
              type='text'
              placeholder='Enter a prompt here'
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <div>
              <img src={assets.gallery_icon} alt='' />
              <img src={assets.mic_icon} alt='' />
              {input && <img src={assets.send_icon} alt='' onClick={onSent} />}
            </div>
          </div>

          <p className='bottom-info'>bottom info</p>
        </div>
      </div>
    </div>
  )
}

export default Main
